import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Image, Modal } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ESTILOS from "../styles/ESTILOS";
import estiloModal from "../styles/estiloModal";

import { AddVegetais } from "./modalsProdutoCategoria/addVegetais";
import { AddCarnes } from "./modalsProdutoCategoria/addCarnes";
import { AddPadaria } from "./modalsProdutoCategoria/addPadaria";
import { AddFrutas } from "./modalsProdutoCategoria/addFrutas";
import { AddLimpeza } from "./modalsProdutoCategoria/addLimpeza";
import { AddOutros } from "./modalsProdutoCategoria/addOutros";

import { AvisoLimiteCusto } from "./AvisoLimiteCusto";

export function AddProdutoLista({ fecharModalAddProduto, listaId, limite, totalPreco, setModalLimiteAlcancadoVisible }) {
  const [produtos, setProdutos] = useState([]);
  const [modalCategoria, setModalCategoria] = useState(null);

  const abrirModalCategoria = (categoria) => {
    setModalCategoria(categoria);
  };

  const fecharModalCategoria = () => {
    setModalCategoria(null);
  };

  const adicionarProdutos = async (produtosSelecionados) => {
    try {
      const produtosExistentes = await AsyncStorage.getItem(`lista_${listaId}`);
      const listaProdutos = produtosExistentes ? JSON.parse(produtosExistentes) : [];
      const novaListaProdutos = [...listaProdutos, ...produtosSelecionados];
      await AsyncStorage.setItem(`lista_${listaId}`, JSON.stringify(novaListaProdutos));

      const produtosAtualizados = await AsyncStorage.getItem(`lista_${listaId}`);
      setProdutos(produtosAtualizados ? JSON.parse(produtosAtualizados) : []);

      fecharModalCategoria();
    } catch (error) {
      console.error('Erro ao salvar produtos na lista: ', error);
    }
  };

  const adicionarProduto = async (produto) => {
    try {
      const produtosAtualizados = await AsyncStorage.getItem(`lista_${listaId}`);
      const produtosLista = produtosAtualizados ? JSON.parse(produtosAtualizados) : [];
      const novoTotal = totalPreco + (produto.quantidade * produto.preco);

      if (novoTotal >= limite) {
        setModalLimiteAlcancadoVisible(true);
      } else {
        produtosLista.push(produto);
        await AsyncStorage.setItem(`lista_${listaId}`, JSON.stringify(produtosLista));
        fecharModalAddProduto();
      }
    } catch (error) {
      console.error('Erro ao adicionar produto: ', error);
    }
  };

  const concluirAdicao = () => {
    fecharModalAddProduto();
  };

  const renderModalCategoria = () => {
    switch (modalCategoria) {
      case 'Vegetais':
        return <AddVegetais fecharModalCategoria={fecharModalCategoria} adicionarProdutos={adicionarProdutos} />;

      case 'Carnes':
        return <AddCarnes fecharModalCategoria={fecharModalCategoria} adicionarProdutos={adicionarProdutos} />;

      case 'Padaria':
        return <AddPadaria fecharModalCategoria={fecharModalCategoria} adicionarProdutos={adicionarProdutos} />;

      case 'Frutas':
        return <AddFrutas fecharModalCategoria={fecharModalCategoria} adicionarProdutos={adicionarProdutos} />;

      case 'Limpeza':
        return <AddLimpeza fecharModalCategoria={fecharModalCategoria} adicionarProdutos={adicionarProdutos} />;

      case 'Outros':
        return <AddOutros fecharModalCategoria={fecharModalCategoria} adicionarProdutos={adicionarProdutos} />;

      default:
        return null;
    }
  };

  return (
    <View style={estiloModal.container}>
      <View style={[estiloModal.content, { alignItems: 'center' }]}>
        <Text>Selecione a Categoria do Produto</Text>
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

          <TouchableOpacity style={styles.categoriaProdutos} onPress={() => abrirModalCategoria('Padaria')}>
            <Image style={styles.imgProdutos} source={require('../assets/images/categoriasProdutos/produtosPadaria.png')}></Image>
            <Text style={styles.txtCategoriaProdutos}>Padaria</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.categoriaProdutos} onPress={() => abrirModalCategoria('Frutas')}>
            <Image style={styles.imgProdutos} source={require('../assets/images/categoriasProdutos/produtosFrutas.png')}></Image>
            <Text style={styles.txtCategoriaProdutos}>Frutas</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.categoriaProdutos} onPress={() => abrirModalCategoria('Limpeza')}>
            <Image style={styles.imgProdutos} source={require('../assets/images/categoriasProdutos/produtosLimpeza.png')}></Image>
            <Text style={styles.txtCategoriaProdutos}>Limpeza</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.categoriaProdutos} onPress={() => abrirModalCategoria('Outros')}>
            <Image style={styles.imgProdutos} source={require('../assets/images/categoriasProdutos/produtosOutros.png')}></Image>
            <Text style={styles.txtCategoriaProdutos}>Outros</Text>
          </TouchableOpacity>
        </ScrollView>

        <View style={estiloModal.baseBtnsModal}>
          <TouchableOpacity style={estiloModal.btnVoltar} onPress={fecharModalAddProduto}>
            <Text style={ESTILOS.txtRoxo}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={estiloModal.btnProximo} onPress={concluirAdicao}>
            <Text style={ESTILOS.txtBranco}>Concluir</Text>
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


      <AvisoLimiteCusto
        visible={setModalLimiteAlcancadoVisible}
        onContinue={() => {
          setModalLimiteAlcancadoVisible(false);
        }}
        onStop={() => {
          setModalLimiteAlcancadoVisible(false);
          fecharModalAddProduto();
        }}
      />
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