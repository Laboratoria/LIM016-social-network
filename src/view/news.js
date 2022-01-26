/* eslint-disable no-console */
import { viewHeader } from './header.js';
import { logOutUser } from '../lib/firebase/auth.js';
import {
  savePost, getPost, onGetPost, deletePost, getDocPost, updateDocPost,
} from '../lib/firebase/firestore.js';

const news = () => {
  const viewNews = `
  <form class="formPost" id="formPost">
    <textarea placeholder="¿Quieres compartir algo?" id="postDescription" class="postDescription" rows="5"></textarea>
    <div class="postIcons">
    <input type="button" id="cameraPost" class="cameraPost">
    <input type="button" id="videoPost" class="videoPost">
    <input type="submit" value="Compartir" id="compartir" class="compartir">
  </div>
  </form>
  <div id="postContainer"></div>
`;
  const divElement = document.createElement('div');
  divElement.setAttribute('id', 'contentNews');
  divElement.setAttribute('class', 'contentNews');
  divElement.innerHTML = viewHeader + viewNews;

  const logOut = divElement.querySelector('#logOut');
  const postContainer = divElement.querySelector('#postContainer');
  const formPost = divElement.querySelector('#formPost');
  let editStatus = false;
  let idp;
  /* window.addEventListener('DOMContentLoaded', async () => {
    const querySnapshot = await getPost();
    console.log(querySnapshot);
  }); */

  onGetPost((querySnapshot) => {
    postContainer.innerHTML = '';
    querySnapshot.forEach((doc) => {
      const dataPost = doc.data();
      postContainer.innerHTML += `
      <div class= "userPostId">
          <div class="userPost" id="userPost">
            <img src="../img/usuario-femenino.png" alt="" class="imgPerfil" id="imgPerfil">
            <h5 class="userName" id="userName">Nombre</h5>
            <h5 class="datetimePost" id="datetimePost"> 12/11/2021 12:00</h5>
            <button class="btn-delete" data-id="${doc.id}">Eliminar</button>
            <button class="btn-edit" data-id="${doc.id}"><i class="far fa-edit"></i>Editar</button>
          </div>
          <div class="data">
            <textarea rows="auto" readonly >${dataPost.description}</textarea>
          </div>
        </div>
      `;
    });
    const btnDelete = postContainer.querySelectorAll('.btn-delete');
    btnDelete.forEach((btn) => {
      btn.addEventListener('click', (event) => {
        deletePost(event.target.dataset.id);
      });
    });
    const btnEdit = postContainer.querySelectorAll('.btn-edit');
    btnEdit.forEach((btn) => {
      btn.addEventListener('click', async (event) => {
        const doc = await getDocPost(event.target.dataset.id);
        const editPost = doc.data();
        formPost.postDescription.value = editPost.description;
        editStatus = true;
        idp = doc.id;
      });
    });
  });

  formPost.addEventListener('submit', (e) => {
    e.preventDefault();
    const postDescription = document.querySelector('#postDescription');
    if (editStatus) {
      updateDocPost(postDescription.value);
    } else {
      savePost(postDescription.value);
      console.log(postDescription.value, 'ya va a salir');
    }
    formPost.reset();
  });
  // CERRAR SESIÓN
  logOut.addEventListener('click', () => {
    logOutUser()
      .then(() => {
        console.log('saliste de sesion');
        window.location.hash = '#/';
      })
      .catch((error) => {
        console.log(error);
      });
  });
  return divElement;
};
export { news };
