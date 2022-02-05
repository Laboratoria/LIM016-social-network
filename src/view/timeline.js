import {saveTask} from '../firebase/firestore/firestore-add.js';
import { onGetTasks, delateTask, getTask,updateTask } from '../firebase/configuraciones.js';

/* let taskTitle;
let taskDescription;
let taskLike;

const addPost = (e) => {
  e.preventDefault();
  taskTitle = e.target.closest('form').querySelector('#task-title').value;
  // console.log(taskTitle);
  taskDescription = e.target.closest('form')
      .querySelector('#task-description').value;
  // console.log(taskDescription);
  taskLike = 0;
  console.log(taskTitle, taskDescription, taskLike);

  saveTask(taskTitle, taskDescription, taskLike);
}; */

const timeline = () => {
  const showTimeline = `
  <div >
    <h2> Publicaciones</h2>
    <form class="task-form">
      <label for="title" Title:</label>
      <input type="text" placeholder="task-title" id="task-title">
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

      // prueba 
      let taskTitle;
      let taskDescription;
      let taskLike;

      const addPost = (e) => {
      e.preventDefault();
      taskTitle = e.target.closest('form').querySelector('#task-title').value;
      console.log(taskTitle);
      taskDescription = e.target.closest('form').querySelector('#task-description').value;
      console.log(taskDescription);
      taskLike = 0;
      console.log(taskTitle, taskDescription, taskLike);
      saveTask(taskTitle, taskDescription, taskLike);
      };

  divElemt.querySelector('#btn-task-save').addEventListener('click', addPost);

  let allPosts;
  let showAllPosts;
  // let taskForm;
  const timelineFuntion = async ()=>{
    await onGetTasks((querySnapshot) => {
      allPosts = '';
      querySnapshot.forEach((doc) => {
        // console.log(doc.id);

      allPosts += `
      <form class="form-publication">
        <textarea class='publication-title' disabled> ${doc.data().title}</textarea>
        <textarea class='publication-description' data-id="${doc.id}" disabled>${doc.data().description}</textarea>
        <div>
          <h2> Like </h2>
          <spam class='publication-like' data-like="${doc.id}"> ${doc.data().like}</spam>        
          <button class='btn-like' data-like="${doc.id}">like</button>
        </div>
      
        <button class='btn-delete' data-id="${doc.id}"> Borrar</button>
        <button class='btn-edit' data-id="${doc.id}"> Editar</button>
        <button class='btn-save' data-id="${doc.id}"> Guardar</button>
      </form>
      `;
      });
      showAllPosts = document.querySelector('#tasks-container');
      showAllPosts.innerHTML = allPosts;

      // like
      const btnLike = divElemt.querySelectorAll('.btn-like');

      btnLike.forEach((btn) => {
        btn.addEventListener('click', (e) => {
          console.log('like');
          let totalLikes = 0;
          const likeID = e.target.dataset.id;
          console.log(likeID);

          const likeContent = divElemt.querySelector(`[data-like="${likeID}"]`);
          console.log(likeContent);

          totalLikes++;
          // eslint-disable-next-line padded-blocks
          likeContent.textContent = totalLikes;
        });
      }); 

      // para eliminar
      const btnDelete = divElemt.querySelectorAll('.btn-delete');

      btnDelete.forEach((btn) => {
        btn.addEventListener('click', async (e) => {
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
          const task = doc.data()
          let idBtnEdit =e.target.dataset.id;
          console.log(idBtnEdit);
          let publicationTitle = e.target.closest('form').querySelectorAll('.publication-title'); 
          publicationTitle==task;
          let publicacion=divElemt.querySelector('.publication-title').value;
          console.log(publicacion);
         
/*           textAreaID =e.target.dataset.id;
          textAreaEdit = divElemt.querySelector(`[data-id="${textAreaID}"]`);
          textAreaEdit.disabled=false; */
          //console.log(textAreaEdit);
          /* let publicationTitle = e.target.closest('form').querySelector('.publication-title').value;
          console.log(publicationTitle); */

        });
      });
      const btnSave=divElemt.querySelectorAll('.btn-save');
      const taskForm= document.querySelectorAll('.form-publication')
      btnSave.forEach((btn)=>{
        btn.addEventListener('click',(e)=>{
          e.preventDefault();
          let publicationTitle = e.target.closest('form').querySelector('.publication-title').value;
          //console.log(publicationTitle);
        

        })
      })
      /*  publicationTitle.forEach(evt =>{
         evt.addEventListener()
       }) */


      /*     btnDelete.forEach(btn => {
      btn.addEventListener('click',async({ target:{ dataset }}) => {
        await delateTask(dataset.id);
        console.log(dataset.id)
      });
    }); */

      /*     const btnEdit=document.querySelectorAll(".btn-edit")
    const taskForm=document.querySelector('.task-form')
    btnEdit.forEach(btn=>{
      btn.addEventListener('click',async (e)=>{
        //console.log(e.target.dataset.id);
        const doc=await getTask(e.target.dataset.id)
        console.log(doc.data());
        taskForm['task-title'].value=doc.data().taskTitle;
        taskForm['task-description'].value=doc.data().taskDescription;

      });

    }); */
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
