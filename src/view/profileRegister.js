import { stateChange } from '../lib/firebase/auth.js'
const profileRegister = () => {
  const viewRegister = `
  <form class="profileRegister">
  <h2 class = 'titulo'>Ingresa tus datos</h2>
  <hr>
  <img class = 'camera' src='../img/camara.png'>
  <p class='textCamera'>Cambiar foto de perfil</p>
  <input type="text" id="fullName" class="fullName" placeholder = "Nombre completo">
  <input type="text" id="nickname" class="nickname" placeholder = "Apodo">
  <input type="text" id="ocupation" class="ocupation" placeholder = "Ocupación">
  <input type="email" id="email2" class="email" placeholder = "Correo electrónico">
  <select name="gender" id="gender" class = "gender" placeholder = "Género">
      <option style = "color:gray" disabled selected>Género</option>
      <option value="Femenino">Femenino</option>
      <option value="Masculino">Masculino</option>
      <option value="Prefiero no responder">Prefiero no responder</option>
  </select>
  <input type="text" id="age" class="age" placeholder = "Edad">
  <textarea id="introduceYourself" class="introduceYourself" placeholder = "Preséntate" cols="30" rows="5"></textarea>
  <p class='pProfileRegister'>Aquí puedes dejar información de cómo contactarte si deseas 
    ayudar de forma gratuita a mujeres que estén pasando por 
    situaciones de violencia</p>
  <p class='required'>(*)Campo obligatorio</p>
  <input type="submit" id="btnSave" class="btnSave" value='Guardar'>
</form>
`;
  const divElement = document.createElement('div');
  divElement.setAttribute('id', 'contentProfileRegister');
  divElement.setAttribute('class', 'contentProfileRegister');
  divElement.innerHTML = viewRegister;
  
  stateChange()
  .then(()=>{
    if (user) {
      //const user = auth.currentUser;
      const email2 = divElement.querySelector('#email2');
      //const uid = user.uid;
      const email = user.email;
      //console.log(uid);
      //console.log(email);
      email2.value = email;
      console.log(email);
    }
  })
  .catch(()=>{
    console.log("error");
  })
 
  
 

  //window.location.hash = '#/news';
  return divElement;
};

export {
  profileRegister,
};
