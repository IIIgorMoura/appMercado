import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View, Image, Modal } from 'react-native';

import { useState } from "react";

import ESTILOS from '../styles/ESTILOS';
import {CriarLista} from '../components/CriarLista';



export function Home() {
  const navigation = useNavigation();

  const [ativoModalCriarLista, setModalCriarLista] = useState(false);

  const abrirModalCriarLista = () => {
    setModalCriarLista(true);
  };

  const fecharModalCriarLista = () => {
    setModalCriarLista(false);
  };

  return (
    <View style={ESTILOS.container}>

      <TouchableOpacity style={ESTILOS.btnDestaque} onPress={abrirModalCriarLista}>
        <Text style={ESTILOS.txtBranco}>Adicionar Nova Lista</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={ativoModalCriarLista}
        
      >
        <CriarLista fecharModalCriarLista={() => setModalCriarLista(false)}/>
      </Modal>


      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
