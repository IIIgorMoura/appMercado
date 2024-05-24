import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import verificarProdutosPadrao from './hooks/bancoProduto';
import Routes from './routes';

export default function App() {
  useEffect(() => {
    verificarProdutosPadrao();
  }, []);
  return (
    
    <NavigationContainer>
      <StatusBar/>
      <Routes />
    </NavigationContainer>


  )
}