import React, { useEffect } from 'react';
import { Center, Text, Image, Box, ScrollView, Modal, FormControl, Input, Button, FlatList } from 'native-base';

import text_fases_index from '../../texts/text_fases_index.json'

import estilos from './estilos';

import { fases_imagens } from '../../utils/fases_imagens'; 
import { useState } from 'react';
import { SafeAreaView, TouchableOpacity } from 'react-native';
import GameOptions from '../../models/GameOptions';
import { DificuldadeEnum } from '../../enums/dificuldade.enum';
import { TemasEnum } from '../../enums/temas.enum';

export default function Fases({ navigation }){

    const [showModal, setShowModal] = useState(false);
    const [dificuldade, setDificuldade] = useState("");
    const [tema, setTema] = useState("");

    function abrirModal(tema: TemasEnum){
        setShowModal(true);
        setTema(tema);
    
    }

    function iniciarJogo(dificuldade: string){
        setDificuldade(dificuldade);

        let gameOptions = new GameOptions(dificuldade, tema)

        navigation.navigate("Jogo", {gameOptions})
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
                    data={fases_imagens}
                    keyExtractor={item => item.Id}
                    renderItem={({item}) => {
                        return <TouchableOpacity onPress={() => abrirModal(item.Tema)}>
                            <Image alt={item.Tema} style={estilos.imagens} source={item.Imagem}></Image>
                        </TouchableOpacity>
                    }}>

                </FlatList>
            </SafeAreaView>

        </Box>

}
