import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View, Image, Modal } from 'react-native';

import { useState } from "react";

import ESTILOS from '../styles/ESTILOS';
import {NovoProduto} from '../components/NovoProduto';

import { Ionicons } from '@expo/vector-icons';

export function Produtos() {
  const navigation = useNavigation();

  const [ativoModalNovoProduto, setModalNovoProduto] = useState(false);

  const abrirModalNovoProduto = () => {
    setModalNovoProduto(true);
  };

  const fecharModalNovoProduto = () => {
    setModalNovoProduto(false);
  };

  return (
    <View style={ESTILOS.container}>
      <Image></Image>

      <TouchableOpacity style={ESTILOS.btnDestaque} onPress={abrirModalNovoProduto}>
        <Text style={ESTILOS.txtBranco}>Adicionar Novo Produto</Text>
        <Ionicons style={ESTILOS.btnDestaqueIcon} name="add-circle-outline" color="white" size={20}></Ionicons>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={ativoModalNovoProduto}
        style={ESTILOS.modal}
      >
        <NovoProduto fecharModalNovoProduto={() => setModalNovoProduto(false)} />
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
