import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  sendEmailVerification,
} // eslint-disable-next-line import/no-unresolved
  from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';

// eslint-disable-next-line import/no-unresolved
import { swapp } from './config.js';

const auth = getAuth(swapp);
const provider = new GoogleAuthProvider(swapp);

provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
// SIGN-UP
export const createUser = async (email, password) => {
  await createUserWithEmailAndPassword(auth, email, password);
};

// SIGN-IN
export const loginUser = async (email, password) => {
  await signInWithEmailAndPassword(auth, email, password)
};
// SEE

export const stateChange = async (state) =>{
  await onAuthStateChanged(auth, (state));
}

export const out = () =>{
  signOut(auth)};

export const emailVerification = () =>{
  sendEmailVerification(auth.currentUser)
  .then(() =>{
    console.log("correo enviado");
  })
  .catch((error) => {
    console.log(error, "Error occurred. Inspect error.code.");
  });
  };

provider.addScope('profile');
provider.addScope('email');
export const signInGoogle = () =>{
  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    console.log(credential, token, user);

    /*provider.setCustomParameters({
      'login_hint': 'user@example.com'
    });*/
    
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
