/* eslint-disable no-console */
import { createUser, emailVerification } from '../lib/firebase/auth.js';
// import { saveUser } from '../lib/firebase/firestore.js';
import { saveUser, userAccount } from '../lib/firebase/firestore.js';

// Template de sign up
const signUp = () => {
  const viewSignUp = `
    <form class='formSignUp' id='formSignUp'>
      <h2 class = 'tituloSignUp'>Regístrate</h2>    
      <div class='divUserSignUp'>
        <span class= 'iconUser'><i class="fas fa-user"></i></span>
        <input type='text' placeholder='Ingrese su usuario' id ='userSignUp' class='userSignUp'>
      </div>
      <div class='divEmailSignUp'>
        <span class='iconEmail'><i class="fas fa-envelope"></i></span>
        <input type='text' placeholder='Ingrese su correo electrónico' id ='emailSignUp' class='emailSignUp'>
      </div>
      <div class="eye">
        <span class='iconEye'><i class="fas fa-eye-slash"></i></span>
        <input type='password' placeholder='Ingrese su contraseña' id='passSignUp' class='passSignUp'>
      </div>
      <p id="signUpErrors" class="signUpErrors"></p>
      <input type='submit' value='Registrarme' id='signUp' class= 'btnSignUp' >
      <img class = 'women' src='../img/mujeresunidas_celu.png'>
    </form>
  `;
  // creando estructura html
  document.body.style.background = '#EAC9E2';
  const divElement = document.createElement('div');
  divElement.setAttribute('id', 'contentSignUp');
  divElement.setAttribute('class', 'contentSignUp');
  divElement.innerHTML = viewSignUp;
  return divElement;
};

// Función que trae errores al registrarse
const errorsOccured = (typeError) => {
  const userSignUp = document.querySelector('#userSignUp');
  const emailSignUp = document.querySelector('#emailSignUp');
  const pass = document.querySelector('#passSignUp');
  const signUpErrors = document.getElementById('signUpErrors');
  switch (typeError.code) {
    case 'auth/weak-password':
      signUpErrors.innerHTML = 'La contraseña no es lo suficientemente segura, debe contener al menos 6 caracteres.';
      break;
    case 'auth/invalid-password':
      signUpErrors.innerHTML = 'El valor que dió al password no es válido, deben ser caracteres válidos.';
      break;
    case 'auth/internal-error':
      signUpErrors.innerHTML = 'Error interno.';
      break;
    case 'auth/invalid-email':
      signUpErrors.innerHTML = 'El correo electrónico no es válido.';
      break;
    case 'auth/email-already-in-use':
      signUpErrors.innerHTML = 'Ya existe una cuenta con el correo electrónico proporcionado.';
      break;
    case 'auth/operation-not-allowed':
      signUpErrors.innerHTML = 'La cuenta de correo electrónico y contraseña no estan habilitadas.';
      break;
    default:
      signUpErrors.innerHTML = typeError;
      break;
  }
  if ((userSignUp.value === '') || (emailSignUp.value === '') || (pass.value === '')) {
    signUpErrors.innerHTML = 'Debes completar todos los campos';
  }
  return (signUpErrors.innerHTML);
};

// función que envía un mensaje de verificación
const sendEmailVerification = () => {
  emailVerification()
    .then(() => {
      console.log('Se ha enviado un mensaje de verificación al correo ');
    })
    .catch((error) => {
      console.log(error, 'Error envio de mensaje al correo electrónico.');
    });
};

const createUserwithFirebase = () => {
  // Declaración de variables
  const userRegister = document.querySelector('#formSignUp');
  const userSignUp = document.querySelector('#userSignUp');
  const emailSignUp = document.querySelector('#emailSignUp');
  const pass = document.querySelector('#passSignUp');
  let credencialUsuario;

  // Creando usuario con firebase
  createUser(emailSignUp.value, pass.value)
    .then((userCredential) => {
      credencialUsuario = userCredential.user;
      const uid = userCredential.user.uid;

      // Enviando correo de verificación
      sendEmailVerification();

      console.log('El usuario se creo correctamente', emailSignUp.value, ' y ', pass.value);

      // Guardando en las colecciones saveUsers y account
      saveUser(emailSignUp.value, pass.value, userSignUp.value, uid);
      userAccount(uid, userSignUp.value, credencialUsuario.displayName, emailSignUp.value,
        pass.value, credencialUsuario.phoneNumber, credencialUsuario.photoURL);

      // Limpia los campos
      userRegister.reset();

      // Te dirige al formulario de registro de datos personales
      window.location.hash = '#/profileRegister';
    })
    .catch((error) => {
      errorsOccured(error);
    });
};

// Función para acciones del registro del usuario
const registerUser = () => {
  // Declaración de variables
  const userRegister = document.querySelector('#formSignUp'); // divElement ya es un elemento de html
  const pass = document.querySelector('#passSignUp');
  const icon = document.querySelector('i');
  const iconEye = document.querySelector('.iconEye');

  // Evento para mostrar y ocultar contraseña
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

  // Evento para crear un usuario
  userRegister.addEventListener('submit', (event) => {
    // Evita que se recargue la página web inmediatamente
    event.preventDefault();
    // funcion para crear un usuario en firebase auth
    createUserwithFirebase();
  });
};

export { signUp, registerUser };
