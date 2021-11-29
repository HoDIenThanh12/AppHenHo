import firebase from "firebase";
import 'firebase/auth';
import 'firebase/firestore';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBgwtRLq1e9IsUkfnUxw8l-3AZteQdDuQM",
  authDomain: "chat-479b1.firebaseapp.com",
  databaseURL: "https://chat-479b1-default-rtdb.firebaseio.com",
  projectId: "chat-479b1",
  storageBucket: "chat-479b1.appspot.com",
  messagingSenderId: "31017229949",
  appId: "1:31017229949:web:8c50ba7a6ff2b8d883db14",
  measurementId: "G-NJ122ECWSR"
  };

  let app;
  if (firebase.apps.length === 0) {
      app = firebase.initializeApp(firebaseConfig);
  } else {
      app = firebase.app();
  }
  const db = app.firestore();
  const auth = firebase.auth();
  const abb= app.database()
  const abbImage=app.storage();

export {db, auth,abb,abbImage} ;