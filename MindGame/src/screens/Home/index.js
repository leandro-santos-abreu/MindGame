import * as React from 'react';
import { useState, useContext, useEffect } from 'react';
import { Box, Image, Text, Icon, Modal, FlatList, View } from 'native-base';
import { Dimensions, SafeAreaView, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { auth } from '../../config/firebase';
import { PaginationItem, colors } from '../../components/PaginationItem';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import estilos from './estilos';
import { Dados } from './jogos';
import { fases_imagens } from '../../utils/fases_imagens'; 

import Logo from '../../../assets/logo.png';

import text_home_index from '../../texts/text_home_index.json'

import { useSharedValue } from 'react-native-reanimated';

import { GlobalContext } from '../../contexts/GlobalContext';
import { TipoUsuarioEnum } from '../../enums/tipoUsuario.enum';
import { valueToEnum } from '../../enums/temas.enum';

import { buscarPartidaDeJogadorIdPorTema } from '../../services/firestore_partida';
import GameData from '../../models/GameData';

export default function Home({ navigation }) {

    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;
    const progressValue = useSharedValue(0);

    const [showModal, setShowModal] = useState(false);
    const [tipoUsuario, setTipoUsuario] = useState("");
    const [idPaciente, setIdPaciente] = useState("");
    const [itemEscolhido, setItemEscolhido] = useState({Id: 0, Icone: undefined, Tema: "", Jogo: "", Imagem: undefined, Background: undefined, IconesSelecionaveis: []})
    const [dadosJogador, setDadosJogador] = useState([]);
    const [dadosFaseJogador, setDadosFaseJogador] = useState(new GameData(undefined, undefined, undefined, undefined, undefined, undefined));
    const { buscarTipoUsuario, buscarIdPaciente } = useContext(GlobalContext);
    

    useEffect(() => {
        setItemEscolhido("")
        setDadosFaseJogador(new GameData(undefined, undefined, undefined, undefined, undefined, undefined))
        setTipoUsuario(buscarTipoUsuario());
        setIdPaciente(buscarIdPaciente());
    }, [showModal])

    function logout() {
        auth.signOut();
        navigation.replace("Login");
    }

    async function exibirDadosJogador(item){
        const temaEnum = valueToEnum(item.Tema)
        await buscarPartidaDeJogadorIdPorTema(idPaciente, temaEnum, setDadosJogador);

        setItemEscolhido(item)
    }

    function exibirDadosFaseJogador(dadosFase: GameData){
        setDadosFaseJogador(dadosFase)
    }

    return <Box style={{ flex: 1, backgroundColor: "#F5DEA8", fontFamily: "Inter-Regular" }}>

        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
            <Modal.Content style={estilos.modal} maxWidth="320px" maxHeight="300px">

                <Modal.Body>
                    { 
                        itemEscolhido.Id === undefined ? 
                            <FlatList
                                    horizontal
                                    contentContainerStyle={{flexDirection: 'row', alignItems: "center", justifyContent: "center", margin: 5}} 
                                    data={fases_imagens}
                                    keyExtractor={item => item.Id}
                                    renderItem={({item}) => {
                                        return (
                                            <Box>
                                                <TouchableOpacity onPress={() => exibirDadosJogador(item)} style={estilos.iconeFases}>
                                                    <Image alt={item.Tema} source={item.Icone}></Image>
                                                </TouchableOpacity>
                                            </Box>
                                            )
                            }}/> 

                        : dadosFaseJogador.Tema === undefined ?
                                <Box style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                                    <Image alt={itemEscolhido.Tema} source={itemEscolhido.Icone} style={{marginTop: 25, marginLeft: 5}}></Image>
                                    <FlatList 
                                    
                                                        contentContainerStyle={{flexDirection: 'column', alignItems: "flex-end", justifyContent: "center", margin: 5, marginTop: 25}} 
                                                        data={dadosJogador}
                                                        keyExtractor={item => item.Id}
                                                        renderItem={({item}) => {
                                                            return (
                                                                <Box>
                                                                    <TouchableOpacity onPress={() => exibirDadosFaseJogador(item)} style={estilos.caixaPartidas}>
                                                                        <Text>{item.Dificuldade}</Text>
                                                                    </TouchableOpacity>
                                                                </Box>
                                                                )
                                    }}/> 
                                </Box>
                            :
                                <Box>
                                    <Text style={estilos.modalDadosTitulo}>{text_home_index.Resumo}</Text>
                                    <Box style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                                        <Image alt={itemEscolhido.Tema} source={itemEscolhido.Icone} style={{margin: 5}}></Image>
                                        <Box style={{margin: 10}}>
                                            {console.log(dadosJogador.QuantidadeCliques)}
                                            <Text style={estilos.modalDadosTexto}>{text_home_index.NumeroErros}</Text>
                                            <Text style={[estilos.modalDadosTexto, {marginBottom: 15}]}>{dadosFaseJogador.QuantidadeCliques == 1 ? 0 : dadosFaseJogador.QuantidadeCliques - 1} Erro(s)</Text>

                                            <Text style={estilos.modalDadosTexto}>{text_home_index.NumeroCliques}</Text>
                                            <Text style={[estilos.modalDadosTexto, {marginBottom: 15}]}>{dadosFaseJogador.QuantidadeCliques} Clique(s)</Text>

                                            <Text style={estilos.modalDadosTexto}>{text_home_index.TempoConclusao}</Text>
                                            <Text style={[estilos.modalDadosTexto, {marginBottom: 15}]}>{dadosFaseJogador.TempoDuracao}s</Text>

                                            <Text style={estilos.modalDadosTexto}>{text_home_index.TempoPrimeiroClique}</Text>
                                            <Text style={[estilos.modalDadosTexto, {marginBottom: 15}]}>{dadosFaseJogador.TempoDuracao}s</Text>

                                        </Box>
                                    </Box>
                                </Box>
                    }                   
                    
                </Modal.Body>
            </Modal.Content>
        </Modal>

        <Box style={estilos.header}>
            <Image alt='Mind Game' style={estilos.icone} source={Logo}></Image>
            <Box style={estilos.headerTextColumn}>
                <Text style={[estilos.headerText, { fontSize: 12 }]}>{text_home_index.Bem_Vindo}</Text>
                <Text style={[estilos.headerText, { fontSize: 15 }]}>{auth.currentUser.email}</Text>
            </Box>
            <Box style={estilos.flexContainer}>
                    {tipoUsuario == "Jogador" ? null : <Icon as={<MaterialCommunityIcons name={"account-details"} onPress={()=>{navigation.navigate('ListaPaciente')}} />} size={6} mr="2" color="#F5F2E6" />}
                    <Icon as={<MaterialCommunityIcons name={"logout"} onPress={logout} />} size={6} mr="2" color="#F5F2E6" />
                
            </Box>
        </Box>
        <Box>
            <Text style={estilos.titles}>{text_home_index.Selecionar_Jogo}</Text>
            <Carousel
                vertical={false}
                layout={'default'}
                loop
                width={width}
                height={height * 0.65}
                pagingEnabled={true}
                mode="parallax"
                modeConfig={{
                    parallaxScrollingScale: 1,
                    parallaxScrollingOffset: 100,
                    parallaxAdjacentItemScale: 0.9
                }}
                onProgressChange={(_, absoluteProgress) =>
                    (progressValue.value = absoluteProgress)
                }
                autoPlay={false}
                data={Dados}
                scrollAnimationDuration={1000}
                onSnapToItem={(index) => console.log('current index:', index)}
                renderItem={({ item }) => (
                    <Box style={{ verticalAlign: "middle", alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => { tipoUsuario == TipoUsuarioEnum.Profissional ? setShowModal(true) : navigation.navigate('Fases') }}>
                            <Image alt={item.jogo} style={[{ height: height * 0.65, width: width }, estilos.imagem]} source={item.imagem}></Image>
                        </TouchableOpacity>
                    </Box>
                )}
            />
            {!!progressValue && (
                <Box
                    style={
                        {
                            flexDirection: "row",
                            justifyContent: "space-between",
                            width: 100,
                            alignSelf: "center",
                            marginTop: 15
                        }
                    }
                >
                    {colors.map((backgroundColor, index) => {
                        return (
                            <PaginationItem
                                index={index}
                                backgroundColor={backgroundColor}
                                animValue={progressValue}
                                key={index}
                                isRotate={true}
                                length={colors.length}
                            />
                        );
                    })}
                </Box>
            )}

        </Box>
    </Box>
}
