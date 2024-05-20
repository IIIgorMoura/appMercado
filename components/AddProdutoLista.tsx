import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Button, TextInput } from "react-native";
import { obterProdutos } from "../hooks/bancoProduto";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ESTILOS from "../styles/ESTILOS";
import estiloModal from "../styles/estiloModal";

export function AddProdutoLista({ fecharModalAddProduto, listaId }) {
  const [produtos, setProdutos] = useState([]);
  const [quantidades, setQuantidades] = useState({});

  useEffect(() => {
    const carregarProdutos = async () => {
      const produtos = await obterProdutos();
      setProdutos(produtos);
    };

    carregarProdutos();
  }, []);

  const handleQuantidadeChange = (produtoId, quantidade) => {
    setQuantidades({ ...quantidades, [produtoId]: quantidade });
  };

  const salvarProdutosNaLista = async () => {
    try {
      const listaProdutos = produtos.map(produto => ({
        ...produto,
        quantidade: quantidades[produto.id] || 0
      }));

      await AsyncStorage.setItem(`lista_${listaId}`, JSON.stringify(listaProdutos));
      fecharModalAddProduto();
    } catch (error) {
      console.error('Erro ao salvar produtos na lista: ', error);
    }
  };

  return (
    <View style={estiloModal.container}>
      <View style={[styles.content, { alignItems: 'center' }]}>
        <Text>Adicionar Produtos à Lista</Text>
        <ScrollView style={styles.contentProdutos}>

          {produtos.map(produto => (
            <View key={produto.id} style={styles.produtoContainer}>
              <Text>{produto.nome}</Text>
              <View style={styles.quantidadeContainer}>
                <Button title="-" onPress={() => handleQuantidadeChange(produto.id, Math.max((quantidades[produto.id] || 0) - 1, 0))} />
                <TextInput
                  style={styles.quantidadeInput}
                  keyboardType="numeric"
                  value={(quantidades[produto.id] || 0).toString()}
                  onChangeText={text => handleQuantidadeChange(produto.id, parseInt(text) || 0)}
                />
                <Button title="+" onPress={() => handleQuantidadeChange(produto.id, (quantidades[produto.id] || 0) + 1)} />
              </View>
            </View>
          ))}

        </ScrollView>
        <View style={estiloModal.baseBtnsModal}>
          <TouchableOpacity style={estiloModal.btnVoltar} onPress={fecharModalAddProduto}>
            <Text style={ESTILOS.txtRoxo}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={estiloModal.btnProximo} onPress={salvarProdutosNaLista}>
            <Text style={ESTILOS.txtBranco}>Continuar</Text>
          </TouchableOpacity>
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  produtoContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    width: '100%',
    backgroundColor: '#043434',
  },
  quantidadeContainer: {
    flexDirection: 'row',
  },
  quantidadeInput: {
    width: 40,
    marginHorizontal: 10,
  },
  content: {
    backgroundColor: "#fff",
    width: "90%",
    height: 600,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 25,
  },
  contentProdutos: {
    width: "90%",
  },
});

export default AddProdutoLista;