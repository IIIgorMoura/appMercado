import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import ESTILOS from "../styles/ESTILOS";
import estiloModal from "../styles/estiloModal";
import { Ionicons } from "@expo/vector-icons";

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
                    <Ionicons name="warning-outline" style={estiloModal.perigoIcon}></Ionicons>
                    <Text style={estiloModal.tituloModal}>ALERTA</Text>

                    <View style={estiloModal.txtModalReduzido}>
                        <Text >Limite de custo alcançado!</Text>
                        <Text>Deseja continuar adicionando produtos?</Text>
                    </View>

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