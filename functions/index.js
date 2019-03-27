// [START all]
// [START import]
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();
// [END import]

// [START saveScore]
exports.saveScore = functions.https.onRequest(async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Credentials', 'true'); // vital
  if (req.method === 'OPTIONS') {
    // Send response to OPTIONS requests
    res.set('Access-Control-Allow-Methods', 'GET');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Access-Control-Max-Age', '3600');
    res.status(204).send('');
  } else {
    const playerId = req.query.playerId;
    const score = req.query.score;

    const writeResult = await admin
      .firestore()
      .collection('scores')
      .add({ playerId, score });

    res.set('Access-Control-Allow-Origin', '*');
    res.json({ result: `Score with ID: ${writeResult.id} added` });
  }
});
// [END saveScore]
// [END all]
