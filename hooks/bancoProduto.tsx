import AsyncStorage from '@react-native-async-storage/async-storage';

const produtosPadrao = [
  { id: 1, nome: 'Arroz', preco: 5.99, tipo: 'Grãos' },
  { id: 2, nome: 'Feijão', preco: 4.99, tipo: 'Grãos' },
];

export const adicionarProduto = async (produto) => {
  try {
    const produtos = await AsyncStorage.getItem('produtos');
    let listaProdutos = produtos ? JSON.parse(produtos) : [];
    const novoProduto = { id: Date.now(), ...produto };
    listaProdutos.push(novoProduto);
    await AsyncStorage.setItem('produtos', JSON.stringify(listaProdutos));
    return novoProduto.id;
  } catch (error) {
    console.error('Erro ao adicionar o produto: ', error);
    throw error;
  }
};

export const obterProdutos = async () => {
  try {
    const produtos = await AsyncStorage.getItem('produtos');
    if (produtos !== null) {
      return JSON.parse(produtos);
    }
    // Se não houver produtos, retornar produtos padrão
    return produtosPadrao;
  } catch (error) {
    console.error('Erro ao obter os produtos: ', error);
    throw error;
  }
};

export const obterProdutoPorId = async (id) => {
  try {
    const produtos = await obterProdutos();
    return produtos.find(produto => produto.id === id);
  } catch (error) {
    console.error('Erro ao obter o produto: ', error);
    throw error;
  }
};

export const removerProduto = async (id) => {
  try {
    const produtos = await obterProdutos();
    const novaListaProdutos = produtos.filter(produto => produto.id !== id);
    await AsyncStorage.setItem('produtos', JSON.stringify(novaListaProdutos));
  } catch (error) {
    console.error('Erro ao remover o produto: ', error);
    throw error;
  }
};