import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';

import * as Animatable from 'react-native-animatable';

import { useState } from "react";

import ESTILOS from '../styles/ESTILOS';
import estiloModal from '../styles/estiloModal';

export function AddProdutoLista({ fecharModalListaAdicionarProdutos }) {

    return (
        <View style={estiloModalEspecifico.container}>

            <View style={estiloModal.content}>

                <Text>Adicionar Produtos à Lista</Text>

                <View style={estiloModal.baseBtnsModal}>
                    <TouchableOpacity style={estiloModal.btnVoltar} onPress={fecharModalListaAdicionarProdutos}>
                        <Text style={ESTILOS.txtRoxo}>Voltar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={estiloModal.btnProximo}>
                        <Text style={ESTILOS.txtBranco}>Continuar</Text>
                    </TouchableOpacity>
                </View>

            </View>

            <StatusBar style="light" />
        </View>
    );
}

const estiloModalEspecifico = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'none',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default AddProdutoLista