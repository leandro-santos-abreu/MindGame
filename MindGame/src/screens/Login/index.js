import React, {useContext, useState} from 'react';
import logo from '../../../assets/logo.png';
import estilos from './estilos';
import text_login_index from '../../texts/text_login_index.json'
import { Input, Box, Text, Image, Button} from 'native-base';
import { AutenticationContext } from '../../contexts/AutenticationContext';
import {errorAlert} from '../../components/errorAlert'
import {Alert} from 'react-native'

export default function Login({ navigation }) {
  [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AutenticationContext)

  function Logar(){
    setIsLoading(true);
    setTimeout(() => {
      const resultado = login(email, password)
      if(resultado == 'ok'){
        navigation.navigate('Home');
      }
      else {
        //errorAlert(resultado)
        Alert.alert(resultado)
      }
      setIsLoading(false);
    }, 3000)

  };


  return <Box style={estilos.background}>
    <Box>
      <Image style={estilos.image} source={logo} alt='Logo'></Image>
      <Text style={[estilos.titles, {fontSize: 20}]}>{text_login_index.Titulo}</Text>
      <Text style={[estilos.titles, {fontSize: 15}]}>{text_login_index.Subtitulo_Login}</Text>
    </Box>
    <Box>
      <Box style={estilos.input_box}>
        <Text style={estilos.input_box_text}>{text_login_index.Email}</Text>
        <Input value={email} onChangeText={setEmail} style={estilos.input_field} shadow={'4'} borderRadius={'lg'} placeholder={text_login_index.Email_Placeholder}></Input>
      </Box>
      <Box style={estilos.input_box}>
        <Text style={estilos.input_box_text}>{text_login_index.Senha}</Text>
        <Input value={password} type={"password"} onChangeText={setPassword} style={estilos.input_field} shadow={'4'} borderRadius={'lg'} placeholder={text_login_index.Senha_Placeholder}></Input>
      </Box>
      <Box style={{flexDirection: 'row', marginTop: '5%', marginLeft: '15%'}}>
        <Text style={estilos.input_box_text}>{text_login_index.Sem_Conta}</Text>
        <Text style={[estilos.input_box_text, {marginLeft: '2%', color: '#397DC9'}]}>{text_login_index.Cadastre_se}</Text>
      </Box>
    </Box>
    <Button style={estilos.button} isLoading={isLoading} spinnerPlacement="end" isLoadingText="Carregando..." _text={{fontWeight: "bold"}} onPress={Logar}>Entrar</Button>
    </Box>
}
