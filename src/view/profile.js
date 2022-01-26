/* eslint-disable import/named */
/* eslint-disable no-console */
import { viewHeader } from './header.js';
import { getDataUserProfile, nombre, nick } from '../lib/firebase/firestore.js';
import { userStateChange } from '../lib/firebase/auth.js';

const profile = () => {
  const viewProfile = `
    <div class= "viewProfile">
      <input type="file" id="photoFile" class="photoFile" style="display:none">
      <img src= "../img/iconfemale.png" id="userPhoto" alt="imagen-perfil" class = "userPhoto">
      <p class="fullNameProfile" id="fullNameProfile"></p>
      <span class='iconEditPhoto'><i class="far fa-edit"></i></span>
      <p class="nicknameProfile" id ="nicknameProfile"></p>
      <p class = "ocupacionProfile" id ="ocupacionProfile"></p>
      <p class = "emailProfile" id ="emailProfile"></p>
      <p class = "telefonoProfile" id ="telefonoProfile"></p>
      <section class= "conteoPerfil">
        <div class = "conteoPublicaciones">
          <h3 class="conteo">124</h3>
          <h5>Publicaciones</h5>
        </div>
        <div class= "conteoSeguidores" id = "">
          <h3 class="conteo">68</h3>
          <h5>Seguidores</h5>
        </div>
        <div class= "conteoSiguiendo" id = "">
          <h3 class="conteo">38</h3>
          <h5>Siguiendo</h5>
        </div>
      </section>
      <section class= "presentacion" id= "presentacion">
        <h4>Descripción</h4>
        <p class= "descripcion" readonly>Soy una mujer perseverante ...</p>
      </section>
      <div class="icono-publicaciones-usuario">
        <img src="../img/publicaciones.png" id ="" class="">
        <img src="../img/videos.png" id ="" class="">
        <img src="../img/fotosperfil.png" id ="" class="">
      </div>
      <div class="publicaciones-usuario">
        <div class= "publicaciones">1</div>
        <div class= "publicaciones">2</div>
        <div class= "publicaciones">3</div>
        <div class= "publicaciones">4</div>
        <div class= "publicaciones">5</div>
        <div class= "publicaciones">6</div>
        <div class= "publicaciones">7</div>
        <div class= "publicaciones">8</div>
        <div class= "publicaciones">9</div>
      </div>
    </div>
`;
  const divElement = document.createElement('div');
  divElement.setAttribute('id', 'content');
  divElement.innerHTML = viewHeader + viewProfile;
  const fullNameProfile = divElement.querySelector('#fullNameProfile');
  const nicknameProfile = divElement.querySelector('#nicknameProfile');
  const iconEditPhoto = divElement.querySelector('.iconEditPhoto');
  iconEditPhoto.addEventListener('click', () => {
    window.location.hash = '#/profileRegister';
  });
  let uidUser;
  userStateChange((user) => {
    if (user) {
      uidUser = user.uid;
      // const email = user.email;
      // emailProfile.value = email;
      console.log(user, uidUser);
      console.log('usuario esta logueado');
      getDataUserProfile(uidUser)
        .then((result) => {
          fullNameProfile.innerHTML = nombre;
          nicknameProfile.innerHTML = nick;
          console.log(result);
        // result[0].age para llamar a la propiedad
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
    // User is signed out
      console.log('usuario ha cerrado sesion');
    }
  });
  return divElement;
};

export {
  profile,
};
