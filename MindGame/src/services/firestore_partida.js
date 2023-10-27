import {db} from "../config/firebase";
import { collection, doc, getDocs, query, where, onSnapshot, updateDoc, addDoc } from "firebase/firestore";
import { TemasEnum } from "../../enums/temas.enum"
import GameData from "../models/GameData";

export async function salvarPartida(jogo: GameData){
    try{
        console.log(jogo);
        const jogoRef = await addDoc(collection(db, "partidas"), jogo.toJSON());    
        console.log('Partida adicionada com Id:', jogoRef.id);
        return "ok";
    } catch(error){
        console.log("Erro add partida:", error)
        return "erro";
    }
}

export async function buscarPartidaDeJogadorIdPorTema(jogadorId: string, tema: TemasEnum, setDadosJogador){
    try{
        const userRef = collection(db, "partidas")
        const q = query(userRef, where("JogadorId", "==", jogadorId), where("Tema", "==", tema));

        let partidas = []

        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            partidas.push(new GameData(doc.data().Dificuldade, doc.data().Jogo, doc.data().Tema, doc.data().TempoDuracao, doc.data().QuantidadeCliques, doc.data().JogadorId));
        });

        setDadosJogador(partidas);
        console.log(partidas[0])
    } catch(error){
        console.log("Erro buscar partidas:", error)
        return "erro";
    }
}