// aqui exportaras las funciones que necesites

export const myFunction = () => {
  // aqui tu codigo

};

const login = document.getElementById('login');

function loginTemplate() {
  return `<div class="containerInputs">
  <img class="logoLogin" src="./images/logoNetcoins.png" alt="">

  <h1 >Netcoins</h1>
  <input class="inputUser" type="text" placeholder="Usuario">
  <input class="inputPassword" type="text" placeholder="Contraseña">
  <button class="btn third">LogIn</button>
  <label class="lbl" for=""> o ingresa con:</label>
  <div class="loginIcons">    
   <a href=""><img  src="./images/logo-facebook.png" alt=""></a> 
    <a href=""><img  src="./images/logo-gmail.png" id="authGoogle" alt=""></a>
     <a href=""><img  src="./images/icono-twitter.png" alt=""></a>
     <button id="authFacebook"> Login with Facebook </button>
     </div>
     <div class="groupLbl">  
     <label class="lblCuenta" for="">¿No tienes una cuenta?</label>
     <label class="lblRegistrate" for="">Registrate</label>
     </div>
  
  </div>`;
}

login.innerHTML = loginTemplate();