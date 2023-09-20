import React, { useState } from "react"
import { Box, Image, Text, Input, Select, CheckIcon, Button, FormControl, Pressable, Icon, WarningOutlineIcon } from "native-base";
import text_cadastro_index from '../../texts/text_cadastro_index.json'
import estilos from "./estilos"
import { errorAlert } from "../../components/errorAlert";
import { Alert } from 'react-native';
import { alteraDados, verificarEntradaVazia } from "../../utils/comum";
import { regexValidation } from "../../utils/comum";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Logo from '../../../assets/logo.png';
import text_home_index from '../../texts/text_home_index.json';
import { auth } from '../../config/firebase';


export default function ListaPaciente({ navigation }) {

    return <Box style={{ flex: 1, backgroundColor: "#F5DEA8", fontFamily: "Inter-Regular" }}>
        <Box style={estilos.header}>
            <Image alt='Mind Game' style={estilos.icone} source={Logo}></Image>
            <Box style={estilos.headerTextColumn}>
                <Text style={[estilos.headerText, { fontSize: 12 }]}>{text_home_index.Bem_Vindo}</Text>
                <Text style={[estilos.headerText, { fontSize: 15 }]}>{auth.currentUser.email}</Text>
            </Box>
        </Box>
            <Text style={estilos.titles}>{text_home_index.Selecione_Paciente}</Text>
        <Box style={estilos.box}>
            <Text style={{marginLeft: 20, marginTop: 10} }>João Souza</Text>
            <Text style={{marginLeft: 20} }>joaosouza@gmail.com</Text>
        </Box>
        <Box style={estilos.box}>
            <Text style={{marginLeft: 20, marginTop: 10} }>João Souza</Text>
            <Text style={{marginLeft: 20} }>joaosouza@gmail.com</Text>
        </Box>
        <Box style={estilos.box}>
            <Text style={{marginLeft: 20, marginTop: 10} }>João Souza</Text>
            <Text style={{marginLeft: 20} }>joaosouza@gmail.com</Text>
        </Box>
        <Box style={estilos.box}>
            <Text style={{marginLeft: 20, marginTop: 10} }>João Souza</Text>
            <Text style={{marginLeft: 20} }>joaosouza@gmail.com</Text>
        </Box>
        <Button style={estilos.Button} onPress={()=>{navigation.navigate('CadastrarPaciente')}}>Adicionar novo paciênte</Button>
        
    </Box>
}