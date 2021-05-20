import firebase from "firebase/app";
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBXN4mwQrVWjgws0ZCM5OgxmKDWx4CzGoY",
  authDomain: "pockket-64934.firebaseapp.com",
  projectId: "pockket-64934",
  storageBucket: "pockket-64934.appspot.com",
  messagingSenderId: "691047409990",
  appId: "1:691047409990:web:164f8e7c0b36c981dfdd47",
  measurementId: "G-V9KS3C0LG4"
};

firebase.initializeApp(firebaseConfig);

export { firebase };
