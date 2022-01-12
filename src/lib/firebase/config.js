/* eslint-disable import/no-unresolved */
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';

const firebaseConfig = {
  apiKey: 'AIzaSyDhB7rYYx_tmv7V2idc3b5B6B28epqaXFs',
  authDomain: 'red-social-30125.firebaseapp.com',
  projectId: 'red-social-30125',
  storageBucket: 'red-social-30125.appspot.com',
  messagingSenderId: '659462308929',
  appId: '1:659462308929:web:a9b0365293ee87f3f8f2c0',
};

// Initialize Firebase
const swapp = initializeApp(firebaseConfig);
export { swapp };
