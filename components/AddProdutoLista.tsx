import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Image, Modal } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ESTILOS from "../styles/ESTILOS";
import estiloModal from "../styles/estiloModal";
import { AddCarnes } from "./modalsProdutoCategoria/addCarnes";
// import {AddLimpeza} from "./modalsProdutoCategoria/addLimpeza";
// import {AddVegetais} from "./modalsProdutoCategoria/addVegetais";

export function AddProdutoLista({ fecharModalAddProduto, listaId, setProdutos }) {
  const [modalCategoria, setModalCategoria] = useState(null);

  const abrirModalCategoria = (categoria) => {
    setModalCategoria(categoria);
  };

  const fecharModalCategoria = () => {
    setModalCategoria(null);
  };

  const salvarProdutosNaLista = async (produtosSelecionados) => {
    try {
      // Salvar produtos na AsyncStorage
      const produtosExistentes = await AsyncStorage.getItem(`lista_${listaId}`);
      const listaProdutos = produtosExistentes ? JSON.parse(produtosExistentes) : [];
      const novaListaProdutos = [...listaProdutos, ...produtosSelecionados];
      await AsyncStorage.setItem(`lista_${listaId}`, JSON.stringify(novaListaProdutos));
  
      // Recarregar lista de produtos após adição
      const produtosAtualizados = await AsyncStorage.getItem(`lista_${listaId}`);
      setProdutos(produtosAtualizados ? JSON.parse(produtosAtualizados) : []);
  
      // Fechar modal após salvar produtos
      fecharModalAddProduto();
    } catch (error) {
      console.error('Erro ao salvar produtos na lista: ', error);
    }
  };

  const renderModalCategoria = () => {
    switch (modalCategoria) {
      case 'Carnes':
        return <AddCarnes fecharModal={fecharModalCategoria} salvarProdutos={salvarProdutosNaLista} />;
      // case 'Limpeza':
      //   return <AddLimpeza fecharModal={fecharModalCategoria} salvarProdutos={salvarProdutosNaLista} />;
      // case 'Vegetais':
      //   return <AddVegetais fecharModal={fecharModalCategoria} salvarProdutos={salvarProdutosNaLista} />;
      // Adicione casos para outras categorias aqui
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={[estiloModal.content, { alignItems: 'center' }]}>
        <Text>Adicionar Produtos à Lista</Text>
        <ScrollView
          style={ESTILOS.listaElementos}
          showsVerticalScrollIndicator={false}>
          <TouchableOpacity style={styles.categoriaProdutos} onPress={() => abrirModalCategoria('Vegetais')}>
            <Image style={styles.imgProdutos} source={require('../assets/images/categoriasProdutos/produtosVegetais.png')}></Image>
            <Text style={styles.txtCategoriaProdutos}>Vegetais</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.categoriaProdutos} onPress={() => abrirModalCategoria('Carnes')}>
            <Image style={styles.imgProdutos} source={require('../assets/images/categoriasProdutos/produtosCarnes.png')}></Image>
            <Text style={styles.txtCategoriaProdutos}>Carnes</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.categoriaProdutos} onPress={() => abrirModalCategoria('Limpeza')}>
            <Image style={styles.imgProdutos} source={require('../assets/images/categoriasProdutos/produtosLimpeza.png')}></Image>
            <Text style={styles.txtCategoriaProdutos}>Limpeza</Text>
          </TouchableOpacity>

        </ScrollView>
        <View style={estiloModal.baseBtnsModal}>
          <TouchableOpacity style={estiloModal.btnVoltar} onPress={fecharModalAddProduto}>
            <Text style={ESTILOS.txtRoxo}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={!!modalCategoria}
        onRequestClose={fecharModalCategoria}
      >
        <View style={styles.modalCategoria}>
          {renderModalCategoria()}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  categoriaProdutos: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  imgProdutos: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  txtCategoriaProdutos: {
    fontSize: 18,
  },
  modalCategoria: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    flex: 1,
    backgroundColor: 'none',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    backgroundColor: "#fff",
    width: "100%",
    height: 600,
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
});

export default AddProdutoLista;