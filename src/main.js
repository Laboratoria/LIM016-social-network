
//Este es el punto de entrada de tu aplicacion
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-analytics.js";
import { getAuth, signInWithPopup, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, FacebookAuthProvider, GoogleAuthProvider, TwitterAuthProvider, signInWithRedirect, getRedirectResult } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { myFunction } from './lib/index.js';

myFunction();

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
  
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
      apiKey: "AIzaSyBkkJcpQ25A3g6BKZ_-MW5LYY6b6Fh47sg",
      authDomain: "socialnetwork-netcoin.firebaseapp.com",
      projectId: "socialnetwork-netcoin",
      storageBucket: "socialnetwork-netcoin.appspot.com",
      messagingSenderId: "88651159613",
      appId: "1:88651159613:web:eb356f39f3071b37af7254",
      measurementId: "G-ERHK3G9E42"
    };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

/*------CREATE USER WITH EMAIL AND PASSWORD------*/
const email = document.getElementById("createUserEmail").value;
const password = document.getElementById("createUserPassword").value;

const registerUser = () => {
const auth = getAuth();
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
}

/*------SIGN IN USER WITH EMAIL AND PASSWORD------*/

const signInUser = () => {
const auth = getAuth();
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
}

/*------WATCHER------*/
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
  }
});

/*------AUTH WITH GOOGLE------*/
let btnAuthGoogle = document.getElementById("authGoogle");

const loginWithGoogle = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  signInWithRedirect(auth, provider);
  getRedirectResult(auth)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access Google APIs.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      // The signed-in user info.
      const user = result.user;
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
  });
}
btnAuthGoogle.addEventListener("click", loginWithGoogle, false)

/*------AUTH WITH FACEBOOK------*/
let btnAuthFacebook = document.getElementById("authFacebook");

const loginWithFacebook = () => {
  const auth = getAuth();
  const provider = new FacebookAuthProvider();
  signInWithRedirect(auth, provider);
  getRedirectResult(auth)
  .then((result) => {
    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    const credential = FacebookAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;

    const user = result.user;
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // AuthCredential type that was used.
    const credential = FacebookAuthProvider.credentialFromError(error);
    // ...
  });
}
btnAuthFacebook.addEventListener("click", loginWithFacebook, false)


/*------AUTH WITH TWITTER------*/
/*let btnAuthTwitter = document.getElementById("authTwitter");

loginWithTwitter = () => {
  const auth = getAuth();
  const provider = new TwitterAuthProvider();
  signInWithRedirect(auth, provider);
  getRedirectResult(auth)
    .then((result) => {
      // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
      // You can use these server side with your app's credentials to access the Twitter API.
      const credential = TwitterAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const secret = credential.secret;
      // ...
  
      // The signed-in user info.
      const user = result.user;
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = TwitterAuthProvider.credentialFromError(error);
      // ...
    });
}*/

/*btnAuthFacebook.addEventListener("click", loginWithTwitter, false)*/