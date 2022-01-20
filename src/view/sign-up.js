/* eslint-disable no-console */
import {
  createUser,
  emailVerification,
} from '../lib/firebase/auth.js';
import { saveUser } from '../lib/firebase/firestore.js';

const signUp = () => {
  // template de sign up
  const viewSignUp = `
    <form class='formSignUp' id='formSignUp'>
      <h2 class = 'tituloSignUp'>Regístrate</h2>    
      <input type='text' placeholder='Ingrese su usuario' id ='userSignUp' class='userSignUp'>
      <input type='text' placeholder='Ingrese su correo electrónico' id ='emailSignUp' class='emailSignUp'>
      <div class="eye">
      <span class='iconEye'><i class="fas fa-eye-slash"></i></span>
      <input type='password' placeholder='Ingrese su contraseña' id='passSignUp' class='passSignUp'>
      </div>
      <p id="textVerified"></p>
      <input type='submit' value='Registrarme' id='signUp' >
      <a class = 'signIn' href="#/">Iniciar Sesión</a>
      <img class = 'women' src='../img/mujeresunidas_celu.png'>
    </form>
  `;

  // creando estructura html
  const divElement = document.createElement('div');
  divElement.setAttribute('id', 'contentSignUp');
  divElement.setAttribute('class', 'contentSignUp');
  divElement.innerHTML = viewSignUp;
  const userSignUp = divElement.querySelector('#userSignUp');
  const emailSignUp = divElement.querySelector('#emailSignUp');
  const pass = divElement.querySelector('#passSignUp');
  const icon = divElement.querySelector('i');
  const iconEye = divElement.querySelector('.iconEye');
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
  // obteniendo el formulario de registro del usuario
  const userRegister = divElement.querySelector('#formSignUp'); // divElement ya es un elemento de html

  // Evento para crear un usuario
  userRegister.addEventListener('submit', (event) => {
    // const textVerified = document.getElementById('textVerified');

    // Evita que se recargue la página web inmediatamente
    event.preventDefault();

    // funcion para crear un usuario en firebase auth
    createUser(emailSignUp.value, pass.value)
      .then((userCredential) => {
        // PONER FUNCION PARA LIMPIAR FORMULARIO
        const credencialUsuario = userCredential.user;
        const uid = userCredential.user.uid;
        const correo = userCredential.user.email;
        const correoVerificado = userCredential.user.emailVerified;
        console.log(credencialUsuario, correo, uid, correoVerificado);
        console.log('El usuario se creo correctamente', emailSignUp.value, ' y ', pass.value);

        emailVerification()
          .then(() => {
            console.log('Se ha enviado un mensaje de verficicacion al correo ');
            window.location.hash = '#/profileRegister';
            saveUser(emailSignUp.value, pass.value, userSignUp.value, uid);
          })
          .catch((error) => {
            console.log(error, 'Error envio de mensaje al correo electrónico.');
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        // const errorMessage = error.message;
        if (errorCode === 'auth/weak-password') {
          console.log(
            'La contraseña no es lo suficientemente segura.La contraseña debe tener al menos 6 caracteres.',
          );
        } else if (errorCode === 'auth/invalid-password') {
          console.log(
            'El valor dió al password no es válido. Debe ser una string con al menos seis caracteres.',
          );
        } else if (errorCode === 'auth/internal-error') {
          console.log('Error interno');
        } else if (errorCode === 'auth/invalid-email') {
          console.log('La dirección de correo electrónico no es vállida y debe ser un string..');
        } else if (errorCode === 'auth/email-already-in-use') {
          console.log('Ya existe una cuenta con la dirección de correo electrónico proporcionada.');
        } else if (errorCode === 'auth/operation-not-allowed') {
          console.log(
            'las cuentas de correo electrónico / contraseña no están habilitadas. Habilite las cuentas de correo electrónico / contraseña en Firebase Console, en la pestaña Auth.',
          );
        } else if (userSignUp.value === '' || emailSignUp.value === '' || pass.value === '') {
          console.log('Debes completar todos los campos');
        }
        // console.log(errorCode, errorMessage);
      });
  });
  return divElement;
};

export {
  signUp,
  // printSignUp,
};
