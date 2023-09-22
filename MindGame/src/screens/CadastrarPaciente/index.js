import React, {useContext, useEffect, useState} from 'react';
import { Box, Image, Text, Input, Select, CheckIcon, Button, FormControl, Pressable, Icon, WarningOutlineIcon } from "native-base";
import text_cadastro_index from '../../texts/text_cadastro_index.json'
import estilos from "./estilos"
import { errorAlert } from "../../components/errorAlert";
import { Alert } from 'react-native';
import { alteraDados, verificarEntradaVazia } from "../../utils/comum";
import { regexValidation } from "../../utils/comum";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Logo from '../../../assets/logo.png';
import { auth } from '../../config/firebase';
import text_cadastro_paciente_index from '../../texts/text_cadastro_paciente_index.json'
import { logar } from '../../services/auth';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GlobalContext } from '../../contexts/GlobalContext';

import { buscarUsuarioPorId } from '../../services/firestore';

import loading from "../../../assets/loading.gif"
import { salvarPaciente, buscarPacientesPorProfissionalId } from '../../services/firestore_profissional';


export default function CadastrarPaciente({ navigation }) {
    const [dados, setDados] = useState({
        email: ""
    });

    async function Cadastrar(emailPaciente: string){
        const retorno = await salvarPaciente(auth.currentUser.uid, emailPaciente)
    
        if (retorno == "ok"){
            Alert.alert("Paciente Cadastrado com Sucesso!")
            navigation.replace("Home");
        }else{
            Alert.alert("Erro ao Cadastrar Paciente!")
        }
    }

    return <Box style={{ flex: 1, backgroundColor: "#F5DEA8", fontFamily: "Inter-Regular"}}>
        <Box style={estilos.header}>
            <Image alt='Mind Game' style={estilos.icone} source={Logo}></Image>
            <Box style={estilos.headerTextColumn}>
                <Text style={[estilos.headerText, { fontSize: 12 }]}>{text_cadastro_paciente_index.Titulo}</Text>
                <Text style={[estilos.headerText, { fontSize: 15 }]}>{auth.currentUser.email}</Text>
            </Box>
        </Box>
        <Box style={estilos.input_box}>
            <Text style={estilos.titles}>{text_cadastro_paciente_index.Cadastrar_Paciente}</Text>
            <Text style={estilos.input_box_text}>{text_cadastro_paciente_index.Email}</Text>
            <Input 
                    value={dados.email} 
                    onChangeText={(valor) => alteraDados("email", valor, dados, setDados)} 
                    style={estilos.input_field} shadow={'4'} borderRadius={'lg'} 
                    placeholder={text_cadastro_paciente_index.Email_Placeholder}
                    isInvalid={dados.email == null || regexValidation(dados.email)}
                    >
            </Input>            
            <Button onPress={() => Cadastrar(dados.email)} style={estilos.Button}>{text_cadastro_paciente_index.Cadastrar}</Button>
        </Box>
    </Box>
}