import { viewHeader } from './header.js';

const profile = () => {
  const viewProfile = `
    <div class= "viewProfile">
      <input type="file" id="photoFile" class="photoFile" style="display:none">
      <img src= "../img/iconfemale.png" id="userPhoto" alt="imagen-perfil" class = "userPhoto">
      <h4 class= "fullNameProfile" id = "fullNameProfile"> Kaly Zulema Cristobal Alcantara</h4>
      <h4 class = "" id =""> Nickname </h4>
      <h4 class = "" id =""> Ocupación </h4>
      <h4 class = "" id =""> Correo Electrónico </h4>
      <h5 class = "" id =""> Teléfono </h5>
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
  return divElement;
};

export {
  profile,
};
