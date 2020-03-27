import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'

const appStack = createStackNavigator()

import Detail from './pages/Detail';
import Incidents from './pages/Incidents';


export default function Routes() {
  return (
    <NavigationContainer>
          {/* Header shown tira o cabeçalho padrão */}
      <appStack.Navigator screenOptions={{headerShown: false}}> 
        <appStack.Screen name="Incidents" component={Incidents} /> 
        <appStack.Screen name="Detail" component={Detail} /> 
      </appStack.Navigator>

    </NavigationContainer>
  );
}
