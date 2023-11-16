import { Box, FlatList, Flex, Image, Text, Modal } from "native-base"
import React, { useEffect, useRef, useState } from "react"
import { Alert, Dimensions, ImageBackground, TouchableOpacity } from "react-native"
import GameOptions from "../../models/GameOptions"
import { fases_imagens } from "../../utils/fases_imagens"
import text_jogo_index from '../../texts/text_jogo_index.json'

import estilos from "./estilos"
import { TemasEnum } from "../../enums/temas.enum"
import loading from "../../../assets/loading.gif"
import { difficulty_settings } from "../../utils/difficulty_settings"

import victorySound from "../../../android/app/src/main/res/raw/victory.wav"
import missSound from "../../../android/app/src/main/res/raw/wrong.wav"
import GameData from "../../models/GameData"
import { auth } from "../../config/firebase"
import { salvarPartida } from "../../services/firestore_partida"
import { CommonActions } from "@react-navigation/native"
import { deepCopy } from "../../utils/comum"

var Sound = require('react-native-sound');

export default function Jogo({navigation, route}){
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;

    const [globalGameOptions, setGlobalGameOptions] = useState({Dificuldade: undefined, Tema: undefined});
    const [globalDadosFase, setGlobalDadosFase] = useState({Id: 0, Icone: undefined, Tema: "", Jogo: "", Imagem: undefined, Background: undefined, IconesSelecionaveis: []})
    const [difficultySettings, setDifficultySettings] = useState({QuantidadeImagens: undefined, Tempo: undefined});
    const [tempo, setTempo] = useState(-1);
    const [showModal, setShowModal] = useState(true);
    const [fimJogo, setFimJogo] = useState(false);
    const [vitoria, setVitoria] = useState(false);
    const [somVitoria, setSomVitoria] = useState();
    const [somErro, setSomErro] = useState();
    const [quantidadeCliques, setQuantidadeCliques] = useState(0);
    const [tempoPrimeiroClique, setTempoPrimeiroClique] = useState(0);
    const [gameData, setGameData] = useState(new GameData(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, false));

    const useEffectCompleted = useRef(false);
    const imagensRef = useRef([]);
    const objectiveRef = useRef({ Imagem: undefined, Animal: undefined });

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

      const dadosFase = fases_imagens.find(f => f.Tema == gameOptions.Tema);
      console.log(dadosFase);
  
      setGlobalDadosFase({...dadosFase});
      console.log(globalDadosFase);

      const settings = difficulty_settings.find(f => f.Dificuldade == gameOptions.Dificuldade)
      setDifficultySettings({...settings})
      console.log(settings); 

      let imagensFase = [];

      const maxCopies = 3;

      const availableItems = dadosFase.IconesSelecionaveis.map(item => ({
        item,
        copies: maxCopies
      }));


      let index = Math.floor(Math.random() * (dadosFase.IconesSelecionaveis.length));
      const escolha = dadosFase.IconesSelecionaveis[index];

      availableItems.find(f => f.item === escolha).copies = 0;

      while (availableItems.some(({ copies }) => copies > 0)) {
        for (const { item, copies } of availableItems) {
          if (copies > 0) {
            imagensFase.push(item);
            availableItems.find((i) => i.item === item).copies--;
          }
        }
      }

      imagensFase = shuffle(imagensFase);
      imagensFase = imagensFase.slice(0, settings.QuantidadeImagens-1);
      imagensFase.push(escolha);

      const imagensEmbaralhadas = shuffle(imagensFase);
      imagensRef.current = imagensEmbaralhadas;
      objectiveRef.current = escolha;
      
      setTempo(settings.Tempo);

      useEffectCompleted.current = true;
    }

    shuffle = (array) => {
      let i = array.length - 1;
      for (; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      return array;
    };
    

    async function CadastrarPartida(jogo: GameData){
      const retorno = await salvarPartida(jogo)
  
      if (retorno == "ok"){
          console.log("Partida Cadastrada com Sucesso!")
      }else{
          console.log("Erro ao Cadastrar Partida!")
      }
    }

    const Voltar = () =>{

      const summary = new GameData(globalGameOptions.Dificuldade, 
        globalDadosFase.Jogo, 
        globalGameOptions.Tema, 
        difficultySettings.Tempo - tempo, 
        quantidadeCliques, 
        auth.currentUser.uid, 
        difficultySettings.Tempo - tempoPrimeiroClique, 
        new Date().toLocaleString('pt-BR'),
        false);

      CadastrarPartida(summary);

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        })
      );
    }

    useEffect(() => {
        carregarDados();
    }, [])

    useEffect(() => {
      if (!showModal && !fimJogo){
        tempo > 0 && setTimeout(() => setTempo(tempo - 1), 1000);
        if (tempo == 0){
          setFimJogo(true)
        }
      }
      console.log(showModal);
      console.log(tempo);
    }, [showModal, tempo])
    
    
    

    if (!useEffectCompleted.current){
        return (
          <Box style={estilos.containerAnimacao}>
            <Image alt='Carregando' style={estilos.imagem} source={loading}></Image>
          </Box>
        )
    }

    return <Box style={{flex: 1}}>
        <ImageBackground style={estilos.background} source={globalDadosFase.Background}> 

            <Modal isOpen={showModal} onClose={() => {setShowModal(false)}}>
            <Modal.Content style={[estilos.modal, { backgroundColor: estilos[globalGameOptions.Tema]?.backgroundColor }]} maxWidth="300px" maxHeight="70px">
                      <TouchableOpacity style={{alignItems: "center", justifyContent: "center"}} onPress={() => setShowModal(false)}>
                        <Modal.Body>
                          <Text style={{fontSize:30, marginTop: 5, lineHeight: 30, fontWeight: "bold"}}>{text_jogo_index.Comecar}</Text>
                        </Modal.Body>
                      </TouchableOpacity>                    
                </Modal.Content>
            </Modal>

            <Modal isOpen={fimJogo} onClose={() => Voltar()}>
                <Modal.Content style={[estilos.modal, { backgroundColor: estilos[globalGameOptions.Tema]?.backgroundColor }]} maxWidth="300px" maxHeight="70px">
                        <Modal.Body>
                          {vitoria ? <Text>{text_jogo_index.Vitoria}</Text> : <Text>{text_jogo_index.Derrota}</Text>}
                        </Modal.Body>
                </Modal.Content>
            </Modal>

            <Box style={estilos.timer}>
              <Text>{tempo}</Text>
            </Box>

            <Box style={estilos[globalGameOptions.Tema]}>
              <Image alt={objectiveRef.current.Animal} style={{width: 100, height: 100}} source={objectiveRef.current.Imagem}></Image>
            </Box>
            <Box style={{height: height-220}}>
              <FlatList 
                    style={{marginTop: 35}}
                    initialNumToRender={difficultySettings.QuantidadeImagens}
                    numColumns = {5}
                    data={imagensRef.current}
                    maxHeight={360}
                    persistentScrollbar={true}
                    renderItem={({item}) => {
                      return (
                        <Box style={{flexDirection: 'row', alignItems: "center", justifyContent: "center", margin: 5}}>
                          <TouchableOpacity onPress={() => ValidaClique(item)}>
                            <Image alt={item?.Animal} style={estilos.icones} source={item?.Imagem}></Image>
                          </TouchableOpacity>
                        </Box>
                    )}}
                    keyExtractor={(item, index) => index.toString()}
                />

            </Box>
        </ImageBackground>
    </Box>
    
    function ValidaClique(item){
      setQuantidadeCliques(quantidadeCliques + 1)
      let localTempoPrimeiroClique = 0;

      if (quantidadeCliques === 0){
        localTempoPrimeiroClique = tempo;
        setTempoPrimeiroClique(tempo)
      }

      console.log(item.Animal);
      console.log(objectiveRef.current.Animal);
      if (item.Animal === objectiveRef.current.Animal){
        console.log("Vitoria");
        setVitoria(true);
        setFimJogo(true);
        somVitoria.play();

        const summary = new GameData(globalGameOptions.Dificuldade, 
                                     globalDadosFase.Jogo, 
                                     globalGameOptions.Tema, 
                                     difficultySettings.Tempo - tempo, 
                                     quantidadeCliques + 1, 
                                     auth.currentUser.uid, 
                                     difficultySettings.Tempo - (quantidadeCliques === 0 ? localTempoPrimeiroClique: tempoPrimeiroClique), 
                                     new Date().toLocaleString('pt-BR'),
                                     true);
        setGameData(summary);
        CadastrarPartida(summary);

        return;
      }

      somErro.play();
      
    }
}