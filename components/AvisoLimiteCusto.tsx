import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import ESTILOS from "../styles/ESTILOS";
import estiloModal from "../styles/estiloModal";

export function AvisoLimiteCusto({ visible, onContinue, onStop }) {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onStop}
        >
            <View style={estiloModal.container}>
                <View style={estiloModal.contentReduzido}>
                    <Text >Aviso: Limite de custo alcançado!</Text>
                    <Text >Deseja continuar adicionando produtos?</Text>
                    <View style={estiloModal.baseBtnsModalReduzido}>
                        <TouchableOpacity
                            style={estiloModal.btnVoltar}
                            onPress={onContinue}
                        >
                            <Text style={ESTILOS.txtRoxo}>Continuar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={estiloModal.btnProximo}
                            onPress={onStop}
                        >
                            <Text style={ESTILOS.txtBranco}>Parar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
});