/* eslint-disable no-console */
import { userStateChange } from '../lib/firebase/auth.js';
import { saveUserProfile } from '../lib/firebase/firestore.js';

const profileRegister = () => {
  const viewRegister = `
  <form class="profileRegister" id = 'profileRegister'>
  <h2 class ='tituloProfileRegister'>Ingresa tus datos</h2>
  <hr>
  <img class ='camera' src='../img/camara.png' id='camera' > </a>
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
  const divElement = document.createElement('div');
  divElement.setAttribute('id', 'contentProfileRegister');
  divElement.setAttribute('class', 'contentProfileRegister');
  divElement.innerHTML = viewRegister;

  const formProfileRegister = divElement.querySelector('#profileRegister');
  userStateChange((user) => {
    if (user) {
      const inputEmail = document.getElementById('inputemail');
      const email = user.email;
      inputEmail.value = email;
      console.log(email);
      console.log('usuario ha iniciado sesion');
    } else {
      // User is signed out
      console.log('usuario ha cerrado sesion');
    }
  });

  formProfileRegister.addEventListener('submit', (e) => {
    e.preventDefault();
    const photo = document.getElementById('photo');
    const name = document.getElementById('fullName').value;
    const nickname = document.getElementById('nickName').value;
    const ocupation = document.getElementById('ocupation').value;
    const email = document.getElementById('inputemail').value;
    const gender = document.getElementById('gender').value;
    const age = document.getElementById('age').value;
    const phone = document.getElementById('phone').value;
    const description = document.getElementById('introduceYourself').value;
    console.log('Entraste al registro del perfil');
    console.log(photo, name, nickname, ocupation, email, gender, age, phone, description);
    saveUserProfile(photo, name, nickname, ocupation, email, gender, age, phone, description);
    window.location.hash = '#/news';
  });

  return divElement;
};

export { profileRegister };
