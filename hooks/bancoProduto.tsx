import AsyncStorage from '@react-native-async-storage/async-storage';

const produtosPadrao = [
  // Vegetais
  { id: 1, nome: 'Arroz', preco: 5.99, tipo: 'vegetais' },
  { id: 2, nome: 'Feijão', preco: 4.99, tipo: 'vegetais' },
  { id: 3, nome: 'Alface', preco: 2.50, tipo: 'vegetais' },
  { id: 4, nome: 'Tomate', preco: 3.00, tipo: 'vegetais' },
  { id: 5, nome: 'Cenoura', preco: 2.30, tipo: 'vegetais' },

  // Carnes
  { id: 6, nome: 'Frango', preco: 12.99, tipo: 'carnes' },
  { id: 7, nome: 'Carne Moída', preco: 14.99, tipo: 'carnes' },
  { id: 8, nome: 'Bife', preco: 19.99, tipo: 'carnes' },
  { id: 9, nome: 'Linguiça', preco: 11.99, tipo: 'carnes' },
  { id: 10, nome: 'Peixe', preco: 17.99, tipo: 'carnes' },

  // Frutas
  { id: 11, nome: 'Maçã', preco: 4.50, tipo: 'frutas' },
  { id: 12, nome: 'Banana', preco: 3.50, tipo: 'frutas' },
  { id: 13, nome: 'Laranja', preco: 4.00, tipo: 'frutas' },
  { id: 14, nome: 'Morango', preco: 7.00, tipo: 'frutas' },
  { id: 15, nome: 'Abacaxi', preco: 6.50, tipo: 'frutas' },

  // Padaria
  { id: 16, nome: 'Pão Francês', preco: 8.99, tipo: 'padaria' },
  { id: 17, nome: 'Bolo', preco: 12.99, tipo: 'padaria' },
  { id: 18, nome: 'Croissant', preco: 6.99, tipo: 'padaria' },
  { id: 19, nome: 'Torta', preco: 14.99, tipo: 'padaria' },
  { id: 20, nome: 'Biscoitos', preco: 5.99, tipo: 'padaria' },

  // Limpeza
  { id: 21, nome: 'Detergente', preco: 2.99, tipo: 'limpeza' },
  { id: 22, nome: 'Sabão em Pó', preco: 8.99, tipo: 'limpeza' },
  { id: 23, nome: 'Desinfetante', preco: 3.99, tipo: 'limpeza' },
  { id: 24, nome: 'Água Sanitária', preco: 2.50, tipo: 'limpeza' },
  { id: 25, nome: 'Esponja', preco: 1.99, tipo: 'limpeza' },

  // Outros
  { id: 26, nome: 'Papel Higiênico', preco: 10.99, tipo: 'outros' },
  { id: 27, nome: 'Guardanapo', preco: 3.50, tipo: 'outros' },
  { id: 28, nome: 'Alumínio', preco: 4.99, tipo: 'outros' },
  { id: 29, nome: 'Filme Plástico', preco: 5.50, tipo: 'outros' },
  { id: 30, nome: 'Vela', preco: 2.00, tipo: 'outros' }
];

const verificarProdutosPadrao = async () => {
  try {
    const produtosSalvos = await AsyncStorage.getItem('produtos');
    if (!produtosSalvos) {
      await AsyncStorage.setItem('produtos', JSON.stringify(produtosPadrao));
    }
  } catch (error) {
    console.error('Erro ao verificar produtos padrão: ', error);
  }
};

export default verificarProdutosPadrao;

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

export const atualizarProduto = async (id, novosDados) => {
  try {
    let produtosString = await AsyncStorage.getItem('produtos');
    let produtos = produtosString ? JSON.parse(produtosString) : [];
    
    const index = produtos.findIndex(produto => produto.id === id);
    if (index !== -1) {
      produtos[index] = { ...produtos[index], ...novosDados };
      await AsyncStorage.setItem('produtos', JSON.stringify(produtos));
    } else {
      throw new Error('Produto não encontrado');
    }
  } catch (error) {
    console.error('Erro ao atualizar o produto: ', error);
    throw error;
  }
};