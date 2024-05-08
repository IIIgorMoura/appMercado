import React from 'react';
import {StatusBar} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './routes';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  return (
    
    <NavigationContainer>
      <StatusBar/>
      <Routes />
    </NavigationContainer>
  )
}