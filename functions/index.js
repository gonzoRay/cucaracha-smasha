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
