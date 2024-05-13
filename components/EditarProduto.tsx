import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';

import { useState } from "react";

import ESTILOS from '../styles/ESTILOS';
import estiloModal from '../styles/estiloModal';

export function EditarProduto({ fecharModalCriarLista }) {

    return (
        <View style={estiloModal.container}>

            <View style={estiloModal.content}>

                <Text>Editar Produto</Text>

                <View style={estiloModal.baseBtnsModal}>
                    <TouchableOpacity style={estiloModal.btnVoltar} onPress={fecharModalCriarLista}>
                        <Text style={ESTILOS.txtRoxo}>Cancelar</Text>
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

});

export default EditarProduto