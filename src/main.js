// Este es el punto de entrada de tu aplicacion
import { changeView } from './view_controller/router.js';
import { myFunction } from './lib/index.js';

myFunction();

const init = () => {
  // para que no solo se muestre la vista cuando cambia sino tambien cuando se recarga
  changeView(window.location.hash);
  console.log(window.location);
  window.addEventListener('hashchange', () => changeView(window.location.hash));
};
window.addEventListener('load', init);
