import {db} from "../config/firebase";
import { collection, doc, getDocs, setDoc, query, where, onSnapshot } from "firebase/firestore";
import  UserModel  from "../models/UserModel";

export async function salvarUsuario(userModel: UserModel){
    try{
        console.log(userModel);
        await setDoc(doc(db, "usuarios", userModel.Id), userModel.toJSON());    
        console.log('Usuário adicionado com o ID:', userModel.Id);
        return "ok";
    } catch(error){
        console.log("Erro add usuario:", error)
        return "erro";
    }
}

export async function buscarUsuarioPorId(Id: string){
    try{
        const userRef = collection(db, "usuarios")
        const q = query(userRef, where("Id", "==", Id));

        let usuario = []

        const querySnapshot = await getDocs(q);     
        querySnapshot.forEach((doc) => {
            usuario.push({ ...doc.data()})
        });   
        console.log('Usuário Encontrado:', usuario[0]);
        return usuario[0];
    } catch(error){
        console.log("Erro buscar usuario:", error)
        return "erro";
    }
}