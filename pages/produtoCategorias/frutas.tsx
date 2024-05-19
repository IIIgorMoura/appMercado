import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { obterProdutos } from '../../hooks/bancoProduto';
import ESTILOS from '../../styles/ESTILOS';

export function Frutas() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const carregarProdutos = async () => {
      try {
        const todosProdutos = await obterProdutos();
        const produtosFrutas = todosProdutos.filter(produto => produto.tipo === 'frutas');
        setProdutos(produtosFrutas);
      } catch (error) {
        console.error('Erro ao carregar produtos: ', error);
      }
    };

    carregarProdutos();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.nome}</Text>
      <Text>{`Preço: R$ ${item.preco.toFixed(2)}`}</Text>
    </View>
  );

  return (
    <View style={ESTILOS.container}>
      <Text>Frutas</Text>
      <FlatList
        data={produtos}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  title: {
    fontSize: 24,
  },
});