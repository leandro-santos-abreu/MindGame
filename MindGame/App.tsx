import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { NativeBaseProvider } from 'native-base';
import { GestureHandlerRootView  } from 'react-native-gesture-handler';

import Home from './src/screens/Home';
import Login from './src/screens/Login';
import Cadastrar from './src/screens/Cadastro';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
        <NativeBaseProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='Login'>
              <Stack.Screen name="Login" component={(Login)} />
              <Stack.Screen name="Home" component={(Home)} />
              <Stack.Screen name="Cadastrar" component={(Cadastrar)} />
            </Stack.Navigator>
          </GestureHandlerRootView>
        </NativeBaseProvider>
      </NavigationContainer>
  );
};

export default App;
