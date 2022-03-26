/* eslint-disable comma-spacing */
/* eslint-disable no-console */
// Importamos las funciones de firestore
import { addDoc, collection } from '../src/lib/firebase/config';

// Importamos las funciones que vamos a testear
import { saveUser, saveUserProfile } from '../src/lib/firebase/firestore.js';

// Llamamos a la función que mockea las funciones de firebase
jest.mock('../src/lib/firebase/config.js');

// Testeando el registro de un usuario con firebase - auth
describe('Funcion para crear el usuario saveUser', () => {
  it('Deberia subir data a coleccion saveUsers', () => saveUser('karenberrio@gmail.com', '123456', 'karen', 'PsCjKz4DgTMRVTy6POdDYzmL2bD3')
    .then(async () => {
      const prueba = await addDoc(collection.mock.results[0].value, addDoc.mock.calls[0][1]);
      // [0][1] el indice de donde jalamos la primera data
      const datosUsuario = {
        saveUsers: {
          email: 'karenberrio@gmail.com',
          password: '123456',
          uid: 'PsCjKz4DgTMRVTy6POdDYzmL2bD3',
          user: 'karen',
        },
      };
      expect(prueba).toEqual(datosUsuario);
      console.log('Colleción  saveUsers creada:');
    }));
});

// testeando la colleccion profile
describe('Funcion para crear los datos personales del usuario', () => {
  it('Deberia crear la coleccion profile', () => saveUserProfile('', 'karen', '', '', 'karenberrio@gmail.com', '', '27', '', '', 'PsCjKz4DgTMRVTy6POdDYzmL2bD3')
    .then(async () => {
      const docProfile = await (collection.mock.results[0].value, addDoc.mock.calls[0][1]);
      const datosPersonalesUsuario = {
        saveUserProfile: {
          photo: '',
          fullname: 'karen',
          nickname: '',
          ocupation: '',
          email: 'karenberrio@gmail.com',
          gender: '',
          age: '',
          phone: '',
          description: '',
          uid: 'PsCjKz4DgTMRVTy6POdDYzmL2bD3',
        },
      };
      expect(docProfile).toEqual(datosPersonalesUsuario);
      console.log('Colleción  saveUsers creada:');
    }));
});
