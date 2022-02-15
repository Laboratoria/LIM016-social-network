import { db } from "./config.js";
import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js"
import { userDataLocally } from "../components/sessionStorage.js";
//inserto un new post en firestorage
export const insertData = async (post) => {
    let ref = collection(db, "post_user");
    let user = userDataLocally()
    try {
        const docRef = await addDoc(
            ref, {
            newPost: post.value,
            id: user.id,
            photo: user.foto,
            name: user.nombre
        })
        console.log('Funciona');
        return docRef
    } catch (error) {
        throw new Error(error);
    }
};

export const dataDocument = () => getDocs(collection(db, "post_user"))
export const itemsProfie = () => getDocs(collection(db, "usuario"))