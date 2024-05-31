import AsyncStorage from '@react-native-async-storage/async-storage';
export const adicionarProdutosNaLista = async (listaId, produtos) => {
  try {
    await AsyncStorage.setItem(`lista_${listaId}`, JSON.stringify(produtos));
  } catch (error) {
    console.error('Erro ao adicionar produtos à lista de compras: ', error);
    throw error;
  }
};


export const obterProdutosPorListaId = async (listaId) => {
  try {
    const produtos = await AsyncStorage.getItem(`lista_${listaId}`);
    return produtos ? JSON.parse(produtos) : [];
  } catch (error) {
    console.error('Erro ao obter os produtos da lista de compras: ', error);
    throw error;
  }
};

export const obterListaPorId = async (id) => {
  try {
    const listasCompras = await AsyncStorage.getItem('listasCompras');
    const listas = listasCompras ? JSON.parse(listasCompras) : [];
    return listas.find(lista => lista.id === id);
  } catch (error) {
    console.error('Erro ao obter a lista de compras: ', error);
    throw error;
  }
};


export const adicionarListaCompras = async (nomeLista, limite, tipoCompra) => {
  try {
    const listasCompras = await AsyncStorage.getItem('listasCompras');
    let listas = [];
    if (listasCompras !== null) {
      listas = JSON.parse(listasCompras);
    }

    const novaLista = { id: Date.now(), nomeLista, limite, tipoCompra };
    listas.push(novaLista);

    await AsyncStorage.setItem('listasCompras', JSON.stringify(listas));

    return novaLista.id;
  } catch (error) {
    console.error('Erro ao adicionar a lista de compras: ', error);
    throw error;
  }
};

export const obterListasCompras = async () => {
  try {
    const listasCompras = await AsyncStorage.getItem('listasCompras');
    if (listasCompras !== null) {
      return JSON.parse(listasCompras);
    }
    return [];
  } catch (error) {
    console.error('Erro ao obter as listas de compras: ', error);
    throw error;
  }
};