import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  setDoc,
  query,
  where,
  getDocs,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  onSnapshot,
  deleteDoc,
  orderBy,
} from "https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js";
import { db } from "../firebase/firebase-initializer.js";
import { auth } from "../firebase/firebase-auth.js";


/******************Agrega un post a FS*********************/
const colRef = collection(db, "posts");

export function addPost(message) {
  const user = auth.currentUser;

  console.log(user);
  console.log("entramos a AddPost");
  addDoc(colRef, {
    id_user: user.uid,
    user_name: user.displayName,
    message,
    date: Date.now(),
    likes: [],
  })
    .then(() => {
      console.log("post subido al firestore!");
    })
    .catch((err) => console.log(err));
}


/******************Agrega un usuario a FS*********************/
const userRef = collection(db, "users");

// ------------------------------

export function addUser(user, name, password) {
  console.log("este es el user que entra como parámetro", user);

  const prueba = user;
  console.log("esta es una prueba", prueba);
  console.log("este es el proveedor", prueba.providerData[0].providerId);
  let nameN, emailN, photoUrlN, logedByN, passwordN;

  if (prueba.providerData[0].providerId === "google.com") {
    // debugger;
    console.log("estás logueado con google!!");
    nameN = user.displayName;
    // emailN = user.auth.currentUser.email;
    emailN = user.email;
    photoUrlN = user.photoURL;
    logedByN = "google";
    passwordN = "";
  } else {
    // Si está logueado con password
    nameN = name;
    emailN = user.email;
    photoUrlN = "../assets/user-img.jpg";
    logedByN = "password";
    passwordN = password;
  }

  let nuevoImg;
  if (!user.photoURL) {
    const photoURL= "https://firebasestorage.googleapis.com/v0/b/yami-cbaa4.appspot.com/o/default-profile.jpeg?alt=media&token=772a7498-d018-4994-9805-041ae047bdc6"
    nuevoImg = photoURL;  
       
  } else {
    nuevoImg = user.photoURL;
  }
  console.log("entramos a AddUsers");

  const userdoc = doc(db, "users", user.uid); //Creamos un documento con el id de nuestro usuario

  // setDoc lo usamos para especificar un id único que nosotros vamos a colocarle,
  // El addDoc autogenera el id
  return setDoc(userdoc, {
    user_id: user.uid,
    user_name: nameN,
    user_photo: photoUrlN,
    user_createdAt: user.metadata.createdAt,
    user_email: emailN,
    user_password: passwordN,
    user_logedBy: logedByN,
  })
    .then(() => {
      console.log("usuario subido al firestore!");
    })
    .catch((err) => console.log(err));
}

/******************Recopila todos los posts*********************/

export async function traerPost() {
  const postsData = [];

  const postsRef = collection(db, "posts");

  const q = query(postsRef, orderBy("date", "desc"));

  const querySnapshotPosts = await getDocs(q);

  querySnapshotPosts.forEach((doc) => {
    const post = doc.data();
    // console.log(post);
    post["post_id"] = doc.id;

    // console.log(post);

    postsData.push(post);
    // console.log(postData)
    // console.log(doc.id, " => ", doc.data());
  });
  // console.log(postsData)
  return postsData;
}


/******************Toggle Likes*********************/

export async function toggleLikes(post_id) {
  // console.log(post.post_id);

  console.log(post_id);
  // en la colección posts, nos vamos a la propiedad "like" (campo) del documento
  const postRef = doc(db, "posts", post_id); // documentRef

  console.log("este es postRef", postRef);
  const userId = auth.currentUser.uid;
  console.log(userId);

  const post = await getDoc(postRef);
  const likes = post.data().likes;
  const userLike = likes.find((like) => {
    //.find defines true o false hasta q las entencia se cumple
    return like === userId;
  });

  if (userLike) {
    await updateDoc(postRef, {
      likes: arrayRemove(userId),
    });
  } else {
    await updateDoc(postRef, {
      likes: arrayUnion(userId),
    });
  }
}


/******************Init Listener Post*********************/

export function initListenerPost(postId, actualizarPost) {
  return onSnapshot(doc(db, "posts", postId), actualizarPost);
}

// ---------------Funciones del post -------------------------------


// Actualizar post

export async function updatePost(post_id, newMessage) {
  const postRef = doc(db, "posts", post_id);

  return await updateDoc(postRef, {
    message: newMessage,
  });
}


// Eliminar post

export async function deletePost(post_id) {
  const postRef = doc(db, "posts", post_id);

  return await deleteDoc(postRef);
}


// Get User Data

export async function getUserData(user_id) {
  const userRef = doc(db, "users", user_id);
  const docSnap = await getDoc(userRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    return await docSnap.data();
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
}


// Comentar un post

export function addComment(current_user, idPost, comment) {

  const commentsRef = collection(db, "posts", idPost, "comments");

  addDoc(commentsRef, {
    id_user: current_user.uid,
    user_name: current_user.displayName,
    message: comment,
    date: Date.now(),
  })
    .then(() => {
      console.log("comentario en firestore");
    })
    .catch((err) => console.log(err));
}


// Check Registered User

export async function checkRegisteredUser(post_id) {
  const userRef = doc(db, "users", post_id);
  const docSnap = await getDoc(userRef);

  if (docSnap.exists()) {
    console.log("pues si existe este usuario en firestore!");
    return await docSnap.data();
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
}


// Recopila los posts del Usuario

export async function traerMisPost(userId) {
  // -------------------
  const q1 = query(
    collection(db, "posts"),
    where("id_user", "==", userId),
    orderBy("date", "desc")
  );

  const querySnapshotPosts = await getDocs(q1);

  const postsFiltradocs = querySnapshotPosts.docs; //Array
  const postsData = [];

  postsFiltradocs.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots

    const post = doc.data();
    console.log(post);
    post["post_id"] = doc.id;

    console.log(post);

    postsData.push(post);
    // console.log(postData)
    // console.log(doc.id, " => ", doc.data());
  });

  return postsData;
}


// Traer los comentarios

export async function traerComments(id_post) {

  const commentsData = [];

  const commentsRef = collection(db, "posts", id_post, "comments");

  const querySnapshotComments = await getDocs(commentsRef);
  
  querySnapshotComments.forEach((doc) => {
    const comment = doc.data();
    // comment["post_id"] = doc.id;
    commentsData.push(comment);
    // console.log(postData)
    // console.log(doc.id, " => ", doc.data());
  });
  console.log(commentsData)
  return commentsData;
}