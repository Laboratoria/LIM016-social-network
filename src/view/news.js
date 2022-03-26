/* eslint-disable no-unused-expressions */
/* eslint-disable import/named */
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
  // getDataPost,
  setLikes,
  removeLikes,
} from '../lib/firebase/firestore.js';

// Template de news
const viewNews = `
  <form id="formPost" class="formPost">
    <div class="userPost" id="userPost">
      <img src="../img/photopostuser.png" alt="" class="imgPerfil" id="imgPerfil">
      <h5 class="userName" id="userName">Nombre</h5>
    </div>
    <textarea class="postDescription" id="postDescription" cols="40" rows="5" placeholder="¿Quieres decir algo?" Publica algo></textarea>
    <div class="botones">
      <img src='../img/addphotopost.png'>
      <label>Foto</label>
      <img src='../img/video.png'>
      <label>Video</label>
      <button class="btnPostSave" id="btnPostSave"><h5>Compartir</h5></button>
    </div>
    
  </form>
  <section class="postContainer" id="postContainer"></section>
  
  `;

const divElement = document.createElement('div');
const news = divElement;
divElement.setAttribute('id', 'contentNews');
divElement.setAttribute('class', 'contentNews');
divElement.innerHTML = viewHeader + viewNews;

// Declaración de variables
let editStatus = false;
let idp;
let uidUser;
let fullname;
// let idDocumento;
// Obteniendo el formulario post
const formularioPost = divElement.querySelector('#formPost');
const postContainer = divElement.querySelector('#postContainer');

userStateChange((user) => {
  const nameU = divElement.querySelector('#userName');

  if (user) {
    uidUser = user.uid;
    getDataUserProfile(uidUser)
      .then((result) => {
        fullname = result[0].fullname;
        nameU.textContent = fullname; // nombre del formulario con id formPost
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

window.addEventListener('DOMContentLoaded', async () => {
  await onGetPost((querySnapshot) => {
    postContainer.innerHTML = '';
    let dataPost;
    let arraylike = [];
    let uidDataUser;
    let templateWithButtons;
    let templateWithoutButtons;
    // Listar los posts -
    querySnapshot.forEach((doc) => {
      dataPost = doc.data();
      arraylike = dataPost.likePost;
      uidDataUser = dataPost.uid;

      templateWithButtons = `
        <div class="userPostList" id="userPostList">
          <div class= "dataUserP">
            <img src="../img/photopostuser.png" alt="" class="imgPerfil" id="imgPerfil"">
            <h5 class="userName" id="userNamePost">${dataPost.name}</h5>
            <h5 class="datetimePost" id="datetimePost"> Hace 5s</h5>
            <div class= 'botonesListPost'>
              <button class="btn-delete">
                <i class="fas fa-trash" data-id="${doc.id}"></i>
              </button>
              <button class="btn-edit" >
                <i class="far fa-edit" data-id="${doc.id}"></i>
              </button>
            </div>
          </div>
         
          <div class="data">
            <textarea rows="auto" readonly >${dataPost.description}</textarea>
          </div>
          
          <div class="divLikes">
            <button class = "btn-like" >

              <i class="far fa-thumbs-up" data-id="${doc.id}">${arraylike.length}</i>
            </button>
          </div>

         </div>
      `;
      templateWithoutButtons = `
        <div class="userPostList" id="userPostList">
          <div class= "dataUserP">
            <img src="../img/photopostuser.png" alt="" class="imgPerfil" id="imgPerfil"">
            <h5 class="userName" id="userNamePost">${dataPost.name}</h5>
            <h5 class="datetimePost" id="datetimePost"> Hace 5s</h5>
          </div>
         
          <div class="data">
            <textarea rows="auto" readonly >${dataPost.description}</textarea>
          </div>
          
          <div class="divLikes">
            <button class = "btn-like" >
              <i class="far fa-thumbs-up" data-id="${doc.id}">${arraylike.length}</i>
            </button>
          </div>

         </div>
      `;
      if (uidUser === uidDataUser) {
        postContainer.innerHTML += templateWithButtons;
      } else {
        postContainer.innerHTML += templateWithoutButtons;
      }
    });
    // Eliminando post
    const btnDelete = postContainer.querySelectorAll('.btn-delete');
    btnDelete.forEach((btn) => {
      btn.addEventListener('click', async ({ target: { dataset } }) => {
        await deletePost(dataset.id);
        console.log('Eliminando documento', dataset.id);
      });
    });

    // Editando post
    const btnEdit = postContainer.querySelectorAll('.btn-edit');
    btnEdit.forEach((btnedit) => {
      btnedit.addEventListener('click', async (e) => {
        // idDocumento = e.target.dataset.id;
        await getDocPost(e.target.dataset.id)
          .then((result) => {
            const post = result.data();
            // console.log(post.id);
            formularioPost.postDescription.value = post.description;
            editStatus = true;
            // idp = e.target.dataset.id;
            idp = result.id;
            formularioPost.btnPostSave.innerText = 'Actualizar';
          })
          .catch((err) => {
            console.log(err);
          });
      });
    });

    // Likes de  post
    const btnLikes = postContainer.querySelectorAll('.btn-like');
    // const iconLike = postContainer.querySelectorAll('.fa-thumbs-up');
    btnLikes.forEach((btnlike) => {
      btnlike.addEventListener('click', async (e) => {
        await getDocPost(e.target.dataset.id).then((result) => {
          console.log('doc del post', result.id);
          console.log('uid - usuario loguedo', uidUser);
          // setLikes(result.id, uidUser).FieldValue;
          if (arraylike.indexOf(uidUser) !== -1) {
            removeLikes(result.id, uidUser).FieldValue;
            console.log(arraylike, 'hola');
          } else {
            setLikes(result.id, uidUser).FieldValue;
          }
        });
      });
    });

    //
  });
});

// Guardando datos actualizados del post
formularioPost.addEventListener('submit', async (e) => {
  e.preventDefault();
  const description = formularioPost.postDescription;
  if (description.value === '') {
    alert('Por favor cuéntanos algo');
  } else {
    if (!editStatus) {
      await savePost(description.value, fullname, uidUser);
    } else {
      console.log(idp);
      await updateDocPost(idp, {
        description: description.value,
      });

      editStatus = false;
      idp = '';
      formularioPost.btnPostSave.innerText = 'Guardar';
    }
    formularioPost.reset();
    description.focus();
  }
});

// Funcion para salir
// const logOut = document.querySelector('#logOut');
const logOut = divElement.querySelector('#logOut');
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

export { news };
