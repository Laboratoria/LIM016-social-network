import { components } from '../components/components.js';
import {loginGoogle} from '../components/login.js';

export const componentsViews = (hash) => {
    const main = document.getElementById('main');
    main.innerHTML = ''
    // devuelve la parte de anclaje de la URL(ruta)
    switch (hash) {
        case '': 
        case '#/': 
        case '#/login':
            main.appendChild(components.Login());
            loginGoogle();
            
            break;
        case '#/registro':
            main.appendChild(components.Registro());
            break;
        default:
            main.innerHTML = 'Página No Encontrada';
            break;
    }
}