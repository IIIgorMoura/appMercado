import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import ESTILOS from "../styles/ESTILOS";
import estiloModal from "../styles/estiloModal";

export function AvisoLimiteCusto({ modalAvisoVisivel, aoContinuar, aoParar }) {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalAvisoVisivel}
            onRequestClose={aoParar}
        >
            <View style={estiloModal.container}>
                <View style={estiloModal.contentReduzido}>
                    <Text >Aviso: Limite de custo alcançado!</Text>
                    <Text >Deseja continuar adicionando produtos?</Text>
                    <View style={estiloModal.baseBtnsModalReduzido}>
                        <TouchableOpacity
                            style={estiloModal.btnVoltar}
                            onPress={aoContinuar}
                        >
                            <Text style={ESTILOS.txtRoxo}>Continuar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={estiloModal.btnProximo}
                            onPress={aoParar}
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