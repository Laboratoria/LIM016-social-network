/* eslint-disable import/no-unresolved */

// Importación de la app de firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';

// Importación de los metodos de firebase auth
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  sendEmailVerification,
  FacebookAuthProvider,
  GithubAuthProvider,
  sendPasswordResetEmail,
} from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';

const firebaseConfig = {
  apiKey: 'AIzaSyDhB7rYYx_tmv7V2idc3b5B6B28epqaXFs',
  authDomain: 'red-social-30125.firebaseapp.com',
  projectId: 'red-social-30125',
  storageBucket: 'red-social-30125.appspot.com',
  messagingSenderId: '659462308929',
  appId: '1:659462308929:web:a9b0365293ee87f3f8f2c0',
};

// Initialize Firebase app
const swapp = initializeApp(firebaseConfig);

// Inicializando auth de firebase
const auth = getAuth(swapp);

// Initialize google con Firebase app
const providerGoogle = new GoogleAuthProvider(swapp);

// Incializar facebook con firebase app
const providerFacebook = new FacebookAuthProvider(swapp);

// Incializar github con firebase app
const providerGitHub = new GithubAuthProvider(swapp);

export {
  swapp, auth, providerGoogle, providerFacebook, providerGitHub,
};

export {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  sendEmailVerification,
  FacebookAuthProvider,
  GithubAuthProvider,
  sendPasswordResetEmail,
};
