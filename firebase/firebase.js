// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-analytics.js";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
  updateProfile,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  setDoc,
  doc,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyCSV8DOc8JK_mkwGKYpMjSGNJyZujRqeUY",
  authDomain: "ecommerce-web-bafe4.firebaseapp.com",
  projectId: "ecommerce-web-bafe4",
  storageBucket: "ecommerce-web-bafe4.appspot.com",
  messagingSenderId: "949352532092",
  appId: "1:949352532092:web:68b35a86f3f321db6321f9",
  measurementId: "G-PNYFEE6KJ2",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export {
  app,
  auth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
  getFirestore,
  collection,
  addDoc,
  setDoc,
  getDoc,
  getDocs,
  doc,
  db,
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
};
