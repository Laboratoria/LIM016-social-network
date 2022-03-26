/* eslint-disable no-alert */
/* eslint-disable import/no-mutable-exports */
/* eslint-disable no-console */
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
} from '../lib/firebase/config.js';
import {
  loginUser,
  userStateChange,
  signInGoogle,
  signInFacebook,
  signInGitHub,
  resetPassword,
} from '../lib/firebase/auth.js';

let currentUser;

const login = () => {
  const viewLogin = `
    <form id='formLogin' class='formLogin'>
    <h2 class='tituloLogin'>Sinchi Warmi</h2>
      <div class="containerSignIn"> 
        <input type='text' placeholder='Ingrese su correo electrónico' id='emailLogin' class='emailLogin'>
        <div class="eye">
          <span class='iconEye'><i class="fas fa-eye-slash"></i></span>
          <input type='password' placeholder='Ingrese su contraseña' id='pass' class='passLogin'>
        </div>
        <a class='forgetpass' id='forgetpass' href='#/'>¿Has olvidado tu contraseña?</a>  
        <input type='submit' value='LogIn' id='save' class='save'>
        <p id="textVerified"></p>
        <div class='iconos_sesion'>
          <img src="../img/google.png" id="btn-google" class="btn-google">
          <img src='../img/facebook.png' id='btn-facebook' class= 'btn-facebook'> 
          <img src='../img/github.jpeg' id='gitHub' class='btn-github'> 
        </div>
        <p class="acountP">¿No tienes cuenta? <a href="#/sign-up"> Regístrate aquí</a></p>
      </div>
      <img class='women' src='../img/mujeresunidas_celu.png'>
    </form>
    `;
  document.body.style.background = '#EAC9E2';
  const divElement = document.createElement('div');
  divElement.setAttribute('id', 'contentLogin');
  divElement.setAttribute('class', 'contentLogin');
  divElement.innerHTML = viewLogin;
  const emailLogin = divElement.querySelector('#emailLogin');
  const pass = divElement.querySelector('#pass');
  const iconEye = divElement.querySelector('.iconEye');
  const icon = divElement.querySelector('i');
  iconEye.addEventListener('click', () => {
    if (pass.type === 'password') {
      pass.type = 'text';
      icon.classList.remove('fa-eye-slash');
      icon.classList.add('fa-eye');
    } else {
      pass.type = 'password';
      icon.classList.add('fa-eye-slash');
      icon.classList.remove('fa-eye');
    }
  });

  userStateChange((user) => {
    if (user) {
      currentUser = user;
      console.log('Usuario logueado', user);
    } else {
      console.log('Usuario no logueado');
    }
    return currentUser;
  });

  // Evento cuando olvidaste tu contraseña para iniciar sesión
  const forgetpass = divElement.querySelector('#forgetpass');
  forgetpass.addEventListener('click', () => {
    resetPassword(emailLogin.value)
      .then(() => {
        console.log('Se enviado a ', emailLogin.value, ' un link para restablecer contraseña.');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  });

  // Iniciando sesión con correo y contraseña
  const formLogin = divElement.querySelector('#formLogin'); // divElement ya es un elemento de html
  formLogin.addEventListener('submit', (event) => {
    event.preventDefault();
    currentUser = loginUser(emailLogin.value, pass.value)
      .then((userCredential) => {
        const userEmailVerified = userCredential.user.emailVerified;
        if (userEmailVerified === true) {
          console.log('Usuario registrado y con correo verificado');
          window.location.hash = '#/news';
        } else {
          // muestra mensaje de error si no verifico por correo
          console.log('Error, el usuario no se verifico el correo ');
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // const errorMessage = error.message;
        if (emailLogin.value === '' || pass.value === '') {
          console.log('Debes completar todos los campos');
        } else if (errorCode === 'auth/invalid-email') {
          alert('La dirección de correo electrónico no es válida.');
          console.log('error 400, MODAL, el correo no existe');
        } else if (errorCode === 'auth/user-disabled') {
          alert('El usuario esta desactivado');
        } else if (errorCode === 'auth/user-not-found') {
          alert('Usuario no encontrado, correo electrónico no registrado');
        } else if (errorCode === 'auth/wrong-password') {
          alert('Password incorrecto');
        }
        console.log(errorCode, errorMessage);
      });
  });

  // Iniciando sesion con google
  const google = divElement.querySelector('#btn-google');
  google.addEventListener('click', () => {
    currentUser = signInGoogle()
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(credential);
        console.log(token);
        console.log(user);

        console.log('iniciaste sesion con google', user);
        window.location.hash = '#/news';
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorCode);
        console.log(errorMessage);
        console.log(email);
        console.log(credential);
      });
  });
  // Iniciando sesion con facebook
  const facebook = divElement.querySelector('#btn-facebook');
  facebook.addEventListener('click', () => {
    currentUser = signInFacebook()
      .then((result) => {
        // The signed-in user info.
        const user = result.user;

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        console.log(credential);
        console.log(accessToken);
        console.log(user);
        console.log('iniciaste sesion con facebook', user);
        window.location.hash = '#/news';
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);
        console.log(errorCode);
        console.log(errorMessage);
        console.log(email);
        console.log(credential);
      });
  });
  // Iniciando sesion con github
  const gitHub = divElement.querySelector('#gitHub');
  gitHub.addEventListener('click', () => {
    currentUser = signInGitHub()
      .then((result) => {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(credential);
        console.log(token);
        console.log(user);
        console.log('iniciaste sesion con git hub', user);
        window.location.hash = '#/news';
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GithubAuthProvider.credentialFromError(error);
        console.log(errorCode);
        console.log(errorMessage);
        console.log(email);
        console.log(credential);
      });
  });

  return divElement;
};

export { login, currentUser };
