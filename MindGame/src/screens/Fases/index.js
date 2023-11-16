import React, { useContext, useEffect, useRef } from 'react';
import { Center, Text, Image, Box, ScrollView, Modal, FormControl, Input, Button, FlatList } from 'native-base';

import text_fases_index from '../../texts/text_fases_index.json'

import estilos from './estilos';

import { fases_imagens } from '../../utils/fases_imagens'; 
import { useState } from 'react';
import { SafeAreaView, TouchableOpacity } from 'react-native';
import GameOptions from '../../models/GameOptions';
import { DificuldadeEnum } from '../../enums/dificuldade.enum';
import { TemasEnum } from '../../enums/temas.enum';
import { GlobalContext } from '../../contexts/GlobalContext';
import { auth } from '../../config/firebase';
import { buscarPartidasPorJogadorId } from '../../services/firestore_partida';

import trophy0 from '../../../assets/trophy0.png';
import trophy1 from '../../../assets/trophy1.png';
import trophy2 from '../../../assets/trophy2.png';
import trophy3 from '../../../assets/trophy3.png';

import loading from "../../../assets/loading.gif"

export default function Fases({ navigation }){

    const [showModal, setShowModal] = useState(false);
    const [dificuldade, setDificuldade] = useState("");
    const [tema, setTema] = useState("");
    const [partidas, setPartidas] = useState([]);
    const [temaTrofeu, setTemaTrofeu] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const useEffectLoadingRef = useRef(true);

    const { definirPartidasUsuarioJogador, buscarPartidasUsuarioJogador } = useContext(GlobalContext);

    function abrirModal(tema: TemasEnum){
        setShowModal(true);
        setTema(tema);
    
    }

    function iniciarJogo(dificuldade: string){
        setDificuldade(dificuldade);

        let gameOptions = new GameOptions(dificuldade, tema)

        navigation.navigate("Jogo", {gameOptions})
    }

    useEffect(() => {
        const fetchData = async () => {
            const partidasJogador = buscarPartidasUsuarioJogador() ?? [];
            console.log(partidasJogador);

            let partidasLocal = [];
    
            if (partidasJogador.length === 0){
                // Use async/await to wait for the promise to resolve
                const resultado = await buscarPartidasPorJogadorId(auth.currentUser.uid, setPartidas);
                partidasLocal = resultado;
                await definirPartidasUsuarioJogador(partidasLocal);
            } else {
                setPartidas(partidasJogador);
                partidasLocal = partidasJogador;
            }
    
            const valoresDificuldades = {
                "Fácil": 0,
                "Médio": 1,
                "Difícil": 2,
            };
    
            const trophies = [trophy1, trophy2, trophy3];
    
            const trofeusPorTema = [];
    
            for(const tema in TemasEnum){
                const partidasTema = partidasLocal.filter(p => p.Tema === tema && p.Vitoria === true);

                const obj = {
                    Tema: tema,
                    Trofeu: trophies[Math.max(...partidasTema.map((partida) => valoresDificuldades[partida.Dificuldade]))]
                };
    
                trofeusPorTema.push(obj);
            }
            setTemaTrofeu(trofeusPorTema);
    
            setCarregando(false);
        };

        fetchData();
    }, [])
    
    if (temaTrofeu.length === 0){
        return (
          <Box style={estilos.containerAnimacao}>
            {console.log(temaTrofeu)}
            <Image alt='Carregando' style={estilos.imagem} source={loading}></Image>
          </Box>
        )
    }

    return <Box style={estilos.background}>
    <Text style={estilos.titulo}>{text_fases_index.Titulo}</Text>
    
    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content style={estilos.modal} maxWidth="320px" maxHeight="154px">
        <Modal.Body>
            <Box style={{marginTop: 37, marginLeft: 17.5, display: 'flex', flexDirection: 'row', alignItems: "center", justifyContent: "center"}}>
                <TouchableOpacity style={estilos.botao} onPress={() => iniciarJogo(DificuldadeEnum.Facil)}><Text style={estilos.texto_botao}>{text_fases_index.Facil}</Text></TouchableOpacity>
                <TouchableOpacity style={estilos.botao} onPress={() => iniciarJogo(DificuldadeEnum.Medio)}><Text style={estilos.texto_botao}>{text_fases_index.Medio}</Text></TouchableOpacity>
                <TouchableOpacity style={estilos.botao} onPress={() => iniciarJogo(DificuldadeEnum.Dificil)}><Text style={estilos.texto_botao}>{text_fases_index.Dificil}</Text></TouchableOpacity>
            </Box>
        </Modal.Body>
        </Modal.Content>
    </Modal>

    <SafeAreaView>
        <FlatList 
            extraData={temaTrofeu}
            data={fases_imagens}
            keyExtractor={item => item.Id}
            renderItem={({item}) => {
                return <TouchableOpacity style={{position: 'relative'}} onPress={() => abrirModal(item.Tema)}>
                    {temaTrofeu.find(t => t.Tema === item.Tema)?.Trofeu !== undefined ? <Image style={estilos.trofeu} alt="trofeu" source={temaTrofeu.find(t => t.Tema === item.Tema).Trofeu}></Image>: <Image alt="semTrofeu" style={estilos.trofeu} source={trophy0}></Image>}
                    <Image alt={item.Tema} style={estilos.imagens} source={item.Imagem} resizeMode='contain'></Image>
                </TouchableOpacity>
            }}

            >

        </FlatList>
    </SafeAreaView>

</Box>

}
