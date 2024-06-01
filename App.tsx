import React, { useState, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import verificarProdutosPadrao from './hooks/bancoProduto';
import Routes from './routes';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync(); //Mantem a tela SplashScreen

export default function App() {

  useEffect(() => {
    async function prepare() {
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        await SplashScreen.hideAsync();
      } catch (erro) {
        console.error(erro);
      }
    }
    prepare();
  }, []);

  useEffect(() => {
    verificarProdutosPadrao();
  }, []);
  return (

    <NavigationContainer>
      <StatusBar />
      <Routes />
    </NavigationContainer>


  )
}