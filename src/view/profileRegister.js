/* eslint-disable no-console */
import { userStateChange } from '../lib/firebase/auth.js';
import { saveProfile } from '../lib/firebase/firestore.js';
// import { getDataUser, nombre, nick } from '../lib/firebase/firestore.js';

const profileRegister = () => {
  const viewRegister = `
  <form class="profileRegister" id='profileRegister'>
  <h2 class ='tituloProfileRegister'>Ingresa tus datos</h2>
  <hr>
  <img class ='camera' src='../img/camara.png' id='camera' > </a>
  <p class='textCamera'>Cambiar foto de perfil</p>
  <input type="text" id="fullName" class="fullName" placeholder= "Nombre">
  <input type="text" id="nickName" class="nickname" placeholder = "Apodo*"  requerided>
  <input type="text" id="ocupation" class="ocupation" placeholder = "Ocupación">
  <input type="email" id="inputEmail" class="email" placeholder = "Correo electrónico" readonly >
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
  const camera = divElement.querySelector('#camera');
  const fullName = divElement.querySelector('#fullName');
  const nickName = divElement.querySelector('#nickName');
  const ocupation = divElement.querySelector('#ocupation');
  const inputEmail = divElement.querySelector('#inputEmail');
  const gender = divElement.querySelector('#gender');
  const age = divElement.querySelector('#age');
  const phone = divElement.querySelector('#phone');
  const introduceYourself = divElement.querySelector('#introduceYourself');
  const formProfileRegister = divElement.querySelector('#profileRegister');
  let email;
  let uid;
  userStateChange((user) => {
    if (user) {
      // USER es una funcion de firebase que trae sus propiedades como el uid. USER es del auth
      email = user.email;
      inputEmail.value = email;
      uid = user.uid;
      console.log('usuario ha iniciado sesion', uid);
      // saveUser(inputEmail.value, fullName.value, uid, nickname.value);
      /* getDataUser(uid)
        .then((result) => {
          fullName.value = nombre;
          console.log(result);
        // result[0].age para llamar a la propiedad
        })
        .catch((err) => {
          console.log(err);
        }); */
    } else console.log('usuario ha cerrado sesion');
  });
  formProfileRegister.addEventListener('submit', (e) => {
    e.preventDefault();
    saveProfile(
      camera.src,
      fullName.value,
      nickName.value,
      ocupation.value,
      inputEmail.value,
      gender.value,
      age.value,
      phone.value,
      introduceYourself.value,
      uid,
    );
    window.location.hash = '#/news';
    console.log('Entraste al registro del perfil');
    // console.log(photo, name, nickname, ocupation, email, gender, age, phone, description);
    // saveUserProfile(photo, name, nickname, ocupation, email, gender, age, phone, description);
  });
  return divElement;
};

export { profileRegister };
