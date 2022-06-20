import firebase from "firebase/compat/app";
import "firebase/compat/database";

const firebaseConfig = {
    apiKey: "AIzaSyBiUNwws9K0YuEtT3pSumN0EBqoCwh5oE4",
    authDomain: "research-details.firebaseapp.com",
    projectId: "research-details",
    storageBucket: "research-details.appspot.com",
    messagingSenderId: "82602196763",
    appId: "1:82602196763:web:6cfd78520ea81329125dbe"
  };

  const fireDb = firebase.initializeApp(firebaseConfig);
  export default fireDb.database().ref();
