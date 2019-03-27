import 'firebase/firestore';

import firebase from 'firebase/app';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyCgDUv0MGutosbpWJ4fbYCCMDcQGVq72WM',
  authDomain: 'cockroach-smash.firebaseapp.com',
  databaseURL: 'https://cockroach-smash.firebaseio.com',
  projectId: 'cockroach-smash',
  storageBucket: 'cockroach-smash.appspot.com',
  messagingSenderId: '286046259921'
});

export default firebaseApp.firestore();
