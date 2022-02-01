/* eslint-disable no-console */
import { viewHeader } from './header.js';
import { logOutUser, userStateChange } from '../lib/firebase/auth.js';
import {
  savePost,
  onGetPost,
  deletePost,
  getDocPost,
  updateDocPost,
  getDataUserProfile,
  // getDataUserLike,
} from '../lib/firebase/firestore.js';

const news = () => {
  const viewNews = `
  <form class="formPost" id="formPost">
    <div id="headerPost" class="headerPost">
      <img src="./img/iconfemale.png" alt="iconfemale">
      <p id="nameUserLogueado"></p>
    </div>
    <textarea placeholder="¿Quieres compartir algo?" id="postDescription" class="postDescription" rows="5"></textarea>
    <div class="postIcons">
    <input type="button" id="cameraPost" class="cameraPost">
    <input type="button" id="videoPost" class="videoPost">
    <button id="compartir" class="compartir">Compartir</button>
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
  const nameUserLogueado = divElement.querySelector('#nameUserLogueado');
  let editStatus = false;
  let idp = '';
  let uidUser;
  let nameUserPost;
  /* window.addEventListener('DOMContentLoaded', async () => {
    const querySnapshot = await getPost();
    console.log(querySnapshot);
  }); */
  userStateChange((user) => {
    if (user) {
      uidUser = user.uid;
      getDataUserProfile(uidUser)
        .then((result) => {
          nameUserPost = result[0].fullName;
          nameUserLogueado.innerHTML = result[0].fullName;
        })
        .catch((err) => console.log(err));
    }
  });
  onGetPost((querySnapshot) => {
    postContainer.innerHTML = '';
    querySnapshot.forEach((doc) => {
      const dataPost = doc.data();
      postContainer.innerHTML += `
      <div class= "userPostId">
          <div class="userPost" id="userPost">
            <img src="../img/usuario-femenino.png" alt="" class="imgPerfil" id="imgPerfil">
            <h5 class="userName" id="userName">${dataPost.name}</h5>
            <h5 class="datetimePost" id="datetimePost"> 12/11/2021 12:00</h5>
            <button class="btn-delete" data-id="${doc.id}">Eliminar</button>
            <button class="btn-edit" data-id="${doc.id}"><i class="far fa-edit"></i>Editar</button>
          </div>
          <div class="data">
            <textarea rows="auto" readonly >${dataPost.description}</textarea>
          </div>
          <button class="iconLike" id="${doc.id}"><i class="fas fa-heart" id="like"></i></button>
      `;
    });
    const btnDelete = postContainer.querySelectorAll('.btn-delete');
    const like = postContainer.querySelectorAll('.iconLike');
    console.log(like);
    // const iconLike = postContainer.querySelector();
    like.forEach((btnIcon) => {
      btnIcon.addEventListener('click', () => {
        console.log('holaaa');
        btnIcon.style.backgroundColor = 'red';
      });
    });

    btnDelete.forEach((btn) => {
      btn.addEventListener('click', (event) => {
        deletePost(event.target.dataset.id);
      });
    });
    const btnEdit = postContainer.querySelectorAll('.btn-edit');
    btnEdit.forEach((btn) => {
      btn.addEventListener('click', async (event) => {
        const doc = getDocPost(event.target.dataset.id);
        const editPost = doc.data();
        formPost.postDescription.value = editPost.description;
        editStatus = true;
        idp = doc.id;
        formPost.compartir.innerHTML = 'Actualizar';
      });
    });
  });
  formPost.addEventListener('submit', (e) => {
    e.preventDefault();
    const postDescription = divElement.querySelector('#postDescription');
    if (!editStatus) {
      // Si no está editando que guarde el post
      savePost(postDescription.value, nameUserPost, uidUser);
      console.log(postDescription.value, 'ya va a salir');
      // compartir.innerText = 'Update';
    } else {
      updateDocPost(idp, { description: postDescription.value });
      // updateDocPost(idp, postDescription.value);
      editStatus = false;
      console.log('editando');
      formPost.compartir.innerHTML = 'Compartir';
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
