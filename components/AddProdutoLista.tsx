import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Image, Modal } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ESTILOS from "../styles/ESTILOS";
import estiloModal from "../styles/estiloModal";

import { AddVegetais } from "./modalsProdutoCategoria/addVegetais";
import { AddCarnes } from "./modalsProdutoCategoria/addCarnes";
import { AddPadaria } from "./modalsProdutoCategoria/addPadaria";
import { AddFrutas } from "./modalsProdutoCategoria/addFrutas";
import { AddLimpeza } from "./modalsProdutoCategoria/addLimpeza";
import { AddOutros } from "./modalsProdutoCategoria/addOutros";

import { AvisoLimiteCusto } from "./AvisoLimiteCusto";
import { VerificarLimiteCustoLISTA } from '../hooks/verificarLimiteCustoLISTA';

export function AddProdutoLista({ fecharModalAddProduto, listaId, limite, totalPreco, setModalLimiteAlcancadoVisivel }) {
    const [produtos, setProdutos] = useState([]);
    const [modalCategoria, setModalCategoria] = useState(null);
    const [modalAvisoVisivel, setModalAvisoVisivel] = useState(false);

    const { totalPreco: precoAtualizado, limiteAlcancado } = VerificarLimiteCustoLISTA(produtos, limite);

    useEffect(() => {
        if (limiteAlcancado) {
            setModalAvisoVisivel(true);
        }
    }, [limiteAlcancado]);

    const abrirModalCategoria = (categoria) => {
        setModalCategoria(categoria);
    };

    const fecharModalCategoria = () => {
        setModalCategoria(null);
    };

    const adicionarProdutos = async (produtosSelecionados) => {
        try {
            const produtosExistentes = await AsyncStorage.getItem(`lista_${listaId}`);
            const listaProdutos = produtosExistentes ? JSON.parse(produtosExistentes) : [];
            produtosSelecionados.forEach(produtoSelecionado => {
                const produtoExistente = listaProdutos.find(prod => prod.nome === produtoSelecionado.nome);
                if (produtoExistente) {
                    produtoExistente.quantidade += produtoSelecionado.quantidade;
                } else {
                    listaProdutos.push({
                        ...produtoSelecionado,
                        id: Date.now() + Math.random()
                    });
                }
            });
            await AsyncStorage.setItem(`lista_${listaId}`, JSON.stringify(listaProdutos));

            const produtosAtualizados = await AsyncStorage.getItem(`lista_${listaId}`);
            setProdutos(produtosAtualizados ? JSON.parse(produtosAtualizados) : []);

            fecharModalCategoria();
        } catch (error) {
            console.error('Erro ao salvar produtos na lista: ', error);
        }
    };

    const concluirAdicao = () => {
        fecharModalAddProduto();
    };

    const renderModalCategoria = () => {
        switch (modalCategoria) {
            case 'Vegetais':
                return <AddVegetais fecharModalCategoria={fecharModalCategoria} adicionarProdutos={adicionarProdutos} />;
            case 'Carnes':
                return <AddCarnes fecharModalCategoria={fecharModalCategoria} adicionarProdutos={adicionarProdutos} />;
            case 'Padaria':
                return <AddPadaria fecharModalCategoria={fecharModalCategoria} adicionarProdutos={adicionarProdutos} />;
            case 'Frutas':
                return <AddFrutas fecharModalCategoria={fecharModalCategoria} adicionarProdutos={adicionarProdutos} />;
            case 'Limpeza':
                return <AddLimpeza fecharModalCategoria={fecharModalCategoria} adicionarProdutos={adicionarProdutos} />;
            case 'Outros':
                return <AddOutros fecharModalCategoria={fecharModalCategoria} adicionarProdutos={adicionarProdutos} />;
            default:
                return null;
        }
    };

    return (
        <View style={estiloModal.container}>
            <View style={[estiloModal.content, styles.content]}>
                <Text style={styles.titulo}>Selecione a Categoria do Produto</Text>
                <ScrollView style={ESTILOS.listaElementos} showsVerticalScrollIndicator={false}>
                    <TouchableOpacity style={styles.categoriaProdutos} onPress={() => abrirModalCategoria('Vegetais')}>
                        <Image style={styles.imgProdutos} source={require('../assets/images/categoriasProdutos/produtosVegetais.png')} />
                        <Text style={styles.txtCategoriaProdutos}>Vegetais</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.categoriaProdutos} onPress={() => abrirModalCategoria('Carnes')}>
                        <Image style={styles.imgProdutos} source={require('../assets/images/categoriasProdutos/produtosCarnes.png')} />
                        <Text style={styles.txtCategoriaProdutos}>Carnes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.categoriaProdutos} onPress={() => abrirModalCategoria('Padaria')}>
                        <Image style={styles.imgProdutos} source={require('../assets/images/categoriasProdutos/produtosPadaria.png')} />
                        <Text style={styles.txtCategoriaProdutos}>Padaria</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.categoriaProdutos} onPress={() => abrirModalCategoria('Frutas')}>
                        <Image style={styles.imgProdutos} source={require('../assets/images/categoriasProdutos/produtosFrutas.png')} />
                        <Text style={styles.txtCategoriaProdutos}>Frutas</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.categoriaProdutos} onPress={() => abrirModalCategoria('Limpeza')}>
                        <Image style={styles.imgProdutos} source={require('../assets/images/categoriasProdutos/produtosLimpeza.png')} />
                        <Text style={styles.txtCategoriaProdutos}>Limpeza</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.categoriaProdutos} onPress={() => abrirModalCategoria('Outros')}>
                        <Image style={styles.imgProdutos} source={require('../assets/images/categoriasProdutos/produtosOutros.png')} />
                        <Text style={styles.txtCategoriaProdutos}>Outros</Text>
                    </TouchableOpacity>
                </ScrollView>
                <View style={estiloModal.baseBtnsModal}>
                    <TouchableOpacity style={estiloModal.btnVoltar} onPress={fecharModalAddProduto}>
                        <Text style={ESTILOS.txtRoxo}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={estiloModal.btnProximo} onPress={concluirAdicao}>
                        <Text style={ESTILOS.txtBranco}>Concluir</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={!!modalCategoria}
                onRequestClose={fecharModalCategoria}
            >
                <View style={styles.modalCategoria}>
                    {renderModalCategoria()}
                </View>
            </Modal>
            <AvisoLimiteCusto
                modalAvisoVisivel={modalAvisoVisivel}
                aoContinuar={() => setModalAvisoVisivel(false)}
                aoParar={() => {
                    setModalAvisoVisivel(false);
                    fecharModalAddProduto();
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    categoriaProdutos: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        padding: 10,
    },
    imgProdutos: {
        width: 60,
        height: 60,
        marginRight: 10,
        borderRadius: 5,
    },
    txtCategoriaProdutos: {
        fontSize: 18,
        fontWeight: '600',
    },
    modalCategoria: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    content: {
        backgroundColor: "#fff",
        width: "90%",
        height: 600,
        paddingTop: 20,
        paddingBottom: 20,
    
        borderRadius: 25,
    },
    titulo: {
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 20,
    }
});
