/* eslint-disable no-console */
import { userStateChange } from '../lib/firebase/auth.js';
import { saveUserProfile } from '../lib/firebase/firestore.js';

const profileRegister = () => {
  const viewRegister = `
  <form class="profileRegister" id = 'profileRegister'>
    <h2 class ='tituloProfileRegister'>Ingresa tus datos</h2>
    <hr>
    <img src="../img/camara.png" alt="" id='camera'>
    <i class = "far fa-edit" id = "editPhoto"></i>
    <p class='textCamera'>Cambiar foto de perfil</p>
    <input type="text" id="fullName" class="fullName" placeholder="Nombre">
    <input type="text" id="nickName" class="nickname" placeholder = "Apodo*"  requerided>
    <input type="text" id="ocupation" class="ocupation" placeholder = "Ocupación">
    <input type="email" id="inputemail" class="email" placeholder = "Correo electrónico" readonly >
    <select name="gender" id="gender" class = "gender" requerided>
        <option style = "color:gray" disabled selected>Género</option>
        <option value="Femenino">Femenino</option>
        <option value="Masculino">Masculino</option>
        <option value="Prefiero no responder">Prefiero no responder</option>
    </select>
    <input type="number" id="age" class="age" placeholder = "Edad" min="5" max="105">
    <input type="tel" id="phone" class="phone" placeholder = "Telefono">
    <textarea id="introduceYourself" class="introduceYourself" placeholder = "Preséntate" cols="30" rows="5"></textarea>
    <p class='pProfileRegister'>Aquí puedes dejar información de cómo contactarte si deseas 
      ayudar de forma gratuita a mujeres que estén pasando por 
      situaciones de violencia</p>
    <p class='required'>(*)Campo obligatorio</p>
    <input type="submit" value='Guardar'>
  </form>
`;
  document.body.style.background = '#EAC9E2';
  const divElement = document.createElement('div');
  divElement.setAttribute('id', 'contentProfileRegister');
  divElement.setAttribute('class', 'contentProfileRegister');
  divElement.innerHTML = viewRegister;

  // Obteniendo elementos del dom
  const formProfileRegister = divElement.querySelector('#profileRegister');
  let uid;
  let valueEmail;
  userStateChange((user) => {
    const inputEmail = document.getElementById('inputemail');
    if (user) {
      uid = user.uid;
      valueEmail = user.email;
      inputEmail.value = valueEmail;
      console.log(uid, valueEmail);
      console.log('usuario ha iniciado sesion');
    } else {
    // User is signed out
      console.log('usuario ha cerrado sesion');
    }
  });

  formProfileRegister.addEventListener('submit', (e) => {
    // Declaración de variables
    const photo = document.getElementById('camera');
    const fullname = document.getElementById('fullName');
    const nickname = document.getElementById('nickName');
    const ocupation = document.getElementById('ocupation');
    const gender = document.getElementById('gender');
    const age = document.getElementById('age');
    const phone = document.getElementById('phone');
    const description = document.getElementById('introduceYourself');
    e.preventDefault();
    saveUserProfile(
      photo.src,
      fullname.value,
      nickname.value,
      ocupation.value,
      valueEmail,
      gender.value,
      age.value,
      phone.value,
      description.value,
      uid,
    );
    console.log('Entraste al registro del perfil');
    window.location.hash = '#/news';
  });

  return divElement;
};

export { profileRegister };
