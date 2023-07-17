import React, { useState } from "react"
import { Box, Image, Text, Input, Select, CheckIcon, Button, FormControl, Pressable, Icon, WarningOutlineIcon } from "native-base"
import text_cadastro_index from '../../texts/text_cadastro_index.json'
import estilos from "./estilos"
import logo from '../../../assets/logo.png';
import { cadastro } from "../../services/auth";
import { errorAlert } from "../../components/errorAlert";
import {Alert} from 'react-native'
import { alteraDados, verificarEntradaVazia } from "../../utils/comum";
import { regexValidation } from "../../utils/comum";
import MaterialCommunityIcons  from "react-native-vector-icons/MaterialCommunityIcons"
import { TipoUsuarioEnum } from "../../enums/tipoUsuario.enum";

export default function Cadastrar({ navigation }){
    const [dados, setDados] = useState({
        email: "",
        senha: "",
        tipoUsuario: "Jogador"
    });
    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    async function Cadastrar(){
        if (verificarEntradaVazia(dados, setDados)){
            return;
        }
        setIsLoading(true);
        const resultado = await cadastro(email, senha, tipoUsuario);
        console.log(resultado);
        if(resultado == 'ok'){
            navigation.navigate('Home');
        }
        else {
        //errorAlert(resultado);
        Alert.alert(resultado);
        }
        setIsLoading(false);
    };

    return <Box style={estilos.background}>
        <Box>
            <Image style={estilos.image} source={logo} alt='Logo'></Image>
            <Text style={[estilos.titles, {fontSize: 20}]}>{text_cadastro_index.Titulo}</Text>
        </Box>
        <FormControl isRequired isInvalid={dados.email == null || regexValidation(dados.email)} >
            <Box style={estilos.input_box}>
                <FormControl.Label style={estilos.input_box_text}>{text_cadastro_index.Email}</FormControl.Label>
                <Input 
                    value={dados.email} 
                    onChangeText={(valor) => alteraDados("email", valor, dados, setDados)} 
                    style={estilos.input_field} shadow={'4'} borderRadius={'lg'} 
                    placeholder={text_cadastro_index.Email_Placeholder}
                    isInvalid={dados.email == null || regexValidation(dados.email)}
                    >
                    </Input>
            </Box>
            <FormControl.ErrorMessage style={{marginLeft: 40}} leftIcon={<WarningOutlineIcon size="xs" />}>Email Inválido!</FormControl.ErrorMessage>
        </FormControl>
        <FormControl isRequired isInvalid={dados.senha == null || regexValidation(dados.senha)}>
            <Box style={estilos.input_box}>
                <FormControl.Label style={estilos.input_box_text}>{text_cadastro_index.Senha}</FormControl.Label>
                <Input  
                    value={dados.senha} 
                    isInvalid={dados.senha == null || regexValidation(dados.senha)}
                    type={show ? "text" : "password"}
                    onChangeText={(valor) => alteraDados("senha", valor, dados, setDados)} 
                    style={estilos.input_field} shadow={'4'} borderRadius={'lg'}
                    placeholder={text_cadastro_index.Senha_Placeholder}
                    InputRightElement={
                        <Box style={{backgroundColor:"#F5F2E6", width:25, height: 43, justifyContent: "center"}}>
                            <Icon as={<MaterialCommunityIcons name={show ? "eye" : "eye-off"} onPress={() => setShow(!show)}/>} size={5} mr="2" color="muted.400"/>
                        </Box>
                    }>
                    </Input>
                {
                    dados.senha == null || regexValidation(dados.senha) ? 
                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>Senha Fraca!</FormControl.ErrorMessage> : 
                    <FormControl.HelperText>{text_cadastro_index.HelpText_Senha}</FormControl.HelperText>
                }
            </Box>
        </FormControl>
        <FormControl>
            <Box style={estilos.input_box}>
                <FormControl.Label  style={estilos.input_box_text}>{text_cadastro_index.TipoUsuario}</FormControl.Label >
                <Select
                    accessibilityLabel={text_cadastro_index.TipoUsuario_Acessibility_Label}
                    selectedValue={dados.tipoUsuario}
                    onValueChange={(itemValue) => alteraDados("tipoUsuario", itemValue, dados, setDados)} 
                    style={estilos.input_field} shadow={'4'} borderRadius={'lg'} 
                    minWidth="200" mt={1}
                    placeholder={text_cadastro_index.TipoUsuario_Placeholder}
                    _selectedItem={{
                        bg: "#F5DEA8",
                        endIcon: <CheckIcon size="5"/>
                    }}
                    backgroundColor={"#F5F2E6"}>
                    <Select.Item label={text_cadastro_index.TipoUsuario_Jogador_Label} value={text_cadastro_index.TipoUsuario_Jogador_Label}/>
                    <Select.Item label={text_cadastro_index.TipoUsuario_Profissional_Label} value={text_cadastro_index.TipoUsuario_Profissional_Label}/>
                </Select>
            </Box>
        </FormControl>
        <Button style={estilos.button} isLoading={isLoading} spinnerPlacement="end" isLoadingText="Carregando..." _text={{fontWeight: "bold"}} onPress={Cadastrar}>Cadastrar</Button>
    </Box>
}