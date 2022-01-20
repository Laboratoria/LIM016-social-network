/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
}
  from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';

import { swapp } from './config.js';

const db = getFirestore(swapp); // inicializar la BD

// Función para guardar el usuario registrado
const saveUser = async (email, password, user, uid) => {
  try {
    const docRef = await addDoc(collection(db, 'users'), { // nuevo doc con su par clave-valor
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

// Función para guardar el datos del  formulario de perfil del usuario registrado
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

// obtener data de perfil del usuario
// Get a list of cities from your database
// const getDataUserProfile = async () => {
//   const profileSnapshot = await getDocs(collection(db, 'profile'));
//   const userProfileList = profileSnapshot.docs.map((doc) => doc.data());
//   return console.log(userProfileList);
// };

const getDataUserProfile = async (uidUser) => {
  const queryDataUser = query(collection(db, 'profile'), where('uid', '==', uidUser));
  const querySnapshot = await getDocs(queryDataUser);
  const dataUser = querySnapshot.docs.map((doc) => doc.data());
  return (dataUser);
};

export {
  saveUser,
  saveUserProfile,
  getDataUserProfile,
};
