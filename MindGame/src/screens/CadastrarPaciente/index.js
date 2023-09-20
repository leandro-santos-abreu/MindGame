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
import text_home_index from '../../texts/text_home_index.json';
import { auth } from '../../config/firebase';
import text_login_index from '../../texts/text_login_index.json'
import { logar } from '../../services/auth';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GlobalContext } from '../../contexts/GlobalContext';

import { buscarUsuarioPorId } from '../../services/firestore';

import loading from "../../../assets/loading.gif"

export default function CadastrarPaciente({ navigation }) {

    return <Box style={{ flex: 1, backgroundColor: "#F5DEA8", fontFamily: "Inter-Regular"}}>
        <Box style={estilos.header}>
            <Image alt='Mind Game' style={estilos.icone} source={Logo}></Image>
            <Box style={estilos.headerTextColumn}>
                <Text style={[estilos.headerText, { fontSize: 12 }]}>{text_home_index.Bem_Vindo}</Text>
                <Text style={[estilos.headerText, { fontSize: 15 }]}>{auth.currentUser.email}</Text>
            </Box>
        </Box>
        <Box style={estilos.input_box}>
            <Text style={estilos.titles}>{text_home_index.Cadastrar_Paciente}</Text>
            <Text style={estilos.input_box_text}>Email</Text>
            <Input style={estilos.input_field} shadow={'4'} borderRadius={'lg'} placeholder={text_login_index.Email_Placeholder}></Input>
            <Button style={estilos.Button}>Cadastrar</Button>
        </Box>
    </Box>
}