// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"

import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC6Rz3LscOb0fds2lWevek7d7TY6z73bIg",
  authDomain: "collab-todo-aee29.firebaseapp.com",
  projectId: "collab-todo-aee29",
  storageBucket: "collab-todo-aee29.appspot.com",
  messagingSenderId: "921398273983",
  appId: "1:921398273983:web:6a4b4ddc102d3cdc9c630a",
  measurementId: "G-W72S02NBBD"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);


// Initialize Firebase
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

export default firebase;