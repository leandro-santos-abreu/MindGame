import * as React from 'react';
import { Box, Image, Text } from 'native-base';
import { Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { auth } from '../../config/firebase';
import { PaginationItem } from '../../components/PaginationItem';

import estilos from './estilos';

import CacaFigura from '../../../assets/hunt.png';
import QuebraCabeca from '../../../assets/puzzle.png'
import Logo from '../../../assets/logo.png';

import text_home_index from '../../texts/text_home_index.json'
import { useSharedValue } from 'react-native-reanimated';

export default function Home({ navigation }) {

  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  const progressValue = useSharedValue(0);

  const dados = [
    {
        jogo: "Caça Figuras",
        imagem: CacaFigura
    },
    {
        jogo: "Quebra Cabeças",
        imagem: QuebraCabeca
    }
  ];

  const colors = [
    "#397DC9",
    "#397DC9"
  ];

  return  <Box style={{ flex: 1, backgroundColor: "#F5DEA8", fontFamily: "Inter-Regular" }}>
    <Box style={estilos.header}>
        <Image style={estilos.icone} source={Logo}></Image>
        <Box style={estilos.headerTextColumn}>
            <Text style={[estilos.headerText, {fontSize: 12}]}>{text_home_index.Bem_Vindo}</Text>
            <Text style={[estilos.headerText, {fontSize: 15}]}>{auth.currentUser.email}</Text>
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
                    parallaxScrollingScale: 0.9,
                    parallaxScrollingOffset: 50,
                    }}
                    onProgressChange={(_, absoluteProgress) =>
                        (progressValue.value = absoluteProgress)
                    }
                    autoPlay={false}
                    data={dados}
                    scrollAnimationDuration={1000}
                    onSnapToItem={(index) => console.log('current index:', index)}
                    renderItem={({ item }) => (
                        <Box style={{verticalAlign: "middle", alignItems: 'center'}}>
                            <Image style={[{height: height * 0.65, width: width}, estilos.imagem]}source={item.imagem}></Image>
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
