import React, { useState }  from "react"
import { Center, Modal, Image, Box, Text, Button } from "native-base"
import { buscarImagensPorJogo } from "../screens/Fases/fases_imagens";

export const GameModal = (jogo: string, showModal, setShowModal) => {
    const imagens = buscarImagensPorJogo(jogo);
    setShowModal(true);
    return <Center>
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
            <Modal.Content maxWidth="350" maxH="212">
                <Modal.CloseButton />
                <Modal.Body>
                    {imagens.map((item) => {
                        return 
                        <Box>
                            {item.Icone}
                        </Box>
                    })}
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
    </Center>
}