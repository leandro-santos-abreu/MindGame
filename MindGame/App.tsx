import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { NativeBaseProvider } from 'native-base';
import { GestureHandlerRootView  } from 'react-native-gesture-handler';
import { UserInfoProvider } from './src/contexts/GlobalContext';

import Home from './src/screens/Home';
import Login from './src/screens/Login';
import Cadastrar from './src/screens/Cadastro';
import Fases from './src/screens/Fases';
import Jogo from './src/screens/Jogo';
import ListaPaciente from './src/screens/ListaPaciente';
import CadastrarPaciente from './src/screens/CadastrarPaciente';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
      <NavigationContainer>
        <UserInfoProvider>
          <NativeBaseProvider>
              <GestureHandlerRootView style={{ flex: 1 }}>
                <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='Login'>
                  <Stack.Screen name="Login" component={(Login)} />
                  <Stack.Screen name="Home" component={(Home)} />
                  <Stack.Screen name="Cadastrar" component={(Cadastrar)} />
                  <Stack.Screen name="Fases" component={(Fases)} />
                  <Stack.Screen name="Jogo" component={(Jogo)} />
                  <Stack.Screen name="ListaPaciente" component={(ListaPaciente)} />
                  <Stack.Screen name="CadastrarPaciente" component={(CadastrarPaciente)} />
                </Stack.Navigator>
              </GestureHandlerRootView>
          </NativeBaseProvider>
        </UserInfoProvider>
      </NavigationContainer>
  );
};

export default App;
