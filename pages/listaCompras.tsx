import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Modal, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import ESTILOS from '../styles/ESTILOS';
import { AddProdutoLista } from '../components/AddProdutoLista';
import { AvisoLimiteCusto } from '../components/AvisoLimiteCusto';
import { obterListaPorId } from '../hooks/bancoLista';

interface RouteParams {
    listaId?: number;
}

export function ListaCompras({ }) {
    const route = useRoute();
    const { listaId } = route.params as RouteParams;

    const [lista, setLista] = useState(null);
    const [produtos, setProdutos] = useState([]);
    const [modalAddProdutoVisible, setModalAddProdutoVisible] = useState(false);
    const [totalPreco, setTotalPreco] = useState(0);
    const [modalLimiteAlcancadoVisivel, setModalLimiteAlcancadoVisivel] = useState(false);

    useEffect(() => {
        const carregarDados = async () => {
            try {
                const lista = await obterListaPorId(listaId);
                setLista(lista);
                const produtos = await AsyncStorage.getItem(`lista_${listaId}`);
                const produtosLista = produtos ? JSON.parse(produtos) : [];
                setProdutos(produtosLista);
                calcularTotal(produtosLista, lista.limite);
            } catch (error) {
                console.error('Erro ao carregar os dados: ', error);
            }
        };

        carregarDados();
    }, [listaId]);

    const atualizarListaProdutos = async () => {
        try {
            const produtosAtualizados = await AsyncStorage.getItem(`lista_${listaId}`);
            const produtosLista = produtosAtualizados ? JSON.parse(produtosAtualizados) : [];
            setProdutos(produtosLista);
            calcularTotal(produtosLista, lista.limite);
        } catch (error) {
            console.error('Erro ao atualizar lista de produtos: ', error);
        }
    };

    const abrirModalAddProduto = () => {
        setModalAddProdutoVisible(true);
    };

    const fecharModalAddProduto = () => {
        setModalAddProdutoVisible(false);
        atualizarListaProdutos();
    };

    const calcularTotal = (produtos, limite) => {
        const total = produtos.reduce((acc, produto) => acc + (produto.quantidade * produto.preco), 0);
        setTotalPreco(total);

        if (total >= limite) {
            setModalLimiteAlcancadoVisivel(true);
        }
    };

    const continuarAdicionandoProdutos = () => {
        setModalLimiteAlcancadoVisivel(false);
        abrirModalAddProduto();
    };

    const pararAdicaoProdutos = () => {
        setModalLimiteAlcancadoVisivel(false);
        setModalAddProdutoVisible(false);
    };

    const removerProduto = async (id) => {
        try {
            const produtosAtualizados = produtos.filter(produto => produto.id !== id);
            await AsyncStorage.setItem(`lista_${listaId}`, JSON.stringify(produtosAtualizados));
            setProdutos(produtosAtualizados);
            calcularTotal(produtosAtualizados, lista.limite);
        } catch (error) {
            console.error('Erro ao remover produto: ', error);
        }
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
                <Text style={[styles.totalPreco, totalPreco >= lista.limite ? styles.totalPrecoLimite : {}]}>
                    Total da Lista: R${totalPreco.toFixed(2)}
                </Text>
            </View>

            <FlatList
                data={produtos}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => {
                    const precoTotalProduto = item.quantidade * item.preco;
                    return (
                        <View style={styles.produtoContainer}>
                            <View style={styles.produtoContainer}>
                                <Text style={styles.produtoNome}>{item.nome}</Text>
                                <Text style={styles.produtoQuantidade}>Quantidade: {item.quantidade}</Text>
                                <Text style={styles.produtoPreco}>Preço Unitário: R${item.preco.toFixed(2)}</Text>
                                <Text style={styles.produtoPrecoTotal}>Preço Total: R${precoTotalProduto.toFixed(2)}</Text>
                                <TouchableOpacity onPress={() => removerProduto(item.id)}>
                                    <Ionicons name="trash-bin-outline" size={24} color="red" />
                                </TouchableOpacity>
                            </View>

                        </View>
                    );
                }}
            />

            <TouchableOpacity style={ESTILOS.btnDestaque} onPress={abrirModalAddProduto}>
                <Text style={styles.btnAdicionarText}>Adicionar Produtos</Text>
                <Ionicons style={ESTILOS.btnDestaqueIcon} name="add-circle-outline" color="white" size={20} />
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalAddProdutoVisible}
                onRequestClose={fecharModalAddProduto}
            >
                <AddProdutoLista
                    fecharModalAddProduto={fecharModalAddProduto}
                    listaId={listaId}
                    limite={lista.limite}
                    totalPreco={totalPreco}
                    setModalLimiteAlcancadoVisivel={setModalLimiteAlcancadoVisivel}
                />
            </Modal>

            <AvisoLimiteCusto
                modalAvisoVisivel={modalLimiteAlcancadoVisivel}
                aoContinuar={continuarAdicionandoProdutos}
                aoParar={pararAdicaoProdutos}
            />
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
    totalPreco: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'green',
        marginBottom: 20,
    },
    totalPrecoLimite: {
        color: 'red',
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
    produtoPrecoTotal: {
        fontSize: 16,
        color: 'blue',
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