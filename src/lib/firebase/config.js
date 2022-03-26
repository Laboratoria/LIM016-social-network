/* eslint-disable import/no-unresolved */

// Importación de la app de firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';

// Importación de los metodos de firebase - auth
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

// Importación de los métodos de firebase - firestore
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
  where,
  query,
  orderBy,
  arrayUnion,
  arrayRemove,

} from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';

// Importación de firebase - storage
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,

} from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-storage.js';

// Configuración de la app de firebase
const firebaseConfig = {
  apiKey: 'AIzaSyDhB7rYYx_tmv7V2idc3b5B6B28epqaXFs',
  authDomain: 'red-social-30125.firebaseapp.com',
  projectId: 'red-social-30125',
  storageBucket: 'red-social-30125.appspot.com',
  messagingSenderId: '659462308929',
  appId: '1:659462308929:web:a9b0365293ee87f3f8f2c0',
};

// Inicializando la app de firebase
const swapp = initializeApp(firebaseConfig);

// Inicializando auth de firebase
const auth = getAuth(swapp);

// Inicializando google con Firebase app
const providerGoogle = new GoogleAuthProvider(swapp);

// Inicializando facebook con firebase app
const providerFacebook = new FacebookAuthProvider(swapp);

// Inicializando github con firebase app
const providerGitHub = new GithubAuthProvider(swapp);

// Usuario actual
const userA = auth.currentUser;

// Inicializando la  base de datos firestore
const db = getFirestore(swapp);

// Inicializando el storage
export const storage = getStorage(swapp);

// EXPORT FUNCIONES DE FIREBASE
// Exportación de funciones
export {
  auth, providerGoogle, providerFacebook, providerGitHub, userA,
};

// Exportación de funciones auth
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

// Exportación de firestore
export {
  getFirestore,
  db,
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
  where,
  query,
  orderBy,
  arrayUnion,
  arrayRemove,
  // arrayRemove,
};

// Exportación de storage
export {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
};
