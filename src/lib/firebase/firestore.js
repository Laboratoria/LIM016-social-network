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
// let documentFirestoreId;
// Función para guardar el usuario registrado
const saveUser = async (email, password, nameUser, uid) => {
  try {
    const addDocRef = await addDoc(collection(db, 'users'), {
      // nuevo doc con su par clave-valor
      email,
      password,
      nameUser,
      uid,
    });
    console.log('Documento escrito con su ID: ', addDocRef.id);
  } catch (e) {
    console.error('Error al añadir el documento: ', e);
  }
};
const saveProfile = (
  photo,
  fullName,
  nickname,
  ocupation,
  email,
  gender,
  age,
  phone,
  description,
  id,
) => {
  try {
    const addDocProfile = addDoc(collection(db, 'prof'), {
      photo,
      fullName,
      nickname,
      ocupation,
      email,
      gender,
      age,
      phone,
      description,
      id,
    });
    console.log('Documento escrito con su ID: ', addDocProfile.id);
  } catch (e) {
    console.error('Error al añadir el documento: ', e);
  }
};
/* const likes = (like, id) => {
  try {
    const addDocLike = addDoc(collection(db, 'likes'), {
      like,
      id,
    });
    console.log('Documento escrito con su ID: ', addDocLike.id);
  } catch (e) {
    console.error('Error al añadir el documento: ', e);
  }
}; */

/* let nombre;
let nick;
let users; */

/* const getDataUser = async (uidUserParam) => {
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
}; */
// Función para guardar el datos del  formulario de perfil del usuario registrado

// funcion para obtener la data de perfil del usuario
const getDataUserProfile = async (uidUserParam) => {
  const queryDataUser = query(collection(db, 'prof'), where('id', '==', uidUserParam));
  // cuando el ID del firestore sea igual al uid del auth
  const querySnapshot = await getDocs(queryDataUser);
  const dataUser = querySnapshot.docs.map((docSnap) => docSnap.data());
  return dataUser;
};

/* const getDataUserLike = async (uidUserParam) => {
  const queryDataUser = query(collection(db, 'likes'), where('id', '==', uidUserParam));
  // cuando el ID del firestore sea igual al uid del auth
  const querySnapshot = await getDocs(queryDataUser);
  const dataUser = querySnapshot.docs.map((docSnap) => docSnap.data());
  return dataUser;
}; */

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
/* const getDataUserProfile = async (uidUser) => {
  const queryDataUser = query(collection(db, 'user'), where('uid', '==', uidUser));
  const querySnapshot = await getDocs(queryDataUser);
  const dataUser = querySnapshot.docs.map((docu) => docu.data());
  return dataUser;
}; */
// POSTS
// Guardar los post
const savePost = (description, name, uid) => addDoc(collection(db, 'posts'), { description, name, uid });

// Obtener todos  los documentos (los post)
const getPost = () => getDocs(collection(db, 'posts'));

// Escucha los post en tiempo real
const onGetPost = (callback) => onSnapshot(collection(db, 'posts'), callback);

// Eliminar un post
const deletePost = (id) => deleteDoc(doc(db, 'posts', id));

// Obtener un documento del  post
const getDocPost = (id) => getDoc(doc(db, 'posts', id));

// Actualizando un documento del  post
const updateDocPost = (id, newFields) => {
  updateDoc(doc(db, 'posts', id), newFields);
};
export {
  saveUser,
  saveProfile,
  // getDataUserLike,
  getDataUserProfile,
  savePost,
  getPost,
  onGetPost,
  deletePost,
  getDocPost,
  updateDocPost,
  // likes,
};
