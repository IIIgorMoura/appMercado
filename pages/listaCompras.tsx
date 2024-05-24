import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Modal } from 'react-native';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import ESTILOS from '../styles/ESTILOS';
import { AddProdutoLista } from '../components/AddProdutoLista';
import { AvisoLimiteCusto } from '../components/AvisoLimiteCusto';
import { obterListaPorId } from '../hooks/bancoLista';
import EditarProdutoPRODUTO from '../components/modalsProdutoCategoria/editarProdutoPRODUTO';  // Importa o modal de edição de produto

interface RouteParams {
    listaId?: number;
}

export function ListaCompras({ }) {
    const route = useRoute();
    const { listaId } = route.params as RouteParams;

    const [lista, setLista] = useState(null);
    const [produtos, setProdutos] = useState([]);
    const [modalAddProdutoVisible, setModalAddProdutoVisible] = useState(false);
    const [modalEditarProdutoVisible, setModalEditarProdutoVisible] = useState(false);
    const [produtoSelecionado, setProdutoSelecionado] = useState(null);
    const [totalPreco, setTotalPreco] = useState(0);
    const [modalLimiteAlcancadoVisivel, setModalLimiteAlcancadoVisivel] = useState(false);

    useEffect(() => {
        if (listaId) {
            const fetchLista = async () => {
                const listaData = await obterListaPorId(listaId);
                setLista(listaData);
            };
            fetchLista();
        }
    }, [listaId]);

    useEffect(() => {
        const fetchProdutos = async () => {
            const produtosData = await AsyncStorage.getItem(`lista_${listaId}`);
            const produtos = produtosData ? JSON.parse(produtosData) : [];
            setProdutos(produtos);

            const totalPrecoCalculado = produtos.reduce((acc, produto) => acc + (produto.preco * produto.quantidade), 0);
            setTotalPreco(totalPrecoCalculado);
        };
        fetchProdutos();
    }, [listaId, modalAddProdutoVisible]);

    const atualizarProdutos = async (produtosAtualizados) => {
        await AsyncStorage.setItem(`lista_${listaId}`, JSON.stringify(produtosAtualizados));
        setProdutos(produtosAtualizados);

        const totalPrecoCalculado = produtosAtualizados.reduce((acc, produto) => acc + (produto.preco * produto.quantidade), 0);
        setTotalPreco(totalPrecoCalculado);
    };

    const handleRemoveProduto = async (produtoId) => {
        const produtosAtualizados = produtos.filter(produto => produto.id !== produtoId);
        await atualizarProdutos(produtosAtualizados);
    };

    const handleIncrementarQuantidade = async (produtoId) => {
        const produtosAtualizados = produtos.map(produto => {
            if (produto.id === produtoId) {
                return { ...produto, quantidade: produto.quantidade + 1 };
            }
            return produto;
        });
        await atualizarProdutos(produtosAtualizados);
    };

    const handleDecrementarQuantidade = async (produtoId) => {
        const produtosAtualizados = produtos.map(produto => {
            if (produto.id === produtoId && produto.quantidade > 1) {
                return { ...produto, quantidade: produto.quantidade - 1 };
            }
            return produto;
        }).filter(produto => produto.quantidade > 0);
        await atualizarProdutos(produtosAtualizados);
    };

    const abrirModalAddProduto = () => {
        setModalAddProdutoVisible(true);
    };

    const fecharModalAddProduto = () => {
        setModalAddProdutoVisible(false);
    };

    const abrirModalEditarProduto = (produto) => {
        setProdutoSelecionado(produto);
        setModalEditarProdutoVisible(true);
    };

    const fecharModalEditarProduto = () => {
        setModalEditarProdutoVisible(false);
        setProdutoSelecionado(null);
    };

    const atualizarProduto = async (produtoAtualizado) => {
        const produtosAtualizados = produtos.map(produto => 
            produto.id === produtoAtualizado.id ? { ...produto, ...produtoAtualizado } : produto
        );
        await atualizarProdutos(produtosAtualizados);
        fecharModalEditarProduto();
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
                style={ESTILOS.listaElementos}
                data={produtos}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => {
                    const precoTotalProduto = item.quantidade * item.preco;
                    return (
                        <View style={ESTILOS.listaItem}>
                            <View style={styles.listaTexto}>
                                <Text style={ESTILOS.listaItemTitulo}>{item.nome}</Text>
                                <Text style={styles.produtoQuantidade}>Quantidade: {item.quantidade}</Text>
                                <Text style={styles.produtoPreco}>Preço Unitário: R${item.preco.toFixed(2)}</Text>
                                <Text style={styles.produtoPrecoTotal}>Preço Total: R${precoTotalProduto.toFixed(2)}</Text>
                            </View>
                            <View style={styles.itemAcoes}>
                                <View style={styles.iconesDireita}>
                                    <TouchableOpacity onPress={() => handleIncrementarQuantidade(item.id)}>
                                        <Ionicons name="add-circle-outline" style={styles.adicionar} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => handleDecrementarQuantidade(item.id)}>
                                        <Ionicons name="remove-circle-outline" style={styles.remover} />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.iconesEsquerda}>
                                    <TouchableOpacity onPress={() => abrirModalEditarProduto(item)}>
                                        <Ionicons name="create-outline" style={styles.editar} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => handleRemoveProduto(item.id)}>
                                        <Ionicons name="trash-bin-outline" style={styles.lixo} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    );
                }}
            />

            <TouchableOpacity style={ESTILOS.btnDestaque} onPress={abrirModalAddProduto}>
                <Text style={ESTILOS.txtBtnDestaque}>Adicionar Produtos</Text>
                <Ionicons style={ESTILOS.btnDestaqueIcon} name="add-circle-outline" color="white" size={30}></Ionicons>
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

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalEditarProdutoVisible}
                onRequestClose={fecharModalEditarProduto}
            >
                <EditarProdutoPRODUTO
                    produto={produtoSelecionado}
                    fecharModal={fecharModalEditarProduto}
                    atualizarProdutos={atualizarProduto}
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
    listaProdutos: {
        paddingBottom: 100,
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 40,
        fontWeight: '700',
        marginBottom: 10,
        marginTop: '5%',
    },
    subtitle: {
        fontWeight: '600',
        marginVertical: 5,
        fontSize: 15,
        textAlign: 'center',
    },
    totalPreco: {
        fontSize: 18,
        fontWeight: '700',
        color: 'green',
        marginBottom: 20,
        textAlign: 'center',
    },
    totalPrecoLimite: {
        color: 'red',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '700',
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
    itemAcoes: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
    },
    iconesDireita: {
        flexDirection: 'column',
        alignItems: 'center',
        position: 'absolute',
        right: 10,
        top: '30%',
    },
    iconesEsquerda: {
        flexDirection: 'column',
        alignItems: 'center',
        position: 'absolute',
        left: 10,
        top: '30%',
    },
    adicionar: {
        color: 'green',
        fontSize: 40,
        marginVertical: 10,
    },
    remover: {
        color: 'red',
        fontSize: 40,
        marginVertical: 10,
    },
    editar: {
        color: 'blue',
        fontSize: 30,
        marginVertical: 10,
    },
    lixo: {
        color: 'red',
        fontSize: 30,
        marginVertical: 10,
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
    listaTexto: {
        flex: 1,
    },
});

export default ListaCompras;
