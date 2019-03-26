import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

function showRandomRoachImage(state) {
  console.log('showing a new roach!');
  const randomTileIndex = Math.floor(
    Math.random() * state.config.numberOfTiles
  );

  // Handle picking same tile twice.
  if (state.game.currentTile === randomTileIndex) {
    return showRandomRoachImage(state);
  }

  state.game.currentTile = randomTileIndex;

  const randomRoachIndex =
    Math.floor(Math.random() * state.config.numberOfImageOptions) + 1;
  state.game.tiles[
    state.game.currentTile
  ].imageSrc = require(`@/assets/roaches/roach-${randomRoachIndex}.jpg`);
}

function resetTile(state, tileId) {
  state.game.tiles.find(
    t => t.id === tileId
  ).imageSrc = require('@/assets/empty.png');
}

export default new Vuex.Store({
  state: {
    config: {
      numberOfTiles: 9,
      numberOfImageOptions: 5,
      gameDurationInMs: 15000,
      tileDelayFactor: 0.3,
      difficultyLevels: [
        { level: 0, label: 'Easy', speed: 1500 },
        { level: 1, label: 'Normal', speed: 1250 },
        { level: 2, label: 'Hard', speed: 800 }
      ]
    },
    game: {
      currentTile: -1,
      tiles: [],
      difficulty: 1,
      isRunning: false,
      newRoachTimerId: undefined
    },
    currentUser: { name: 'reagan' },
    currentHighScore: 50,
    highScores: [
      { id: 1, name: 'jimi', score: 70 },
      { id: 2, name: 'sarah', score: 80 },
      { id: 3, name: 'frank', score: 60 },
      { id: 4, name: 'joe', score: 80 },
      { id: 5, name: 'stella', score: 90 }
    ]
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
    currentUser: state => state.currentUser,
    currentHighScore: state => state.currentHighScore,
    highScores: state => state.highScores
  },
  mutations: {
    initGame(state, payload) {
      for (let i = 0; i < payload; i++) {
        state.game.tiles.push({
          id: i,
          imageSrc: require('@/assets/empty.png'),
          scored: false
        });
      }
    },
    resetGame(state) {
      state.game.currentTile = -1;
      state.game.tiles.length = 0;
      state.game.isRunning = false;
    },
    setGameTimer(state, payload) {
      state.game.isRunning = payload;
      let gameLog = payload
        ? `starting game clock at level ${state.game.difficulty}`
        : 'stopping game clock';
      console.info(gameLog);
    },
    setDifficulty(state, payload) {
      state.game.difficulty = payload;
    },
    startNewRoachTimer(state, payload) {
      console.info(`new roach every ${payload / 1000} seconds`);
      state.game.newRoachTimerId = setInterval(() => {
        showRandomRoachImage(state);
        setTimeout(
          () => resetTile(state, state.game.currentTile),
          payload / Number(1 + state.config.tileDelayFactor)
        );
      }, payload);
    },
    cancelNewRoachTimer(state) {
      console.info('stopping new roach timer');
      clearInterval(state.game.newRoachTimerId);
    }
  },
  actions: {
    INIT_GAME({ state, commit }) {
      commit('resetGame');
      commit('initGame', state.config.numberOfTiles);
    },
    START_GAME({ state, commit, getters }) {
      commit('resetGame');
      commit('initGame', state.config.numberOfTiles);
      commit('setGameTimer', true);
      const newRoachTimerSpeed = getters.levelSpeed(state.game.difficulty);
      commit('startNewRoachTimer', newRoachTimerSpeed);

      setTimeout(() => {
        commit('setGameTimer', false);
        commit('cancelNewRoachTimer');
      }, state.config.gameDurationInMs);
    }
  }
});
