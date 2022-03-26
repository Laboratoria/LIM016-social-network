import { components } from '../view/index.js';
import { registerUser } from '../view/sign-up.js';

const changeView = (route) => {
  // vamos a asociar el nombre de la ruta con el componente
  const mainContainer = document.getElementById('mainContainer');
  // para que no agregue nada porque solo quiero que cambie
  mainContainer.innerHTML = ' ';

  switch (route) {
    case '#/news': {
      mainContainer.appendChild(components.News);
      break;
    }
    case '#/': {
      mainContainer.appendChild(components.Login());
      break;
    }
    case '#/profileRegister': {
      mainContainer.appendChild(components.Registro());
      break;
    }
    case '#/profile': {
      mainContainer.appendChild(components.Profile());
      break;
    }
    case '#/sign-up': {
      mainContainer.appendChild(components.SignUp());
      registerUser();
      break;
    }
    default:
      mainContainer.appendChild(components.different());
      break;
  }
};
export { changeView };
