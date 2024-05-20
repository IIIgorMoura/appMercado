import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Modal } from 'react-native';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import ESTILOS from '../styles/ESTILOS';
import { AddProdutoLista } from '../components/AddProdutoLista';
import { obterListaPorId, obterProdutosPorListaId } from '../hooks/bancoLista';

interface RouteParams {
    listaId?: number;
}

export function ListaCompras({ navigation }) {
    const route = useRoute();
    const { listaId } = route.params as RouteParams;

    const [lista, setLista] = useState(null);
    const [produtos, setProdutos] = useState([]);
    const [modalAddProdutoVisible, setModalAddProdutoVisible] = useState(false);

    useEffect(() => {
        if (listaId) {
            const carregarDados = async () => {
                try {
                    const lista = await obterListaPorId(listaId);
                    setLista(lista);
                    const produtos = await AsyncStorage.getItem(`lista_${listaId}`);
                    setProdutos(produtos ? JSON.parse(produtos) : []);
                } catch (error) {
                    console.error('Erro ao carregar os dados: ', error);
                }
            };

            carregarDados();
        }
    }, [listaId]);

    const abrirModalAddProduto = () => {
        setModalAddProdutoVisible(true);
    };

    const fecharModalAddProduto = () => {
        setModalAddProdutoVisible(false);
    };

    if (!listaId) {
        return (
            <View style={styles.container}>
                <Text>ID da lista não encontrado.</Text>
            </View>
        );
    }

    if (!lista) {
        return (
            <View style={styles.container}>
                <Text>Carregando...</Text>
            </View>
        );
    }

    return (
        <View style={ESTILOS.container}>
            <View>
                <Text style={styles.title}>{lista.nomeLista}</Text>
                <Text style={styles.subtitle}>Limite de Custo: R${lista.limite.toFixed(2)}</Text>
            </View>

            <FlatList
                data={produtos}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.produtoContainer}>
                        <Text style={styles.produtoNome}>{item.nome}</Text>
                        <Text style={styles.produtoQuantidade}>Quantidade: {item.quantidade}</Text>
                        <Text style={styles.produtoPreco}>Preço: R${item.preco.toFixed(2)}</Text>
                    </View>
                )}
            />

            <TouchableOpacity style={ESTILOS.btnDestaque} onPress={abrirModalAddProduto}>
                <Text style={styles.btnAdicionarText}>Adicionar Produtos</Text>
                <Ionicons style={ESTILOS.btnDestaqueIcon} name="add-circle-outline" color="white" size={20}></Ionicons>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalAddProdutoVisible}
                onRequestClose={fecharModalAddProduto}
            >
                <AddProdutoLista fecharModalAddProduto={fecharModalAddProduto} listaId={listaId} />
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        marginBottom: 10,
    },
    produtoContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    produtoNome: {
        fontSize: 18,
    },
    produtoQuantidade: {
        fontSize: 16,
    },
    produtoPreco: {
        fontSize: 16,
        color: 'gray',
    },
    btnAdicionar: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#007bff',
        alignItems: 'center',
        borderRadius: 5,
    },
    btnAdicionarText: {
        color: '#fff',
        fontSize: 18,
    },
});

export default ListaCompras;
// import React, { useState, useEffect } from "react";
// import { StyleSheet, Text, View, FlatList } from "react-native";
// import { useRoute } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import ESTILOS from "../styles/ESTILOS";
// import { obterListaPorId } from '../hooks/bancoLista';

// export function ListaCompras({ navigation }) {
//     const route = useRoute();
//     const { listaId } = route.params as RouteParams;

//     interface RouteParams {
//         listaId?: number;
//     }
    
//     const [lista, setLista] = useState();
//     const [produtos, setProdutos] = useState([]);

//     useEffect(() => {
//         const carregarLista = async () => {
//             try {
//                 // Carregar lista de produtos da AsyncStorage
//                 const listaProdutos = await AsyncStorage.getItem(`lista_${listaId}`);
//                 setProdutos(listaProdutos ? JSON.parse(listaProdutos) : []);

//                 // Carregar outras informações da lista, se necessário
//                 const lista = await obterListaPorId(listaId);
//                 setLista(lista);
//             } catch (error) {
//                 console.error('Erro ao carregar a lista de compras: ', error);
//             }
//         };

//         carregarLista();
//     }, []);

//     if (!produtos) {
//         return (
//             <View style={styles.container}>
//                 <Text>Carregando...</Text>
//             </View>
//         );
//     }

//     return (
//         <View style={ESTILOS.container}>
//             <View>
//                 <Text style={styles.title}>{lista.nomeLista}</Text>
//                 <Text style={styles.subtitle}>Limite de Custo: R${lista.limite.toFixed(2)}</Text>
//             </View>

//             <FlatList
//                 data={produtos}
//                 keyExtractor={(item, index) => index.toString()}
//                 renderItem={({ item }) => (
//                     <View style={styles.produtoContainer}>
//                         <Text style={styles.produtoNome}>{item.nome}</Text>
//                         <Text style={styles.produtoQuantidade}>Quantidade: {item.quantidade}</Text>
//                         <Text style={styles.produtoPreco}>Preço: R${item.preco.toFixed(2)}</Text>
//                     </View>
//                 )}
//             />
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 20,
//         backgroundColor: '#fff',
//     },
//     title: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 10,
//     },
//     subtitle: {
//         fontSize: 18,
//         marginBottom: 10,
//     },
//     produtoContainer: {
//         padding: 10,
//         borderBottomWidth: 1,
//         borderBottomColor: '#ddd',
//     },
//     produtoNome: {
//         fontSize: 18,
//     },
//     produtoQuantidade: {
//         fontSize: 16,
//     },
//     produtoPreco: {
//         fontSize: 16,
//         color: 'gray',
//     },
// });

// export default ListaCompras;