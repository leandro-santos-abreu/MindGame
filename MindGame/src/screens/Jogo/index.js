import { Box, FlatList, Flex, Image, Text } from "native-base"
import React, { useEffect, useState } from "react"
import { ImageBackground, TouchableOpacity } from "react-native"
import GameOptions from "../../models/GameOptions"
import { fases_imagens } from "../../utils/fases_imagens"

import estilos from "./estilos"
import { TemasEnum } from "../../enums/temas.enum"
import loading from "../../../assets/loading.gif"
import { difficulty_settings } from "../../utils/difficulty_settings"

export default function Jogo({navigation, route}){
    const [globalGameOptions, setGlobalGameOptions] = useState({Dificuldade: undefined, Tema: undefined});
    const [globalDadosFase, setGlobalDadosFase] = useState({Id: 0, Icone: undefined, Tema: "", Jogo: "", Imagem: undefined, Background: undefined, IconesSelecionaveis: []})
    const [useEffectCompleted, setUseEffectCompleted] = useState(false);
    const [difficultySettings, setDifficultySettings] = useState({QuantidadeImagens: undefined, Tempo: undefined});
    const [imagens, setImagens] = useState([]);
    const [objective, setObjective] = useState({Imagem: undefined, Animal: undefined});
    const [tempo, setTempo] = useState(0);

    const carregarDados = () => {
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
    }, [useEffectCompleted])

    

    if (globalDadosFase.Background == undefined){
        return (
          <Box style={estilos.containerAnimacao}>
            <Image alt='Carregando' style={estilos.imagem} source={loading}></Image>
          </Box>
        )
      }

    return <Box style={{flex: 1}}>
        <ImageBackground style={estilos.background} source={globalDadosFase.Background}> 
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
                  console.log(item);
                  return (
                    <Box style={{flexDirection: 'row', alignItems: "center", justifyContent: "center", margin: 5}}>
                      <TouchableOpacity>
                        <Image alt={item.Animal} style={estilos.icones} source={item.Imagem}></Image>
                      </TouchableOpacity>
                    </Box>
                )}}
                keyExtractor={(item, index) => index.toString()}
            />
        </ImageBackground>
    </Box>
    
}