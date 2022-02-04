import {auth, signInWithEmailAndPassword} from '../configuraciones.js';
import {onAuth} from './auth_state_listener.js';
import {showError} from '../../view/signin.js';

export const signIn = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user.uid;
        onAuth(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        // const errorMessage = error.message;
        // console.log('Error', errorCode);
        showError(errorCode);
      });
};
