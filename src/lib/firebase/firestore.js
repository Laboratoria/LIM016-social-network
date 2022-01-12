/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */
import {
  getFirestore,
  collection,
  addDoc,
  // doc,
  // getDoc,
}
  from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';

import { swapp } from './config.js';

const db = getFirestore(swapp); // inicializar la BD
// const isVerifyUser = (email) =>{}

const saveUser = async (email, password, user) => {
  try {
    /* const refer = doc(db, "users", email);
    const docSnap = await getDoc(refer);
      if (docSnap.exists()) {
        console.log(email, 'holaaa');
        console.log("Document data:", docSnap.data());
      }
      else {console.log("No such document!");
      // doc.data() will be undefined in this case
    } */
    const docRef = await addDoc(collection(db, 'users'), {
      email,
      password, // nuevo doc con su par clave-valor
      user,
    });
    console.log('Documento escrito con su ID: ', docRef.id);
  } catch (e) {
    console.error('Error al añadir el documento: ', e);
  }
};

export {
  saveUser,
  // isVerifyUser
};
