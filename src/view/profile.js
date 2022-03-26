/* eslint-disable no-console */
import { viewHeader } from './header.js';
import { getDataUserProfile } from '../lib/firebase/firestore.js';
import { userStateChange } from '../lib/firebase/auth.js';

const profile = () => {
  const viewProfile = `
    <div class= "viewProfile">
      <img src= "../img/iconfemale.png" id="userPhoto" alt="imagen-perfil" class = "userPhoto">
      <input type="file" id="photoFile" class="photoFile" style="display:none">
      
      <i class="far fa-edit"></i> 
      <h3 class= "fullNameProfile" id = "fullNameProfile"> </h3>
      
      <h4 class = "" id ="nickName"> Nickname </h4>
      <h4 class = "" id ="ocupation"> Ocupación </h4>
      <h4 class = "" id ="correo"> Correo Electrónico </h4>
      <h4 class = "" id ="phone"> Teléfono </h4>
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
        <p class= "descripcion" id= "description"  readonly>Soy una mujer perseverante ...</p>
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

  let uidUser;
  const name = divElement.querySelector('#fullNameProfile');
  const nickname = divElement.querySelector('#nickName');
  const ocupation = divElement.querySelector('#ocupation');
  const email = divElement.querySelector('#correo');
  const phone = divElement.querySelector('#phone');
  const description = divElement.querySelector('#description');
  userStateChange((user) => {
    if (user) {
      uidUser = user.uid;

      getDataUserProfile(uidUser)
        .then((result) => {
          name.textContent = result[0].fullname;
          nickname.textContent = result[0].nickname;
          ocupation.textContent = result[0].ocupation;
          email.textContent = result[0].email;
          phone.textContent = result[0].phone;
          description.textContent = result[0].description;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });

  return divElement;
};

export {
  profile,
};
