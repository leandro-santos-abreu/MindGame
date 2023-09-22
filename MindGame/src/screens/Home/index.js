import * as React from 'react';
import { useState, useContext, useEffect } from 'react';
import { Box, Image, Text, Icon, Modal } from 'native-base';
import { Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { auth } from '../../config/firebase';
import { PaginationItem, colors } from '../../components/PaginationItem';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import estilos from './estilos';
import { Dados } from './jogos';

import Logo from '../../../assets/logo.png';

import text_home_index from '../../texts/text_home_index.json'

import { useSharedValue } from 'react-native-reanimated';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GameModal } from '../../components/GameModal';

import { GlobalContext } from '../../contexts/GlobalContext';
import { TipoUsuarioEnum } from '../../enums/tipoUsuario.enum';

export default function Home({ navigation }) {

    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;
    const progressValue = useSharedValue(0);

    const [showModal, setShowModal] = useState(false);
    const [tipoUsuario, setTipoUsuario] = useState("");
    const { buscarTipoUsuario } = useContext(GlobalContext);

    useEffect(() => {
        setTipoUsuario(buscarTipoUsuario());
    }, [])

    function logout() {
        auth.signOut();
        navigation.replace("Login");
    }

    return <Box style={{ flex: 1, backgroundColor: "#F5DEA8", fontFamily: "Inter-Regular" }}>

        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
            <Modal.Content style={estilos.modal} maxWidth="320px" maxHeight="300px">
                <Modal.Body>

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
