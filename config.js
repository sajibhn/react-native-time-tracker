import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDaIvzwtAl9r_9ctLFYt0kiQlD6w4cy1g8',
  authDomain: 'react-native-time-tracker.firebaseapp.com',
  projectId: 'react-native-time-tracker',
  storageBucket: 'react-native-time-tracker.appspot.com',
  messagingSenderId: '690637144488',
  appId: '1:690637144488:web:a081c44555324f607f9d9d',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
