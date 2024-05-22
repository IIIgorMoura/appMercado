import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { obterProdutos, removerProduto } from '../../hooks/bancoProduto';
import { Ionicons } from '@expo/vector-icons';
import ESTILOS from '../../styles/ESTILOS';
import { EditarProdutoPRODUTO } from '../../components/modalsProdutoCategoria/editarProdutoPRODUTO';

export function Carnes() {
  const [produtos, setProdutos] = useState([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [modalVisivel, setModalVisivel] = useState(false);

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

  const abrirModalEditar = (produto) => {
    setProdutoSelecionado(produto);
    setModalVisivel(true);
  };
  
  const handleRemoveProduto = async (id) => {
    try {
      await removerProduto(id);
      carregarProdutos();
    } catch (error) {
      console.error('Erro ao remover produto: ', error);
    }
  };
  
  const handleAtualizarProduto = async (produtoAtualizado) => {
    try {
      // Atualize o produto utilizando a função adequada do seu banco de dados
      // Exemplo: await atualizarProduto(produtoAtualizado.id, produtoAtualizado);
      await carregarProdutos(); // Atualize a lista após a edição do produto
      setModalVisivel(false); // Feche o modal após a edição do produto
    } catch (error) {
      console.error('Erro ao atualizar produto: ', error);
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
      <TouchableOpacity onPress={() => abrirModalEditar(item)}>
        <Ionicons name="create-outline" size={24} color="blue" />
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisivel}
        onRequestClose={() => {
          setModalVisivel(false);
        }}
      >
        <EditarProdutoPRODUTO
          produto={produtoSelecionado}
          fecharModal={() => setModalVisivel(false)}
          atualizarProdutos={handleAtualizarProduto} // Passa a função handleAtualizarProduto
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
});