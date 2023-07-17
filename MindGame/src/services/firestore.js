import {db} from "../config/firebase";
import { doc, setDoc } from "firebase/firestore";
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