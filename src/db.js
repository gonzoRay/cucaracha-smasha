import db from '@/firebase/init';

const onSnapshotError = src => error =>
  console.error(`Firebase onSnapshot failed: ${error} src: ${src}`);

const highScoreCount = 5;

const highScoresCollection = db
  .collection('scores')
  .orderBy('score', 'desc')
  .limit(highScoreCount);

export { highScoresCollection, onSnapshotError };
