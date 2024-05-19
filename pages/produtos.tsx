import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View, Image, Modal, ScrollView } from 'react-native';

import { useState } from "react";

import ESTILOS from '../styles/ESTILOS';
import { NovoProduto } from '../components/NovoProduto';

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
      <Text>Categorias de Produtos</Text>

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

{/* Lista categorias */}
      <ScrollView 
        style={ESTILOS.listaElementos}
        showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styleProdutos.categoriaProdutos}>
          <Image style={styleProdutos.imgProdutos} source={require('../assets/images/categoriasProdutos/produtosVegetais.png')}></Image>
            <Text style={styleProdutos.txtCategoriaProdutos}>Vegetais</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styleProdutos.categoriaProdutos}>
          <Image style={styleProdutos.imgProdutos} source={require('../assets/images/categoriasProdutos/produtosCarnes.png')}></Image>
            <Text style={styleProdutos.txtCategoriaProdutos}>Carnes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styleProdutos.categoriaProdutos}>
          <Image style={styleProdutos.imgProdutos} source={require('../assets/images/categoriasProdutos/produtosPadaria.png')}></Image>
            <Text style={styleProdutos.txtCategoriaProdutos}>Padaria</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styleProdutos.categoriaProdutos}>
          <Image style={styleProdutos.imgProdutos} source={require('../assets/images/categoriasProdutos/produtosFrutas.png')}></Image>
            <Text style={styleProdutos.txtCategoriaProdutos}>Frutas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styleProdutos.categoriaProdutos}>
          <Image style={styleProdutos.imgProdutos} source={require('../assets/images/categoriasProdutos/produtosLimpeza.png')}></Image>
            <Text style={styleProdutos.txtCategoriaProdutos}>Limpeza</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styleProdutos.categoriaProdutos}>
          <Image style={styleProdutos.imgProdutos} source={require('../assets/images/categoriasProdutos/produtosOutros.png')}></Image>
            <Text style={styleProdutos.txtCategoriaProdutos}>Outros</Text>
        </TouchableOpacity>
      </ScrollView>

      <StatusBar style="light" />
    </View>
  );
}

const styleProdutos = StyleSheet.create({
  categoriaProdutos: {
    width: '100%',
    height: 300,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20,
    borderRadius: 25,
    marginVertical: 10,
  },
  imgProdutos: {
    width: '100%',
    height: '85%',
  },
  txtCategoriaProdutos: {
    height: '15%',
    fontSize: 30,
  }
});
