import {db} from "../config/firebase";
import { collection, doc, getDocs, setDoc, query, where, onSnapshot, updateDoc } from "firebase/firestore";
import  UserModel  from "../models/UserModel";

export async function salvarPaciente(profissionalId: string, emailPaciente: string){
    try{
        const userRef = collection(db, "usuarios");
        const q = query(userRef, where("Email", "==", emailPaciente));

        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            if (doc.data().ProfissionalId !== undefined){
                console.log("Paciente Já Possui Profissional Associado")
                return "erro";
            }
            updateDoc(doc.ref, {
                ProfissionalId: profissionalId
            }).then(console.log('Paciente ' + doc.id + ' Adicionado ao Profissional ' + profissionalId))
          });

        return "ok"
        
    } catch(error){
        console.log("Erro add paciente:", error)
        return "erro";
    }
}

export async function buscarPacientesPorProfissionalId(Id: string){
    try{
        const userRef = collection(db, "usuarios")
        const q = query(userRef, where("ProfissionalId", "==", Id));

        let pacientes = []

        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            console.log(doc.data())
            pacientes.push({...doc.data()});
        });
        
        return pacientes;
    } catch(error){
        console.log("Erro buscar pacientes:", error)
        return "erro";
    }
}