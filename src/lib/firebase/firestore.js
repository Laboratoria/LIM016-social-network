/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */
import {
  getFirestore,
  addDoc,
  doc,
  getDocs,
  collection,
  /* setDoc,
  getDocs, */
  query,
  where,
  onSnapshot,
  deleteDoc,
  getDoc,
  updateDoc,
} from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';

import { swapp } from './config.js';

const db = getFirestore(swapp); // inicializar la BD
let addDocRef;
let documentFirestoreId;
// Función para guardar el usuario registrado
const saveUser = async (
  email,
  password,
  nameUser,
  uid,
  nickname,
  /* photo,
  ocupation,
  gender,
  age,
  phone,
  description, */
) => {
  try {
    addDocRef = await addDoc(collection(db, 'users'), {
      // nuevo doc con su par clave-valor
      email,
      password,
      nameUser,
      uid,
      nickname,
      /* photo,
      ocupation,
      gender,
      age,
      phone,
      description, */
    });
    console.log('Documento escrito con su ID: ', addDocRef.uid);
    // newCityRef = doc(collection(db, 'users'));
    /* await setDoc(newCityRef, {
      email,
      password,
      nameUser,
      uid,
      nickname,
    }); */
    documentFirestoreId = addDocRef.id;
    // await setDoc(newCityRef, data);
  } catch (e) {
    console.error('Error al añadir el documento: ', e);
  }
};

let nombre;
let nick;
let users;
const getDataUser = async (uidUserParam) => {
  // const docRef = doc(db, 'users', 'addDocRef.id');
  const docRef = query(collection(db, 'users'));
  const docSnap = await getDoc(docRef);
  console.log(docSnap);
  if (docSnap.exists()) {
    // nombre = docSnap.toString('user');
    nombre = docSnap.data().nameUser;
    nick = docSnap.data().nickname;
    console.log('Document data:', docSnap.data().user, nombre);
  } else {
    // doc.data() will be undefined in this case
    console.log('No such document!');
  }
};
// Función para guardar el datos del  formulario de perfil del usuario registrado

// obtener data de perfil del usuario
// Get a list of cities from your database
// const getDataUserProfile = async () => {
//   const profileSnapshot = await getDocs(collection(db, 'profile'));
//   const userProfileList = profileSnapshot.docs.map((doc) => doc.data());
//   return console.log(userProfileList);
// };

/* const getDataUserProfile = async (uidUserParam) => {
  const queryDataUser = query(collection(db, 'users'), where('uid', '==', uidUserParam));
  const querySnapshot = await getDoc(queryDataUser);
  const dataUser = querySnapshot.doc.map((docSnap) =>
  console.log('Document data:', docSnap.data()));
   if (docSnap.exists()) {
      // nombre = docSnap.toString('user');
      nombre = docSnap.data().nameUser;
      nick = docSnap.data().nickname;
      console.log('Document data:', docSnap.data().user, nombre);
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!');
    }
  return console.log(dataUser);
}; */
const getDataUserProfile = async (uidUser) => {
  const queryDataUser = query(collection(db, 'user'), where('uid', '==', uidUser));
  const querySnapshot = await getDocs(queryDataUser);
  const dataUser = querySnapshot.docs.map((docu) => docu.data());
  return dataUser;
};
// POSTS
// Guardar los post
const savePost = (description) => addDoc(collection(db, 'posts'), { description });

// Obtener todos  los documentos (los post)
const getPost = () => getDocs(collection(db, 'posts'));

// Escucha los post en tiempo real
const onGetPost = (callback) => onSnapshot(collection(db, 'posts'), callback);

// Eliminar un post
const deletePost = (id) => deleteDoc(doc(db, 'posts', id));

// Obtener un documento del  post
const getDocPost = (id) => getDoc(doc(db, 'posts', id));

// Actualizando un documento del  post
const updateDocPost = (id, newFields) => updateDoc(doc(db, 'posts', id), newFields);
export {
  saveUser,
  getDataUser,
  nombre,
  nick,
  documentFirestoreId,
  getDataUserProfile,
  savePost,
  getPost,
  onGetPost,
  deletePost,
  getDocPost,
  updateDocPost,
};
