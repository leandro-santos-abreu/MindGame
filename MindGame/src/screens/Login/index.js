import React, {useContext, useEffect, useRef, useState} from 'react';
import logo from '../../../assets/logo.png';
import estilos from './estilos';
import text_login_index from '../../texts/text_login_index.json'
import { Input, Box, Text, Image, Button} from 'native-base';
import {errorAlert} from '../../components/errorAlert'
import {Alert} from 'react-native'
import { logar } from '../../services/auth';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { auth } from '../../config/firebase';
import { GlobalContext } from '../../contexts/GlobalContext';

import { buscarUsuarioPorId } from '../../services/firestore';

import loading from "../../../assets/loading.gif"

export default function Login({ navigation }) {
  const [isLoadingButton, setIsLoadingButton] = useState(false)
  const [carregando, setCarregando] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState("")

  const useEffectLoadingRef = useRef(true);

  const { definirTipoUsuario, buscarTipoUsuario } = useContext(GlobalContext);

  async function AsyncBuscarUsuarioPorUserCredential(usuario: UserCredential){

    if (usuario !== undefined){
      const dadosUsuario = await buscarUsuarioPorId(usuario.user.uid);
      return dadosUsuario;  
    }
  }

  async function AsyncBuscarUsuarioPorUser(usuario: User){

    if (usuario !== undefined){
      const dadosUsuario = await buscarUsuarioPorId(usuario.uid);
      return dadosUsuario;  
    }
  }

  const AsyncFirstLoad = () => {

    const estadoUsuario = auth.onAuthStateChanged(usuario => {

      if (usuario && useEffectLoadingRef.current){

        AsyncBuscarUsuarioPorUser(usuario).then((dados) => {

          console.log(dados);

          setTipoUsuario(dados?.TipoUsuario);
          definirTipoUsuario(usuario, dados?.TipoUsuario);

          if (dados?.TipoUsuario == "Jogador"){
            navigation.replace('Home');
          }else{
            navigation.replace('ListaPaciente');
          }

        });
      }

      setCarregando(false);
      useEffectLoadingRef.current = false;
      
      console.log(useEffectLoadingRef.current);

    });

  }

  async function Logar(){
    setIsLoadingButton(true);

    console.log(isLoadingButton);
    if (!useEffectLoadingRef.current && !carregando){
      await logar(email, password).then((resultado: UserCredential) => {

        if(resultado !== 'erro'){
          console.log(resultado);
          AsyncBuscarUsuarioPorUserCredential(resultado).then((dados) => {
            definirTipoUsuario(resultado, dados.TipoUsuario);

            console.log(dados)
            if (dados.TipoUsuario == "Jogador"){
              navigation.navigate('Home');
            }else{
              navigation.navigate('ListaPaciente');
            }
            setIsLoadingButton(false);
          })
        }
      });  
    }
  };

  function Cadastrar(){
    navigation.navigate('Cadastrar');
  }

  useEffect(() => {
    if (useEffectLoadingRef.current){
      AsyncFirstLoad();
    }
  },[useEffectLoadingRef.current])

  if (carregando){
    return (
      <Box style={estilos.containerAnimacao}>
        <Image alt='Carregando' style={estilos.imagem} source={loading}></Image>
      </Box>
    )
  }

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
        <TouchableOpacity onPress={Cadastrar}>
          <Text style={[estilos.input_box_text, {marginLeft: '2%', color: '#397DC9'}]}>{text_login_index.Cadastre_se}</Text>
        </TouchableOpacity>
      </Box>
    </Box>
    <Button style={estilos.button} isLoading={isLoadingButton} spinnerPlacement="end" isLoadingText="Carregando..." _text={{fontWeight: "bold"}} onPress={Logar}>Entrar</Button>
    </Box>
}
