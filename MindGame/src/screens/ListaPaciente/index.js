import React, { useState, useEffect } from "react"
import { Box, Image, Text, Input, Select, CheckIcon, Button, FormControl, Pressable, Icon, WarningOutlineIcon, FlatList } from "native-base";
import text_listar_paciente_index from '../../texts/text_listar_paciente_index.json'
import estilos from "./estilos"
import { errorAlert } from "../../components/errorAlert";
import { Alert } from 'react-native';
import { alteraDados, verificarEntradaVazia } from "../../utils/comum";
import { regexValidation } from "../../utils/comum";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Logo from '../../../assets/logo.png';
import text_home_index from '../../texts/text_home_index.json';
import { auth } from '../../config/firebase';
import { buscarPacientesPorProfissionalId } from "../../services/firestore_profissional";
import loading from "../../../assets/loading.gif"
import { TouchableOpacity } from "react-native-gesture-handler";

export default function ListaPaciente({ navigation }) {
    const [pacientes, setPacientes] = useState([{Email: undefined, Id: undefined, ProfissionalId: undefined, TipoUsuario: undefined}]);  
    const [useEffectCompleted, setUseEffectCompleted] = useState(false);

    const carregarDados = () => {
        const retorno = buscarPacientesPorProfissionalId(auth.currentUser.uid)
            .then((pacientes) => setPacientes(pacientes))
            .then(setUseEffectCompleted(true));
    }

    useEffect(() => {
        carregarDados();
        console.log(useEffectCompleted)
    }, [useEffectCompleted])

    if (useEffectCompleted == false){
        return (
          <Box style={estilos.containerAnimacao}>
            <Image alt='Carregando' style={estilos.imagem} source={loading}></Image>
          </Box>
        )
    }

    return <Box style={{ flex: 1, backgroundColor: "#F5DEA8", fontFamily: "Inter-Regular" }}>
        <Box style={estilos.header}>
            <Image alt='Mind Game' style={estilos.icone} source={Logo}></Image>
            <Box style={estilos.headerTextColumn}>
                <Text style={[estilos.headerText, { fontSize: 12 }]}>{text_listar_paciente_index.Titulo}</Text>
                <Text style={[estilos.headerText, { fontSize: 15 }]}>{auth.currentUser.email}</Text>
            </Box>
        </Box>

        <Box>
            <Text style={estilos.titles}>{text_listar_paciente_index.Selecione_Paciente}</Text>
            <FlatList 
                    data={pacientes}
                    renderItem={({item}) => {
                        return (
                        <TouchableOpacity>
                        <Box style={estilos.box}>
                                <Text style={{marginLeft: 20, marginTop: 15} }>{item.Email}</Text>
                                <Text style={{marginLeft: 20} }>{item.TipoUsuario}</Text>
                        </Box>
                        </TouchableOpacity>
                    )}}
                    keyExtractor={(item, index) => index.toString()}
            />
            <Button style={estilos.Button} onPress={()=>{navigation.navigate('CadastrarPaciente')}}>{text_listar_paciente_index.Cadastrar_Paciente}</Button>
        </Box>        
    </Box>
}