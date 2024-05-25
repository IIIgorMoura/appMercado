import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View, Image, Modal, ScrollView } from 'react-native';
import { useState, useEffect } from "react";
import ESTILOS from '../styles/ESTILOS';
import { NovoProduto } from '../components/NovoProduto';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ProdutosTutorial } from '../components/modalsTutorial/produtosTutorial';

export function Produtos() {
  const navigation = useNavigation();
  const [ativoModalNovoProduto, setModalNovoProduto] = useState(false);
  const [ativoModalProdutoTutorial, setModalProdutoTutorial] = useState(false);

  const abrirModalNovoProduto = () => {
    setModalNovoProduto(true);
  };

  const fecharModalNovoProduto = () => {
    setModalNovoProduto(false);
  };

  const verificarModalTutorialProduto = async () => {
    try {
      const valor = await AsyncStorage.getItem('modalTutorialProdutosExibido');
      if (valor === null) {
        // Modal não foi exibido, então exibe e marca como exibido
        setModalProdutoTutorial(true);
        await AsyncStorage.setItem('modalTutorialProdutosExibido', 'true');
      }
    } catch (error) {
      console.error('Erro ao verificar se o modal já foi exibido: ', error);
    }
  };

  useEffect(() => {
    verificarModalTutorialProduto(); // Verifica se o modal de tutorial já foi exibido
  }, []);

  const fecharModalProdutoTutorial = () => {
    setModalProdutoTutorial(false);
  };

  return (
    <View style={ESTILOS.container}>
     <Text style={ESTILOS.titulo}>CATEGORIA DE PRODUTOS</Text>

      <TouchableOpacity style={ESTILOS.btnDestaque} onPress={abrirModalNovoProduto}>
        <Text style={ESTILOS.txtBtnDestaque}>Adicionar Novo Produto</Text>
        <Ionicons style={ESTILOS.btnDestaqueIcon} name="add-circle-outline" color="white" size={30}></Ionicons>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={ativoModalNovoProduto}
        style={ESTILOS.modal}
      >
        <NovoProduto fecharModalNovoProduto={fecharModalNovoProduto} />
      </Modal>

      <ScrollView 
        style={ESTILOS.listaElementos}
        showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styleProdutos.categoriaProdutos} onPress={() => navigation.navigate('Vegetais')}>
          <Image style={styleProdutos.imgProdutos} source={require('../assets/images/categoriasProdutos/produtosVegetais.png')}></Image>
          <Text style={styleProdutos.txtCategoriaProdutos}>Vegetais</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styleProdutos.categoriaProdutos} onPress={() => navigation.navigate('Carnes')}>
          <Image style={styleProdutos.imgProdutos} source={require('../assets/images/categoriasProdutos/produtosCarnes.png')}></Image>
          <Text style={styleProdutos.txtCategoriaProdutos}>Carnes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styleProdutos.categoriaProdutos} onPress={() => navigation.navigate('Padaria')}>
          <Image style={styleProdutos.imgProdutos} source={require('../assets/images/categoriasProdutos/produtosPadaria.png')}></Image>
          <Text style={styleProdutos.txtCategoriaProdutos}>Padaria</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styleProdutos.categoriaProdutos} onPress={() => navigation.navigate('Frutas')}>
          <Image style={styleProdutos.imgProdutos} source={require('../assets/images/categoriasProdutos/produtosFrutas.png')}></Image>
          <Text style={styleProdutos.txtCategoriaProdutos}>Frutas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styleProdutos.categoriaProdutos} onPress={() => navigation.navigate('Limpeza')}>
          <Image style={styleProdutos.imgProdutos} source={require('../assets/images/categoriasProdutos/produtosLimpeza.png')}></Image>
          <Text style={styleProdutos.txtCategoriaProdutos}>Limpeza</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styleProdutos.categoriaProdutos} onPress={() => navigation.navigate('Outros')}>
          <Image style={styleProdutos.imgProdutos} source={require('../assets/images/categoriasProdutos/produtosOutros.png')}></Image>
          <Text style={styleProdutos.txtCategoriaProdutos}>Outros</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal
        animationType="fade"
        transparent={true}
        visible={ativoModalProdutoTutorial}
        onRequestClose={fecharModalProdutoTutorial}
      >
        <ProdutosTutorial fecharModalProdutoTutorial={fecharModalProdutoTutorial} />
      </Modal>

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
    
    borderRadius: 25,
    marginVertical: 10,
    
  },
  imgProdutos: {
    width: '100%',
    height: '80%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  txtCategoriaProdutos: {
    height: '15%',
    fontSize: 30,
    marginTop: 8,
    fontWeight: '600',
  }
});
export default Produtos;