import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View, Image, Modal, FlatList } from 'react-native';

import { useState } from "react";

import ArmazenamentoListas from '../hooks/bancoLista';

import ESTILOS from '../styles/ESTILOS';
import {CriarLista} from '../components/CriarLista';

import { Ionicons } from '@expo/vector-icons';


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
      <Image></Image>



      <TouchableOpacity style={ESTILOS.btnDestaque} onPress={abrirModalCriarLista}>
        <Text style={ESTILOS.txtBranco}>Adicionar Nova Lista</Text>
        <Ionicons style={ESTILOS.btnDestaqueIcon} name="add-circle-outline" color="white" size={20}></Ionicons>
      </TouchableOpacity>

      {/* <FlatList
        data={lista}
        renderItem={({ item }) => <Text>{item}</Text>}
        keyExtractor={(item, index) => index.toString()}
      /> */}
      
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
