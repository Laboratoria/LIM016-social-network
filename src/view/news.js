/* eslint-disable no-console */
import { viewHeader } from './header.js';
import { logOutUser } from '../lib/firebase/auth.js';

const news = () => {
  const viewNews = `
    
    <h1> viewNews </h1>
`;
  const divElement = document.createElement('div');
  divElement.setAttribute('id', 'contentNews');
  divElement.setAttribute('class', 'contentNews');
  divElement.innerHTML = viewHeader + viewNews;

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
  return divElement;
};

export { news };
