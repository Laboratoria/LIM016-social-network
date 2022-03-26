/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */
import {
  db,
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
  where,
  query,
  arrayUnion,
  arrayRemove,

  // orderBy,
} from './config.js';

// USERS
// Creando la colleccion saveUsers
// Función para guardar el usuario registrado
const saveUser = async (email, password, user, uid) => {
  try {
    const docRef = await addDoc(collection(db, 'saveUsers'), { // nuevo doc con su par clave-valor
      email,
      password,
      user,
      uid,
    });
    console.log('Documento escrito con su ID: ', docRef.id);
  } catch (e) {
    console.error('Error al añadir el documento: ', e);
  }
};

// const getUsers = () => getDocs(query(collection(db, 'users')));

// DATOS PERSONALES DEL USUARIO
// Función para guardar los datos personales del usuario
const saveUserProfile = (
  photo, fullname, nickname, ocupation, email, gender, age, phone, description, uid,
) => {
  try {
    const docProfile = addDoc(collection(db, 'profile'), {
      photo,
      fullname,
      nickname,
      ocupation,
      email,
      gender,
      age,
      phone,
      description,
      uid,
    });
    console.log('Documento  de perfil guardado con id: ', docProfile.id);
  } catch (error) {
    console.error('Error al añadir el documento: ', error);
  }
};
// Función para obtener los datos de profileRegister y mostrarlos en profile.
const getDataUserProfile = async (uidUser) => {
  const queryDataUser = query(collection(db, 'profile'), where('uid', '==', uidUser));
  const querySnapshot = await getDocs(queryDataUser);
  const dataUser = querySnapshot.docs.map((documento) => documento.data());
  return (dataUser);
};

const getDataPost = async (uidUserFilter) => {
  const queryDataPost = query(collection(db, 'posts'), where('uid', '==', uidUserFilter));
  const querySnapshot = await getDocs(queryDataPost);
  const dataPost = querySnapshot.docs.map((documento) => documento.data());
  return console.log(dataPost);
};
// Función para guardar la cuenta del usuario
const userAccount = async (
  uid,
  nameUser,
  displayName,
  email,
  password,
  phoneNumber,
  photoURL,
) => {
  try {
    const docRef = await addDoc(collection(db, 'account'), {
      uid,
      nameUser,
      displayName,
      email,
      password,
      phoneNumber,
      photoURL,
    });
    console.log('Documento escrito con su ID:', docRef.id);
  } catch (error) {
    console.log(error, 'Error al añadir el documento');
  }
};

// POSTS
// Guardar los post
const savePost = (description, name, uid) => addDoc(collection(db, 'posts'), {
  description, name, uid, likePost: [],
});

// Listar los posts - para mostrar todos los posts
const getPosts = () => getDocs(collection(db, 'posts'));

// Escucha los post - para que se actualice solo
const onGetPost = (callback) => onSnapshot(collection(db, 'posts'), callback);

// Eliminar un post
const deletePost = (id) => deleteDoc(doc(db, 'posts', id));

// Obtener un documento del  post
const getDocPost = (id) => getDoc(doc(db, 'posts', id));

// Actualizando un documento del post
const updateDocPost = (id, newFields) => updateDoc(doc(db, 'posts', id), newFields);

// LIKES
// Actualizando likes
const setLikes = async (idDocPost, idUserLike) => updateDoc(doc(db, 'posts', idDocPost), {
  likePost: arrayUnion(idUserLike),
});

const removeLikes = async (idDocPost, idUserLike) => updateDoc(doc(db, 'posts', idDocPost), {
  likePost: arrayRemove(idUserLike),
});
export {
  saveUser,
  saveUserProfile,
  getDataUserProfile,
  userAccount,
  savePost,
  getPosts,
  onGetPost,
  deletePost,
  getDocPost,
  updateDocPost,
  // usuario
  // getUsers,
  setLikes,
  removeLikes,
  getDataPost,
};
