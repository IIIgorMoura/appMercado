import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import ESTILOS from "../styles/ESTILOS";
import estiloModal from "../styles/estiloModal";

export const AvisoLimiteCusto = ({ modalAvisoVisivel, aoContinuar, aoParar }) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalAvisoVisivel}
            onRequestClose={aoParar}
        >
            <View style={estiloModal.container}>
                <View style={estiloModal.contentReduzido}>
                    <Text>Limite de custo atingido!</Text>
                    <Text>Deseja continuar adicionando produtos?</Text>
                    <View style={estiloModal.baseBtnsModalReduzido}>
                        <TouchableOpacity style={estiloModal.btnVoltar} onPress={aoParar}>
                            <Text style={ESTILOS.txtRoxo}>Parar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={estiloModal.btnProximo} onPress={aoContinuar}>
                            <Text style={ESTILOS.txtBranco}>Continuar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}