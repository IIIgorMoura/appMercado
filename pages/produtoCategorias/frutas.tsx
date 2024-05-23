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
    <View style={ESTILOS.listaItem}>
      <View>
        <Text style={ESTILOS.listaItemTitulo}>{item.nome}</Text>
        <Text>{`Preço: R$ ${item.preco.toFixed(2)}`}</Text>
      </View>
      <TouchableOpacity onPress={() => handleRemoveProduto(item.id)}>
        <Ionicons name="trash-bin-outline" size={24} color="red" />
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
    fontWeight : '800',
  },

  subTitle: {
marginTop: 10,
color: '#9400d3',
fontWeight : '400',
fontSize: 20,
  },

  lixo: {
      color: 'red',
      fontSize: 30,
      marginLeft: '80%',
      marginTop: '-15%'
     
        },
});