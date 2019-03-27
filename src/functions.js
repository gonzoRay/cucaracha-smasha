import '@/firebase/init';
import 'firebase/functions';

import firebase from 'firebase/app';

export const saveScore = firebase.functions().httpsCallable('saveScore');
