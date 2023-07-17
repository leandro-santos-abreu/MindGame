import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword, AuthErrorCodes, signInWithEmailAndPassword, deleteUser, UserCredential } from "firebase/auth"
import { salvarUsuario } from "./firestore";
import UserModel  from "../models/UserModel";
import { TipoUsuarioEnum, valueToEnum } from "../enums/tipoUsuario.enum";

function errosFirebase(error){
    let mensagem = "";

    switch(error.code){
        case AuthErrorCodes.EMAIL_EXISTS:
            mensagem = "Esse email já está em uso";
            break;
        case AuthErrorCodes.INVALID_EMAIL:
            mensagem = "Email inválido";
            break;
        case AuthErrorCodes.WEAK_PASSWORD:
            mensagem = "A senha precisa de, no mínimo, 6 caracteres";
            break;
        default:
            mensagem = "Erro desconhecido";
    }

    return mensagem;
}

export async function cadastro(email, senha, tipoUsuario): string{
    let dadosUsuario: UserCredential;
    try{
        const dadosUsuario = await createUserWithEmailAndPassword(auth, email, senha);
        if (dadosUsuario.user){
            const user = new UserModel(dadosUsuario.user.uid, valueToEnum(tipoUsuario));
            const retorno = await salvarUsuario(user);
            return retorno
        }
    }catch{
        console.log(error);
        console.log(dadosUsuario.user);
        deleteUser(dadosUsuario.user);
        return errosFirebase(error);
    }
}

export async function logar(email, senha){
    const resultado = signInWithEmailAndPassword(auth, email, senha)
    .then((dadosUsuario) => {
      console.log(dadosUsuario)
      return "ok"
    })
    .catch((error) => {
        console.log(error)
        return error
    });

    return resultado;
}