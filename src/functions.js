import '@/firebase/init';
import 'firebase/functions';

import firebase from 'firebase/app';

export const getHighScoreByPlayer = firebase
  .functions()
  .httpsCallable('getHighScoreByPlayer');
export const getPlayerByEmail = firebase
  .functions()
  .httpsCallable('getPlayerByEmail');
export const savePlayer = firebase.functions().httpsCallable('savePlayer');
export const saveScore = firebase.functions().httpsCallable('saveScore');
