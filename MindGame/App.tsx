import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { NativeBaseProvider } from 'native-base';
import {SSRProvider} from '@react-aria/ssr'; 
import { AutenticationProvider } from './src/contexts/AutenticationContext';

import Home from './src/screens/Home';
import Login from './src/screens/Login';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <AutenticationProvider>
      <SSRProvider>
        <NativeBaseProvider>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='Login'>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Home" component={Home} />
            </Stack.Navigator>
          </NavigationContainer>
        </NativeBaseProvider>
      </SSRProvider>
    </AutenticationProvider>
  );
};

export default App;
