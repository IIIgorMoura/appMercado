import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, Image } from 'react-native';
import { obterProdutos, removerProduto, atualizarProduto } from '../../hooks/bancoProduto';
import { Ionicons } from '@expo/vector-icons';
import ESTILOS from '../../styles/ESTILOS';
import EditarProdutoPRODUTO from '../../components/modalsProdutoCategoria/editarProdutoPRODUTO';

const icones = {
    vegetais: require('../../assets/icons/produtoVegetal.png'),
    carnes: require('../../assets/icons/produtoCarne.png'),
    padaria: require('../../assets/icons/produtoPadaria.png'),
    frutas: require('../../assets/icons/produtoFruta.png'),
    limpeza: require('../../assets/icons/produtoLimpeza.png'),
    outros: require('../../assets/icons/produtoOutros.png'),
};

export function Outros() {
    const [produtos, setProdutos] = useState([]);
    const [produtoSelecionado, setProdutoSelecionado] = useState(null);
    const [modalVisivel, setModalVisivel] = useState(false);

    const carregarProdutos = async () => {
        try {
            const todosProdutos = await obterProdutos();
            const produtosOutros = todosProdutos.filter(produto => produto.tipo === 'outros');
            setProdutos(produtosOutros);
        } catch (error) {
            console.error('Erro ao carregar produtos: ', error);
        }
    };

    useEffect(() => {
        carregarProdutos();
    }, []);

    const abrirModalEditar = (produto) => {
        setProdutoSelecionado(produto);
        setModalVisivel(true);
    };

    const handleRemoveProduto = async (id) => {
        try {
            await removerProduto(id);
            carregarProdutos();
        } catch (error) {
            console.error('Erro ao remover produto: ', error);
        }
    };

    const handleAtualizarProduto = async (produtoAtualizado) => {
        try {
            await atualizarProduto(produtoAtualizado.id, produtoAtualizado);
            await carregarProdutos(); // Atualize a lista após a edição do produto
            setModalVisivel(false); // Feche o modal após a edição do produto
        } catch (error) {
            console.error('Erro ao atualizar produto: ', error);
        }
    };

    const renderItem = ({ item }) => {
        const iconeProduto = icones[item.tipo] || icones.outros;

        return (
            <View style={styles.item}>
                <Image source={iconeProduto} style={styles.iconeProduto} />
                <View style={styles.itemTexto}>
                    <Text style={styles.title}>{item.nome}</Text>
                    <Text style={styles.subTitle}>{`Preço: R$ ${item.preco.toFixed(2)}`}</Text>
                </View>
                <View style={styles.iconesContainer}>
                <TouchableOpacity onPress={() => abrirModalEditar(item)}>
                        <Ionicons name="create-outline" style={styles.edit} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleRemoveProduto(item.id)}>
                        <Ionicons name="trash-bin-outline" style={styles.lixo} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
        <View style={ESTILOS.container}>
            <FlatList
                style={ESTILOS.listaElementos}
                data={produtos}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisivel}
                onRequestClose={() => {
                    setModalVisivel(false);
                }}
            >
                <EditarProdutoPRODUTO
                    produto={produtoSelecionado}
                    fecharModal={() => setModalVisivel(false)}
                    atualizarProdutos={handleAtualizarProduto} // Passa a função handleAtualizarProduto
                />
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#fff',
        padding: 20,
        width: 370,
        height: 120,
        marginVertical: '3%',
        borderRadius: 25,
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconeProduto: {
        width: 50,
        height: 50,
        marginRight: 20,
    },
    itemTexto: {
        flex: 1,
        marginLeft: 25,
    },
    title: {
        fontSize: 20,
        fontWeight: '800',
    },
    subTitle: {
        marginTop: 10,
        color: '#9868FF',
        fontWeight: '400',
        fontSize: 20,
    },
    iconesContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        marginLeft: 20,
    },
    lixo: {
        color: 'red',
        fontSize: 30,
      
    },
    edit: {
        color: 'blue',
        fontSize: 30,
        marginBottom: 25,
    }
});
export default Outros;