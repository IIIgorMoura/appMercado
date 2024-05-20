import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { obterListaPorId, obterProdutosPorListaId } from '../hooks/bancoLista';
import ESTILOS from '../styles/ESTILOS';

interface RouteParams {
    listaId?: number;
}

export function ListaCompras({ navigation }) {
    const route = useRoute();
    const { listaId } = route.params as RouteParams;

    const [lista, setLista] = useState(null);
    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        if (listaId) {
            const carregarDados = async () => {
                try {
                    const lista = await obterListaPorId(listaId);
                    setLista(lista);
                    const produtos = await obterProdutosPorListaId(listaId);
                    setProdutos(produtos);
                } catch (error) {
                    console.error('Erro ao carregar os dados: ', error);
                }
            };

            carregarDados();
        }
    }, [listaId]);

    if (!listaId) {
        return (
            <View style={styles.container}>
                <Text>ID da lista não Encontrado.</Text>
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
                <Text style={styles.subtitle}>Tipo de Compra: {lista.tipoCompra}</Text>
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
    btnVoltar: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#007bff',
        alignItems: 'center',
        borderRadius: 5,
    },
    btnVoltarText: {
        color: '#fff',
        fontSize: 18,
    },
});

export default ListaCompras;