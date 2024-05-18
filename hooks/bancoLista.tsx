// import SQLite from 'react-native-sqlite-storage';

// // Abrir a conexão com o banco de dados
// const db = SQLite.openDatabase(
//   {
//     name: 'lista_compras.db',
//     location: 'default',
//   },
//   () => { console.log('Banco de dados aberto com sucesso'); },
//   error => { console.error('Erro ao abrir o banco de dados: ', error); }
// );

// // Função para criar tabelas, se não existirem
// export const criarTabela = () => {
//   db.transaction(tx => {
//     tx.executeSql(
//       `CREATE TABLE IF NOT EXISTS lista_compras (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         nomeLista TEXT NOT NULL,
//         limite REAL
//       );`,
//       [],
//       () => { console.log('Tabela lista_compras criada com sucesso'); },
//       error => { console.error('Erro ao criar tabela lista_compras: ', error); }
//     );
//     tx.executeSql(
//       `CREATE TABLE IF NOT EXISTS produtos (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         lista_compras_id INTEGER NOT NULL,
//         nomeProduto TEXT NOT NULL,
//         quantidade INTEGER,
//         FOREIGN KEY (lista_compras_id) REFERENCES lista_compras(id)
//       );`,
//       [],
//       () => { console.log('Tabela produtos criada com sucesso'); },
//       error => { console.error('Erro ao criar tabela produtos: ', error); }
//     );
//   });
// };

// // Função para obter a instância do banco de dados
// export const getDB = () => db;

// // Função para adicionar uma nova lista de compras
// export const adicionarListaCompras = (nomeLista: string, limite: number, callback: (id: number) => void) => {
//   db.transaction(tx => {
//     tx.executeSql(
//       'INSERT INTO lista_compras (nomeLista, limite) VALUES (?, ?);',
//       [nomeLista, limite],
//       (_, result) => {
//         callback(result.insertId); // Passar o ID da nova lista de compras para o callback
//       },
//       error => { console.error('Erro ao adicionar a lista de compras: ', error); }
//     );
//   });
// };

// // Função para adicionar um produto a uma lista de compras específica
// export const adicionarProduto = (listaComprasId: number, nomeProduto: string, quantidade: number) => {
//   db.transaction(tx => {
//     tx.executeSql(
//       'INSERT INTO produtos (lista_compras_id, nomeProduto, quantidade) VALUES (?, ?, ?);',
//       [listaComprasId, nomeProduto, quantidade],
//       () => {
//         console.log('Produto adicionado com sucesso');
//       },
//       error => { console.error('Erro ao adicionar o produto: ', error); }
//     );
//   });
// };
import AsyncStorage from '@react-native-async-storage/async-storage';

// Função para criar uma nova lista de compras
export const adicionarListaCompras = async (nomeLista, limite) => {
  try {
    // Obter listas de compras existentes do AsyncStorage
    const listasCompras = await AsyncStorage.getItem('listasCompras');
    let listas = [];
    if (listasCompras !== null) {
      listas = JSON.parse(listasCompras);
    }

    // Adicionar a nova lista de compras à lista existente
    const novaLista = { id: Date.now(), nomeLista, limite };
    listas.push(novaLista);

    // Salvar a lista de compras atualizada no AsyncStorage
    await AsyncStorage.setItem('listasCompras', JSON.stringify(listas));
    
    return novaLista.id;
  } catch (error) {
    console.error('Erro ao adicionar a lista de compras: ', error);
    throw error;
  }
};

// Função para obter todas as listas de compras
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