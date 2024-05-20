import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { obterProdutos } from '../../hooks/bancoProduto';
import ESTILOS from '../../styles/ESTILOS';
import estiloModal from '../../styles/estiloModal';

export function AddCarnes({ fecharModalCategoria, salvarProdutos }) {
  const [produtos, setProdutos] = useState([]);
  const [quantidades, setQuantidades] = useState({});

  useEffect(() => {
    const carregarProdutos = async () => {
      try {
        const todosProdutos = await obterProdutos();
        const produtosCarnes = todosProdutos.filter(produto => produto.tipo === 'carnes');
        const quantidadesInicial = {};
        produtosCarnes.forEach(produto => {
          quantidadesInicial[produto.id] = 0;
        });
        setProdutos(produtosCarnes);
        setQuantidades(quantidadesInicial);
      } catch (error) {
        console.error('Erro ao carregar produtos: ', error);
      }
    };

    carregarProdutos();
  }, []);

  const aumentarQuantidade = (produtoId) => {
    setQuantidades(prevQuantidades => ({
      ...prevQuantidades,
      [produtoId]: prevQuantidades[produtoId] + 1
    }));
  };

  const diminuirQuantidade = (produtoId) => {
    if (quantidades[produtoId] > 0) {
      setQuantidades(prevQuantidades => ({
        ...prevQuantidades,
        [produtoId]: prevQuantidades[produtoId] - 1
      }));
    }
  };

  const renderItem = ({ item }) => (
    <View style={estiloModalEspecifico.itemContainer}>
      <Text style={estiloModalEspecifico.itemNome}>{item.nome}</Text>
      <Text style={estiloModalEspecifico.itemPreco}>{`Preço: R$ ${item.preco.toFixed(2)}`}</Text>
      <View style={estiloModalEspecifico.quantidadeContainer}>
        <TouchableOpacity onPress={() => diminuirQuantidade(item.id)} style={estiloModalEspecifico.botaoQuantidade}>
          <Text style={estiloModalEspecifico.textoBotao}>-</Text>
        </TouchableOpacity>
        <Text style={estiloModalEspecifico.textoQuantidade}>{quantidades[item.id]}</Text>
        <TouchableOpacity onPress={() => aumentarQuantidade(item.id)} style={estiloModalEspecifico.botaoQuantidade}>
          <Text style={estiloModalEspecifico.textoBotao}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const cancelar = () => {
    fecharModalCategoria();
  };

  const concluir = () => {
    const produtosSelecionados = produtos.map(produto => ({
      ...produto,
      quantidade: quantidades[produto.id]
    })).filter(produto => produto.quantidade > 0);
    salvarProdutos(produtosSelecionados);
    fecharModalCategoria();
  };

  return (
    <View style={estiloModalEspecifico.container}>
      <View style={estiloModalEspecifico.content}>
        <Text>Carnes</Text>
        <FlatList
          data={produtos}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />

        <View style={estiloModal.baseBtnsModal}>
          <TouchableOpacity style={estiloModal.btnVoltar} onPress={cancelar}>
            <Text style={ESTILOS.txtRoxo}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={estiloModal.btnProximo} onPress={concluir}>
            <Text style={ESTILOS.txtBranco}>Adicionar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const estiloModalEspecifico = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'none',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    backgroundColor: "#fff",
    width: "96%",
    height: 600,
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  quantidadeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  botaoQuantidade: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#ccc',
    borderRadius: 6,
    marginHorizontal: 4,
  },
  textoBotao: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  textoQuantidade: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 8,
  },
  itemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  itemNome: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemPreco: {
    fontSize: 14,
    color: '#555',
  },
});

export default AddCarnes;