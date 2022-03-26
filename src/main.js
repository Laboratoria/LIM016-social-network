/* eslint-disable no-console */
// Este es el punto de entrada de tu aplicacion
import { changeView } from './view_controller/router.js';

const init = () => {
  // para que no solo se muestre la vista cuando cambia sino tambien cuando se recarga
  changeView(window.location.hash);
  console.log(window.location);
  window.addEventListener('hashchange', () => changeView(window.location.hash));
};
window.addEventListener('load', init);
