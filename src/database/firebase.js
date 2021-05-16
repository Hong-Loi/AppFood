import firebase from 'firebase';
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyAj7f-SW8T68EVmA7_p-u-klwIZI2UuEgA",
    authDomain: "appfood-20d1b.firebaseapp.com",
    projectId: "appfood-20d1b",
    storageBucket: "appfood-20d1b.appspot.com",
    messagingSenderId: "287226943379",
    appId: "1:287226943379:web:46c528adc5f79894367a66"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  
  const db = firebase.firestore()

  export default{
      firebase,
      db
  }