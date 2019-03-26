export function showRandomRoachImage(state) {
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

  // Avoid showing same roach twice in a row.
  if (state.game.lastRoachIndex === randomRoachIndex) {
    return showRandomRoachImage(state);
  }

  state.game.tiles[
    state.game.currentTile
  ].imageSrc = require(`@/assets/roaches/roach-${randomRoachIndex}.jpg`);
}

export function resetTile(state, tileId) {
  state.game.tiles.find(
    t => t.id === tileId
  ).imageSrc = require('@/assets/empty.png');
}

export function cancelGameTimers(state) {
  clearInterval(state.game.mainGameTimerId);
  clearInterval(state.game.newRoachTimerId);
  clearInterval(state.game.resetTileTimerId);
}

export function calculateHighScore(state) {
  if (state.game.currentScore > state.currentHighScore) {
    state.currentHighScore = state.game.currentScore;
  }
}
