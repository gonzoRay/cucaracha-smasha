import { highScoresCollection, onSnapshotError } from '@/db';
import { getHighScoreByPlayer, getPlayerByEmail, savePlayer, saveScore } from '@/functions';
import { calculateHighScore, cancelGameTimers, resetTile, showRandomRoachImage } from '@/state-helpers';
import Vue from 'vue';
import Vuex from 'vuex';

let highScoresUnsubscribe;

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    config: {
      numberOfTiles: 9,
      numberOfImageOptions: 5,
      gameDurationInMs: 7000,
      tileDelayFactor: 0.3,
      basePointsPerSmash: 10,
      difficultyLevels: [
        { level: 0, label: 'Easy', speed: 1500 },
        { level: 1, label: 'Normal', speed: 1000 },
        { level: 2, label: 'Hard', speed: 600 }
      ]
    },
    game: {
      currentTile: -1,
      tiles: [],
      difficulty: 1,
      isRunning: false,
      newRoachTimerId: undefined,
      currentScore: 0
    },
    isLoading: false,
    isSaving: false,
    signupPlayerName: null,
    currentUser: null,
    currentHighScore: 0,
    highScores: []
  },
  getters: {
    currentUser: state => state.currentUser,
    currentHighScore: state => state.currentHighScore,
    gameTiles: state => state.game.tiles,
    levelSpeed: state => level => {
      const targetLevel = state.config.difficultyLevels.find(
        l => l.level === level
      );
      return targetLevel.speed;
    },
    highScores: state => state.highScores,
    levelLabels: state => state.config.difficultyLevels.map(l => l.label),
    playerName: state => state.currentUser.name,
    signupPlayerName: state => state.signupPlayerName
  },
  mutations: {
    endGame(state) {
      cancelGameTimers(state);
      calculateHighScore(state);
    },
    initGame(state, payload) {
      for (let i = 0; i < payload; i++) {
        state.game.tiles.push({
          id: i,
          imageSrc: require('@/assets/empty.png')
        });
      }
    },
    incrementScore(state) {
      const weightedSmashScore =
        state.config.basePointsPerSmash * state.game.difficulty + 1;
      state.game.currentScore = state.game.currentScore + weightedSmashScore;
    },
    resetGame(state) {
      state.game.currentScore = 0;
      state.game.currentTile = -1;
      state.game.tiles.length = 0;
      state.game.isRunning = false;
    },
    resetTile(state, payload) {
      resetTile(state, payload);
    },
    setGameTimer(state, payload) {
      state.game.isRunning = payload;
    },
    setDifficulty(state, payload) {
      state.game.difficulty = payload;
    },
    setHighScore(state, payload) {
      state.currentHighScore = payload;
    },
    setLoading(state, payload) {
      state.isLoading = payload;
    },
    setPlayerName(state, payload) {
      state.signupPlayerName = payload;
    },
    setSaving(state, payload) {
      state.isSaving = payload;
    },
    setUser(state, payload) {
      state.currentUser = payload;
    },
    startNewRoachTimer(state, payload) {
      state.game.newRoachTimerId = setInterval(() => {
        showRandomRoachImage(state);
        const resetTileDelay =
          payload / Number(1 + state.config.tileDelayFactor);
        state.game.resetTileTimerId = setTimeout(
          () => resetTile(state, state.game.currentTile),
          resetTileDelay
        );
      }, payload);
    },
    updateHighScores(state, payload) {
      state.highScores = payload;
    }
  },
  actions: {
    INIT_GAME({ state, commit }) {
      commit('resetGame');
      commit('initGame', state.config.numberOfTiles);
    },
    LISTEN_HIGH_SCORES({ state, commit }) {
      const highScores = [];
      highScoresUnsubscribe = highScoresCollection.onSnapshot(scoresRef => {
        highScores.length = 0;
        state.highScores.length = 0;
        scoresRef.forEach(doc => {
          let score = {
            id: doc.id
          };
          score = { ...{ id: doc.id }, ...doc.data() };
          highScores.push(score);
        });
        commit('updateHighScores', highScores);
      }, onSnapshotError('Failed getting event data for high scores'));
    },
    async LOAD_PLAYER_HIGH_SCORE({ commit }, email) {
      const highScore = await getHighScoreByPlayer({
        playerId: email
      });
      commit('setLoading', false);
      commit('setHighScore', highScore.data);
    },
    LOGOUT({ commit }) {
      if (highScoresUnsubscribe) {
        highScoresUnsubscribe();
      }
      commit('setHighScore', 0);
      commit('setUser', null);
    },
    SET_PLAYER_NAME({ commit }, name) {
      commit('setPlayerName', name);
    },
    async SET_AUTHED_PLAYER({ commit, getters, dispatch }, authResult) {
      const lookupPlayer = await getPlayerByEmail({ email: authResult.email });
      const { uid, email } = authResult;

      if (!lookupPlayer.data) {
        const updatedPlayer = await savePlayer({
          uid,
          name: getters.signupPlayerName,
          email
        });
        commit('setUser', updatedPlayer.data);

        if (getters.currentUser) {
          commit('setLoading', true);
          const highScore = await getHighScoreByPlayer({
            playerId: getters.currentUser.email
          });
          commit('setLoading', false);
          commit('setHighScore', highScore.data);
        }
      } else {
        commit('setUser', lookupPlayer.data);
        dispatch('LOAD_PLAYER_HIGH_SCORE', authResult.email);
      }
    },
    SMASH_ROACH({ commit }, tileId) {
      commit('resetTile', tileId);
      commit('incrementScore');
    },
    START_GAME({ state, commit, getters }) {
      commit('resetGame');
      commit('initGame', state.config.numberOfTiles);
      commit('setGameTimer', true);
      const newRoachTimerSpeed = getters.levelSpeed(state.game.difficulty);
      commit('startNewRoachTimer', newRoachTimerSpeed);

      state.game.mainGameTimerId = setTimeout(async () => {
        commit('setGameTimer', false);
        commit('endGame');

        commit('setSaving', true);
        await saveScore({
          playerId: getters.currentUser.name,
          difficulty: state.game.difficulty,
          score: state.currentHighScore
        });
      }, state.config.gameDurationInMs);
      commit('setSaving', false);
    }
  }
});
