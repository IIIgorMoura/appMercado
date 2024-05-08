import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';

import { useState } from "react";

import ESTILOS from '../styles/ESTILOS';

export function CriarLista({ fecharModalCriarLista }) {

    return (
        <View style={estiloModal.container}>

            <View style={estiloModal.content}>
                <TouchableOpacity style={ESTILOS.btnDestaque} onPress={fecharModalCriarLista}>
                    <Text style={ESTILOS.txtBranco}>Cancelar</Text>
                </TouchableOpacity>
            </View>




            <StatusBar style="light" />
        </View>
    );
}

const estiloModal = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(25,25,25,0.6)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        backgroundColor: "#fff",
        width: "85%",
        height: "85%",
        paddingTop: 10,
        paddingBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
});

export default CriarLista