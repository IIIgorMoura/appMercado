import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { obterProdutos, removerProduto } from '../../hooks/bancoProduto';
import { Ionicons } from '@expo/vector-icons';
import ESTILOS from '../../styles/ESTILOS';

export function Frutas() {
  const [produtos, setProdutos] = useState([]);

  const carregarProdutos = async () => {
    try {
      const todosProdutos = await obterProdutos();
      const produtosFrutas = todosProdutos.filter(produto => produto.tipo === 'frutas');
      setProdutos(produtosFrutas);
    } catch (error) {
      console.error('Erro ao carregar produtos: ', error);
    }
  };

  useEffect(() => {
    carregarProdutos();
  }, []);

  const handleRemoveProduto = async (id) => {
    try {
      await removerProduto(id);
      carregarProdutos();
    } catch (error) {
      console.error('Erro ao remover produto: ', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View>
        <Text  style={styles.title}>{item.nome}</Text>
        <Text style={styles.subTitle}>{`Preço: R$ ${item.preco.toFixed(2)}`}</Text>
      </View>
      <TouchableOpacity onPress={() => handleRemoveProduto(item.id)}>
        <Ionicons name="trash-bin-outline" style={styles.lixo} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={ESTILOS.container}>
      <FlatList
        style={ESTILOS.listaElementos}
        data={produtos}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
      backgroundColor: '#fff',
      padding: 20,
      width: 370,
      height: 100,

      marginVertical: '3%',
      borderRadius: 25,
  },
  title: {
      fontSize: 20,
      fontWeight: '800',
  },

  subTitle: {
      marginTop: 10,
      color: '#9868FF',
      fontWeight: '400',
      fontSize: 20,
  },

  lixo: {
      color: 'red',
      fontSize: 30,
      marginLeft: '85%',
      marginTop: '-8%'

  },

  edit: {
      color: 'blue',
      fontSize: 30,
      marginLeft: '86%',
      marginTop: '-23%'

  }
});

export default Frutas;