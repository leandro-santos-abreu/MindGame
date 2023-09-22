import { Box, FlatList, Flex, Image, Text, Modal } from "native-base"
import React, { useEffect, useState } from "react"
import { Alert, ImageBackground, TouchableOpacity } from "react-native"
import GameOptions from "../../models/GameOptions"
import { fases_imagens } from "../../utils/fases_imagens"
import text_jogo_index from '../../texts/text_jogo_index.json'

import estilos from "./estilos"
import { TemasEnum } from "../../enums/temas.enum"
import loading from "../../../assets/loading.gif"
import { difficulty_settings } from "../../utils/difficulty_settings"

import victorySound from "../../../android/app/src/main/res/raw/victory.wav"
import missSound from "../../../android/app/src/main/res/raw/wrong.wav"

var Sound = require('react-native-sound');

export default function Jogo({navigation, route}){
    const [globalGameOptions, setGlobalGameOptions] = useState({Dificuldade: undefined, Tema: undefined});
    const [globalDadosFase, setGlobalDadosFase] = useState({Id: 0, Icone: undefined, Tema: "", Jogo: "", Imagem: undefined, Background: undefined, IconesSelecionaveis: []})
    const [useEffectCompleted, setUseEffectCompleted] = useState(false);
    const [difficultySettings, setDifficultySettings] = useState({QuantidadeImagens: undefined, Tempo: undefined});
    const [imagens, setImagens] = useState([]);
    const [objective, setObjective] = useState({Imagem: undefined, Animal: undefined});
    const [tempo, setTempo] = useState(0);
    const [showModal, setShowModal] = useState(true);
    const [fimJogo, setFimJogo] = useState(false);
    const [vitoria, setVitoria] = useState(false);
    const [somVitoria, setSomVitoria] = useState();
    const [somErro, setSomErro] = useState();

    const carregarDados = () => {
      Sound.setCategory("Playback");
      local_somErro = new Sound(missSound, Sound.MAIN_BUNDLE);
      local_somErro.setVolume(1);
      local_somErro.release(1);

      local_somVitoria = new Sound(victorySound, Sound.MAIN_BUNDLE);
      local_somVitoria.setVolume(1);
      local_somVitoria.release(1);

      setSomErro(local_somErro);
      setSomVitoria(local_somVitoria);


      const gameOptions = new GameOptions(route.params.gameOptions.Dificuldade, route.params.gameOptions.Tema);
      console.log(gameOptions);
      setGlobalGameOptions({...gameOptions});
      console.log(globalGameOptions);

      const dadosFase = fases_imagens.find(f => f.Tema == globalGameOptions.Tema);
      console.log(dadosFase);
  
      setGlobalDadosFase({...dadosFase});
      console.log(globalDadosFase);

      const settings = difficulty_settings.find(f => f.Dificuldade == gameOptions.Dificuldade)
      setDifficultySettings({...settings})
      console.log(settings); 

      let imagensFase = [];
      let escolha;
      for(let i = 1; i < difficultySettings.QuantidadeImagens; i ++){
        let index = Math.floor(Math.random() * (dadosFase.IconesSelecionaveis.length));

        if (imagensFase.length === 0){
          escolha = dadosFase.IconesSelecionaveis[index];
          setObjective(escolha);
          dadosFase.IconesSelecionaveis = dadosFase.IconesSelecionaveis.filter(item => {
            return item !== escolha;
          });
        }

        imagensFase.push(dadosFase.IconesSelecionaveis[index]);
      }

      imagensFase.push(escolha); //Setando Imagem Escolhida.

      setImagens(imagensFase);
      setTempo(difficultySettings.Tempo);

      setUseEffectCompleted(true)
    }

    useEffect(() => {
        carregarDados();
        console.log(useEffectCompleted)
    }, [useEffectCompleted])

    useEffect(() => {
      if (!showModal && !fimJogo){
        tempo > 0 && setTimeout(() => setTempo(tempo - 1), 1000);
        if (tempo == 0){
          setFimJogo(true)
        }
      }
    }, [showModal, tempo])
    
    
    

    if (globalDadosFase.Background == undefined){
        return (
          <Box style={estilos.containerAnimacao}>
            <Image alt='Carregando' style={estilos.imagem} source={loading}></Image>
          </Box>
        )
      }

    return <Box style={{flex: 1}}>
        <ImageBackground style={estilos.background} source={globalDadosFase.Background}> 

            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <Modal.Content style={estilos.modal} maxWidth="300px" maxHeight="70px">
                      <TouchableOpacity style={{alignItems: "center", justifyContent: "center"}} onPress={() => setShowModal(false)}>
                        <Modal.Body>
                          <Text style={{fontSize:30, marginTop: 5, lineHeight: 30, fontWeight: "bold"}}>{text_jogo_index.Comecar}</Text>
                        </Modal.Body>
                      </TouchableOpacity>                    
                </Modal.Content>
            </Modal>

            <Modal isOpen={fimJogo} onClose={() => navigation.replace("Fases")}>
                <Modal.Content style={estilos.modal} maxWidth="300px" maxHeight="70px">
                        <Modal.Body>
                          {vitoria ? <Text>{text_jogo_index.Vitoria}</Text> : <Text>{text_jogo_index.Derrota}</Text>}
                        </Modal.Body>
                </Modal.Content>
            </Modal>

            <Box style={estilos.timer}>
              <Text>{tempo}</Text>
            </Box>

            <Box style={estilos.floresta}>
              <Image alt={objective.Animal} style={{width: 100, height: 100}} source={objective.Imagem}></Image>
            </Box>
            <FlatList 
                  style={{marginTop: 35}}
                  initialNumToRender={difficultySettings.QuantidadeImagens-1}
                  numColumns = {5}
                  data={imagens}
                  renderItem={({item}) => {
                    return (
                      <Box style={{flexDirection: 'row', alignItems: "center", justifyContent: "center", margin: 5}}>
                        <TouchableOpacity onPress={() => ValidaClique(item)}>
                          <Image alt={item.Animal} style={estilos.icones} source={item.Imagem}></Image>
                        </TouchableOpacity>
                      </Box>
                  )}}
                  keyExtractor={(item, index) => index.toString()}
              />
        </ImageBackground>
    </Box>
    
    function ValidaClique(item){
      if (item.Animal === objective.Animal){
        console.log("Vitoria");
        setVitoria(true);
        setFimJogo(true);
        somVitoria.play();
        return;
      }

      somErro.play();

    }
}