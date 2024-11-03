import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyAtTrCtsB4iPbzlbopzLf_71_5u_IFZzhE",
  authDomain: "health-advice-app.firebaseapp.com",
  projectId: "health-advice-app",
  storageBucket: "health-advice-app.firebasestorage.app",
  messagingSenderId: "859521532114",
  appId: "1:859521532114:web:5f276364d4496af1bbad0b"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL); // Use LOCAL persistence

export { auth };
