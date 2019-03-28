const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });

admin.initializeApp();

exports.saveScore = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const { playerId, difficulty, score } = req.body.data;

    const writeResult = await admin
      .firestore()
      .collection('scores')
      .add({ playerId, difficulty, score });

    res.set('Access-Control-Allow-Origin', '*');
    res.json({ result: `Score with ID: ${writeResult.id} added` });
  });
});

exports.getHighScoreByPlayer = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const { playerId } = req.body.data;
    let highScore = 0;

    const checkUserResult = await admin
      .firestore()
      .collection('scores')
      .where('playerId', '==', playerId)
      .get();

    if (checkUserResult.empty) {
      res.set('Access-Control-Allow-Origin', '*');
      res.json({ data: highScore });
      return;
    }

    const highScoreResult = await admin
      .firestore()
      .collection('scores')
      .where('playerId', '==', playerId)
      .where('playerId', '>=', '') //filter nulls
      .orderBy('playerId')
      .orderBy('score', 'desc')
      .limit(1)
      .get();

    if (highScoreResult.empty) {
      return highScore;
    }

    const result = highScoreResult.docs[0] && highScoreResult.docs[0].data();
    highScore = Number(result.score);

    res.set('Access-Control-Allow-Origin', '*');
    res.json({ data: highScore });
  });
});
