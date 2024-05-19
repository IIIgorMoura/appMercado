import AsyncStorage from '@react-native-async-storage/async-storage';

// Função para criar um novo produto
export const adicionarProduto = async (produto) => {
  try {
    // Obter produtos existentes do AsyncStorage
    const produtos = await AsyncStorage.getItem('produtos');
    let listaProdutos = [];
    if (produtos !== null) {
      listaProdutos = JSON.parse(produtos);
    }

    // Adicionar o novo produto à lista existente
    const novoProduto = { id: Date.now(), ...produto };
    listaProdutos.push(novoProduto);

    // Salvar a lista de produtos atualizada no AsyncStorage
    await AsyncStorage.setItem('produtos', JSON.stringify(listaProdutos));
    
    return novoProduto.id;
  } catch (error) {
    console.error('Erro ao adicionar o produto: ', error);
    throw error;
  }
};

// Função para obter todos os produtos
export const obterProdutos = async () => {
  try {
    const produtos = await AsyncStorage.getItem('produtos');
    if (produtos !== null) {
      return JSON.parse(produtos);
    }
    return [];
  } catch (error) {
    console.error('Erro ao obter os produtos: ', error);
    throw error;
  }
};

// Função para obter um produto específico por ID
export const obterProdutoPorId = async (id) => {
  try {
    const produtos = await obterProdutos();
    return produtos.find(produto => produto.id === id);
  } catch (error) {
    console.error('Erro ao obter o produto: ', error);
    throw error;
  }
};

// Função para remover um produto por ID
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