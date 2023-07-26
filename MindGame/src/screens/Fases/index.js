import React, { useEffect } from 'react';
import { Center, Text, Image, Box, ScrollView, Modal, FormControl, Input, Button, FlatList } from 'native-base';

import text_fases_index from '../../texts/text_fases_index.json'

import estilos from './estilos';

import { fases_imagens } from './fases_imagens'; 
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useState } from 'react';
import { SafeAreaView } from 'react-native';


export default function Fases({ navigation }){

    const [showModal, setShowModal] = useState(false);

    return <Box style={estilos.background}>
            <Text style={estilos.titulo}>{text_fases_index.Titulo}</Text>
            
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <Modal.Content maxWidth="400px">
                <Modal.CloseButton />
                <Modal.Header>Contact Us</Modal.Header>
                <Modal.Body>
                    <FormControl>
                    <FormControl.Label>Name</FormControl.Label>
                    <Input />
                    </FormControl>
                    <FormControl mt="3">
                    <FormControl.Label>Email</FormControl.Label>
                    <Input />
                    </FormControl>
                </Modal.Body>
                <Modal.Footer>
                    <Button.Group space={2}>
                    <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                    setShowModal(false);
                    }}>
                        Cancel
                    </Button>
                    <Button onPress={() => {
                    setShowModal(false);
                    }}>
                        Save
                    </Button>
                    </Button.Group>
                </Modal.Footer>
                </Modal.Content>
            </Modal>

            <SafeAreaView>
                <FlatList 
                    data={fases_imagens}
                    keyExtractor={item => item.Id}
                    renderItem={({item}) => {
                        return <TouchableOpacity onPress={() => setShowModal(true)}>
                            <Image style={estilos.imagens} source={item.Imagem}></Image>
                        </TouchableOpacity>
                    }}>

                </FlatList>
            </SafeAreaView>

        </Box>

}
