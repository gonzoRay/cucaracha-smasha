// [START all]
// [START import]
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();
// [END import]

// [START saveScore]
exports.saveScore = functions.https.onRequest(async (req, res) => {
  const playerId = req.query.playerId;
  const score = req.query.score;

  const writeResult = await admin
    .firestore()
    .collection('scores')
    .add({ playerId, score });

  res.json({ result: `Score with ID: ${writeResult.id} added` });
});
// [END saveScore]
// [END all]
