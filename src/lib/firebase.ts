import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyBhroUAvscxBNPCFXH67A8aou7nqPXJzvQ",
    authDomain: "my-list-movies-9e156.firebaseapp.com",
    projectId: "my-list-movies-9e156",
  });
}

export default firebase
