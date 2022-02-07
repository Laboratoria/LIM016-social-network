import {saveTask} from '../firebase/firestore/firestore-add.js';
import {
  onGetTasks,
  delateTask,
  getTask,
  updateTask,
  // addLike,
} from '../firebase/firestore/firestore-add.js';

let taskDescription;
let taskLike;
let taskUser;

export const currentUser = (UID) => {
  taskUser = UID;
  console.log(taskUser);
};
currentUser();


const addPost = (e) => {
  e.preventDefault();

  taskDescription = e.target.closest('form')
      .querySelector('#task-description').value;
  // console.log(taskDescription);
  taskLike = ['like1'];
  console.log(taskDescription, taskLike, taskUser);
  console.log(taskLike);
  saveTask(taskDescription, taskLike, taskUser);
};

const timeline = () => {
  const showTimeline = `
  <div >
    <h2> Publicaciones</h2>
    <form class="task-form">
      <label for="description">Description:</label>
      <textarea id="task-description" rows="3" 
      placeholder="Task Description" ></textarea>
      <button id="btn-task-save">Save</button>
    </form>
    <div id="tasks-container"></div>
  </div>

  <div id="showAllPosts"> </div>
  </div>

`;
  const divElemt = document.createElement('div');
  divElemt.setAttribute('class', 'flexSection');
  divElemt.innerHTML = showTimeline;
  divElemt.querySelector('#btn-task-save').addEventListener('click', addPost);

  let allPosts;
  let showAllPosts;

  const timelineFuntion = async ()=>{
    await onGetTasks((querySnapshot) => {
      allPosts = '';
      querySnapshot.forEach((doc) => {
        // console.log(doc.id);

        allPosts += `
      <form class="form-publication">
        <textarea class='publication-description' data-id="${doc.id}" disabled>
        ${doc.data().description}</textarea>
        <div>
          <spam class='publication-like' data-like="${doc.id}">
          ${doc.data().like}</spam>        
          <i class="fas fa-heart btn-like" data-id="${doc.id}"></i>

        </div>

        <i class="fas fa-trash-alt btn-delete" data-id="${doc.id}"></i>
        <i class="fas fa-pencil-alt btn-edit" data-id="${doc.id}"></i>
        <button class='btn-save' data-id="${doc.id}"> Guardar</button>
      </form>
      `;
      });
      showAllPosts = document.querySelector('#tasks-container');
      showAllPosts.innerHTML = allPosts;

      // like
      const btnLike = divElemt.querySelectorAll('.btn-like');

      btnLike.forEach((btn) => {
        btn.addEventListener('click', async (e) => {
          e.preventDefault();

          const likeID = e.target.dataset.id;
          const likeContent = divElemt.querySelector(`[data-like="${likeID}"]`);
          // console.log(likes);
          // console.log(likeID);
          // console.log(likeContent);
          const doc = await getTask(e.target.dataset.id);
          const dataLike = doc.data().like;
          console.log(dataLike);
          const totalLikes = dataLike;
          console.log(totalLikes);

          const totalLikesLength = totalLikes.push(taskUser);
          console.log(totalLikesLength);
          likeContent.textContent = totalLikesLength;

          // await addLike(likeID, totalLikesLength);
        });
      });

      // para eliminar
      const btnDelete = divElemt.querySelectorAll('.btn-delete');

      btnDelete.forEach((btn) => {
        btn.addEventListener('click', async (e) => {
          e.preventDefault();
          await delateTask(e.target.dataset.id);
        // console.log(e.currentTarget.dataset.id)
        });
      });

      const btnEdit=divElemt.querySelectorAll('.btn-edit');

      let textAreaID;
      let textAreaEdit;

      btnEdit.forEach((btn) => {
        btn.addEventListener('click', async (e) => {
          e.preventDefault();
          const doc = await getTask(e.target.dataset.id);
          const task = doc.data();
          console.log(task);
          textAreaID =e.target.dataset.id;
          // console.log(textAreaID);
          textAreaEdit = divElemt.querySelector(`[data-id="${textAreaID}"]`);
          // console.log(textAreaEdit.value);

          textAreaEdit.disabled=false;

          // console.log(textAreaEdit);
        });
      });

      const btnActualizar=divElemt.querySelectorAll('.btn-save');
      btnActualizar.forEach((btn)=>{
        btn.addEventListener('click', async (e)=>{
          e.preventDefault();
          const btnActualizarId=e.target.dataset.id;
          // console.log(btnActualizarId);
          const textAreaEdit = divElemt
              .querySelector(`[data-id="${btnActualizarId}"]`);
          // console.log(textAreaEdit.dataset.id, textAreaEdit.value);
          await updateTask(textAreaEdit.dataset.id, textAreaEdit.value);
          // console.log(textAreaEdit.dataset.id,textAreaEdit.value);
          if (textAreaEdit.disabled=false) {
          } else {
            textAreaEdit.disabled=true;
          }
        });
      });
    });
  };

  timelineFuntion();
  return divElemt;
};

export default timeline;


// const querySnapshot=await getTastks()
// {}
// console.log(querySnapshot);

/*   let allPosts
  const funcion = async()=>{
    const querySnapshot=await getTastks()
    //console.log(querySnapshot);
    querySnapshot.forEach(doc => {

      let title=doc.data().Title;
      let Descripción=doc.data().Descripción;
      console.log(doc.data());
      allPosts += template(title,Descripción);

    });
    const showAllPosts=document.querySelector('#tasks-container');
    showAllPosts.innerHTML=allPosts;
  }
  funcion();
return divElemt; */
