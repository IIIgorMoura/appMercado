import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { obterProdutos } from '../../hooks/bancoProduto';
import { Ionicons } from 'react-native-vector-icons';
import ESTILOS from '../../styles/ESTILOS';


export function AddPadaria({ fecharModalCategoria, adicionarProdutos }) {
  const [produtos, setProdutos] = useState([]);
  const [quantidades, setQuantidades] = useState({});

  useEffect(() => {
    const carregarProdutos = async () => {
      try {
        const todosProdutos = await obterProdutos();
        const produtosPadaria = todosProdutos.filter(produto => produto.tipo === 'padaria');
        const quantidadesInicial = {};
        produtosPadaria.forEach(produto => {
          quantidadesInicial[produto.id] = 0;
        });
        setProdutos(produtosPadaria);
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
      <View style={estiloModalEspecifico.itemInfo}>
        <Text style={estiloModalEspecifico.itemNome}>{item.nome}</Text>
        <Text style={estiloModalEspecifico.itemPreco}>{`Preço: R$ ${item.preco.toFixed(2)}`}</Text>
      </View>
      <View style={estiloModalEspecifico.quantidadeContainer}>
      <TouchableOpacity onPress={() => aumentarQuantidade(item.id)} style={estiloModalEspecifico.botaoQuantidade}>
          <Ionicons name="add-circle-outline" size={30} color="green" />
        </TouchableOpacity>
        <Text style={estiloModalEspecifico.textoQuantidade}>{quantidades[item.id]}</Text>
        <TouchableOpacity onPress={() => diminuirQuantidade(item.id)} style={estiloModalEspecifico.botaoQuantidade}>
          <Ionicons name="remove-circle-outline" size={30} color="red" />
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
    adicionarProdutos(produtosSelecionados);
    fecharModalCategoria();
  };

  return (
    <View style={estiloModalEspecifico.container}>
      <View style={estiloModalEspecifico.content}>
        <Text style={estiloModalEspecifico.titulo}>Padaria</Text>
        <FlatList
          data={produtos}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
        <View style={estiloModalEspecifico.baseBtnsModal}>
          <TouchableOpacity style={estiloModalEspecifico.btnVoltar} onPress={cancelar}>
            <Text style={ESTILOS.txtRoxo}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={estiloModalEspecifico.btnProximo} onPress={concluir}>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: "#fff",
    width: "90%",
    height: 600,
    paddingTop: 20,
    paddingBottom: 10,
    borderRadius: 25,
    paddingHorizontal: 20,
  },
  titulo: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
    alignSelf: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginVertical: 5,
    width: '100%',
  },
  itemInfo: {
    flex: 1,
  },
  quantidadeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  botaoQuantidade: {
    marginHorizontal: 4,
  },
  textoQuantidade: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 8,
  },
  itemNome: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemPreco: {
    fontSize: 16,
    color: 'purple',
  },
  baseBtnsModal: {
    flexDirection: 'row',
    width: '96%',
    height: '10%',
    justifyContent: 'center',
    marginTop: 20,
  },
  btnVoltar: {
    width: '50%',
    backgroundColor: "none",
    borderRadius: 20,
    borderColor: "#6622F6",
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    left:5,
    marginTop: 1,
    marginVertical:15,
    
  
  },
  btnProximo: {
    width: '50%',
    backgroundColor: "#6622F6",
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 1,
    left:9,
    marginTop: 1,
    marginVertical:15,

  },
});

export default AddPadaria;