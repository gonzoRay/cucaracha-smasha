import { highScoresCollection, onSnapshotError } from '@/db';
import { getHighScoreByPlayer, saveScore } from '@/functions';
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
    currentUser: null,
    currentHighScore: 0,
    highScores: []
  },
  getters: {
    gameTiles: state => state.game.tiles,
    levelSpeed: state => level => {
      const targetLevel = state.config.difficultyLevels.find(
        l => l.level === level
      );
      return targetLevel.speed;
    },
    levelLabels: state => state.config.difficultyLevels.map(l => l.label),
    currentUser: state =>
      state.currentUser &&
      state.currentUser.user &&
      state.currentUser.user.email,
    currentHighScore: state => state.currentHighScore,
    highScores: state => state.highScores
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
    setUser(state, payload) {
      state.currentUser = payload;
    },
    startNewRoachTimer(state, payload) {
      state.game.newRoachTimerId = setInterval(() => {
        showRandomRoachImage(state);
        state.game.resetTileTimerId = setTimeout(
          () => resetTile(state, state.game.currentTile),
          payload / Number(1 + state.config.tileDelayFactor)
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
    LOGOUT({ state, commit }) {
      if (highScoresUnsubscribe) {
        highScoresUnsubscribe();
      }
      state.currentHighScore = 0;
      commit('setUser', null);
    },
    async SET_USER({ commit, getters }, user) {
      commit('setUser', user);
      const highScore = await getHighScoreByPlayer({
        playerId: getters.currentUser
      });
      commit('setHighScore', highScore.data);
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
        await saveScore({
          playerId: getters.currentUser,
          difficulty: state.game.difficulty,
          score: state.currentHighScore
        });
      }, state.config.gameDurationInMs);
    }
  }
});
