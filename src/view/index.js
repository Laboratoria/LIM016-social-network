// IMPORTAR TODAS LAS VISTAS
import { login } from './sign-in.js';
import { news } from './news.js';
import { profile } from './profile.js';
import { profileRegister } from './profileRegister.js';
import { signUp } from './sign-up.js';
import Different from './404.js';

const components = {
  Login: login,
  News: news,
  Profile: profile,
  Registro: profileRegister,
  different: Different,
  SignUp: signUp,
};

export { components }; // lo exportamos a view-controler
