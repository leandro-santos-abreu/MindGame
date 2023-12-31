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
        case AuthErrorCodes.USER_DELETED:
            mensagem = "Usuário informado não está cadastrado.";
            break;
        default:
            mensagem = "Erro desconhecido";
    }

    return mensagem;
}

export async function cadastro(email, senha, tipoUsuario): string{
    let dadosUsuario: UserCredential;
    try{
        dadosUsuario = await createUserWithEmailAndPassword(auth, email, senha);
        console.log(dadosUsuario);
        if (dadosUsuario?.user){
            const user = new UserModel(dadosUsuario?.user?.uid, valueToEnum(tipoUsuario), email);
            const retorno = await salvarUsuario(user);
            return retorno
        }else{
            throw Error("Erro ao Cadastrar Autenticação");
        }
    }catch(error){
        console.log(error);
        console.log(dadosUsuario?.user);
        deleteUser(dadosUsuario?.user);
        return errosFirebase(error);
    }
}

export async function logar(email, senha): Promise<UserCredential | string>{
    try {
        const dadosUsuario = await signInWithEmailAndPassword(auth, email, senha);
        return dadosUsuario;
    } catch (error) {
        console.error(error);
        return errosFirebase(error);
    }
}