import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { obterProdutos, removerProduto } from '../../hooks/bancoProduto';
import { Ionicons } from '@expo/vector-icons';
import ESTILOS from '../../styles/ESTILOS';

export function Carnes() {
  const [produtos, setProdutos] = useState([]);

  const carregarProdutos = async () => {
    try {
      const todosProdutos = await obterProdutos();
      const produtosCarnes = todosProdutos.filter(produto => produto.tipo === 'carnes');
      setProdutos(produtosCarnes);
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
      carregarProdutos(); // Atualiza a lista de produtos após a remoção
    } catch (error) {
      console.error('Erro ao remover produto: ', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.itemInfo}>
        <Text style={styles.title}>{item.nome}</Text>
        <Text>{`Preço: R$ ${item.preco.toFixed(2)}`}</Text>
      </View>
      <TouchableOpacity onPress={() => handleRemoveProduto(item.id)}>
        <Ionicons name="trash-bin-outline" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={ESTILOS.container}>
      <Text style={styles.header}>Carnes</Text>
      <FlatList
        data={produtos}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  itemInfo: {
    flexDirection: 'column',
  },
  title: {
    fontSize: 24,
  },
});