import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View, Image, Modal } from 'react-native';

import { useState } from "react";

import ESTILOS from '../styles/ESTILOS';
import {CriarLista} from '../components/CriarLista';

import { Ionicons } from '@expo/vector-icons';


export function Home() {
  const navigation = useNavigation();

  const [ativoModalCriarLista, setModalCriarLista] = useState(false);
  const [ativoModalBackground, setModalBackground] = useState(false)

  const abrirModalCriarLista = () => {
    setModalBackground(true);
    setModalCriarLista(true);
  };

  const fecharModalCriarLista = () => {
    setModalCriarLista(false);
    setModalBackground(false);
  };

  return (
    <View style={ESTILOS.container}>
      <Image></Image>

      <TouchableOpacity style={ESTILOS.btnDestaque} onPress={abrirModalCriarLista}>
        <Text style={ESTILOS.txtBranco}>Adicionar Nova Lista</Text>
        <Ionicons style={ESTILOS.btnDestaqueIcon} name="add-circle-outline" color="white" size={20}></Ionicons>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={ativoModalCriarLista}
        style={ESTILOS.modal}
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
