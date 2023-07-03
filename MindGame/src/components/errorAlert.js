import React from "react";
import { Alert, IconButton, HStack, VStack, CloseIcon, Text, Center } from "native-base";

export function errorAlert(message){
    return (
            <Center flex={1} px="3">
                <Alert w="100%" status="error">
                    <VStack space={2} flexShrink={1} w="100%">
                    <HStack flexShrink={1} space={2} justifyContent="space-between">
                        <HStack space={2} flexShrink={1}>
                        <Alert.Icon mt="1" />
                        <Text fontSize="md" color="coolGray.800">
                            {message}
                        </Text>
                        </HStack>
                        <IconButton variant="unstyled" _focus={{
                    borderWidth: 0
                    }} icon={<CloseIcon size="3" />} _icon={{
                    color: "coolGray.600"
                    }} />
                    </HStack>
                    </VStack>
                </Alert>
            </Center>
    )
}