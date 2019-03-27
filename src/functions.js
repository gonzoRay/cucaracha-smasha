import firebase from 'firebase/app';
import 'firebase/functions';

export const saveScore = firebase.functions().httpsCallable('saveScore');