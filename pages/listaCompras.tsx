import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, Modal } from 'react-native';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import ESTILOS from '../styles/ESTILOS';
import { AddProdutoLista } from '../components/AddProdutoLista';
import { AvisoLimiteCusto } from '../components/AvisoLimiteCusto';
import { obterListaPorId } from '../hooks/bancoLista';

const icones = {
    vegetais: require('../assets/icons/produtoVegetal.png'),
    carnes: require('../assets/icons/produtoCarne.png'),
    padaria: require('../assets/icons/produtoPadaria.png'),
    frutas: require('../assets/icons/produtoFruta.png'),
    limpeza: require('../assets/icons/produtoLimpeza.png'),
    outros: require('../assets/icons/produtoOutros.png'),
};

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
            <FlatList
                style={styles.listaElementos}
                data={produtos}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => {
                    const precoTotalProduto = item.quantidade * item.preco;
                    const iconeProduto = icones[item.tipo];

                    return (
                        <View style={styles.listaItem}>
                            <View style={styles.baseIconeProduto}>
                                <Image source={iconeProduto} style={styles.iconeProduto} />
                            </View>

                            <View>
                                <Text style={styles.listaItemTitulo}>{item.nome}</Text>
                                <Text style={styles.produtoPreco}>Preço Unitário: R${item.preco.toFixed(2)}</Text>
                                <Text style={styles.produtoPrecoTotal}>Preço Total: R${precoTotalProduto.toFixed(2)}</Text>
                            </View>
                            <View style={styles.itemAcoes}>
                                <View style={styles.quantidadeContainer}>
                                    <TouchableOpacity onPress={() => handleIncrementarQuantidade(item.id)}>
                                        <Ionicons name="add-circle-outline" style={styles.adicionar} />
                                    </TouchableOpacity>
                                    <Text style={styles.produtoQuantidade}>{item.quantidade}</Text>
                                    <TouchableOpacity onPress={() => handleDecrementarQuantidade(item.id)}>
                                        <Ionicons name="remove-circle-outline" style={styles.remover} />
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity onPress={() => handleRemoveProduto(item.id)}>
                                    <Ionicons name="trash-bin-outline" style={styles.lixo} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    );
                }}
            />

            <View style={styles.footer}>
                <View>
                    <Text style={styles.title}>{lista.nomeLista}</Text>
                    <Text style={styles.subtitle}>Limite de Custo: R${lista.limite.toFixed(2)}</Text>
                    <Text style={[styles.totalPreco, totalPreco >= lista.limite ? styles.totalPrecoLimite : {}]}>
                        Total da Lista: R${totalPreco.toFixed(2)}
                    </Text>
                </View>

                <TouchableOpacity style={ESTILOS.btnDestaque} onPress={abrirModalAddProduto}>
                    <Text style={ESTILOS.txtBtnDestaque}>Adicionar Produtos</Text>
                    <Ionicons style={ESTILOS.btnDestaqueIcon} name="add-circle-outline" color="white" size={30}></Ionicons>
                </TouchableOpacity>
            </View>

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
    baseIconeProduto: {
        height: 75,
        justifyContent: 'center',
    },
    iconeProduto: {
        width: 50,
        height: 50,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        marginBottom: 10,
    },
    subtitle: {
        fontWeight: '600',
        marginBottom: 0,
        fontSize: 16,
        textAlign: 'center',
    },
    totalPreco: {
        fontSize: 18,
        fontWeight: '700',
        color: 'green',
        textAlign: 'center',
        marginTop: 10,
    },
    totalPrecoLimite: {
        color: 'red',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '700',
        marginTop: 10,
    },
    produtoQuantidade: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    produtoPreco: {
        fontSize: 15,
        color: 'gray',
        marginBottom: 3,
    },
    produtoPrecoTotal: {
        fontSize: 15,
        color: '#6622F6',
    },
    itemAcoes: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight:-10,
    },
    quantidadeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: '-55%',
        marginRight:5,
        
    },
    adicionar: {
        color: 'green',
        fontSize: 30,
        marginRight: 15,
    },
    remover: {
        color: 'red',
        fontSize: 30,
        marginLeft: 15,
    },
    lixo: {
        color: 'red',
        fontSize: 30,
        position: 'absolute',
        right: 5,
        marginTop:10,
    },
    
    listaItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#f9f9f9',
        padding: 15,
        marginTop: 10,
        borderRadius: 25,
        width: '95%',
        left: 10,

    },
    footer: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingVertical: 10,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderTopWidth: 2,
        borderTopColor: '#6622F6',
    },


    listaElementos: {
        flex: 1,
        marginBottom: 205,
    },
    listaItemTitulo: {
        fontSize: 20,
        fontWeight: '700',
    },
});


export default ListaCompras;
