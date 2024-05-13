import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View, Image, Modal } from 'react-native';

import { useState } from "react";

import ESTILOS from '../styles/ESTILOS';
import estiloModal from '../styles/estiloModal';

import { EditarProduto } from './EditarProduto';

export function NovoProduto({ fecharModalNovoProduto }) {
    const navigation = useNavigation();

    const [ativoModalEditarProduto, setModalEditarProduto] = useState(false);

    const abrirModalEditarProduto = () => {
        setModalEditarProduto(true);
    };

    const fecharModalEditarProduto = () => {
        setModalEditarProduto(false);
    };

    return (
        <View style={estiloModal.container}>

            <View style={estiloModal.content}>

                <Text>Adicionar Novo Produto</Text>

                <View style={estiloModal.baseBtnsModal}>
                    <TouchableOpacity style={estiloModal.btnVoltar} onPress={fecharModalNovoProduto}>
                        <Text style={ESTILOS.txtRoxo}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={estiloModal.btnProximo}>
                        <Text style={ESTILOS.txtBranco}>Continuar</Text>
                    </TouchableOpacity>
                </View>

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={ativoModalEditarProduto}
                    style={ESTILOS.modal}
                >
                    <EditarProduto fecharModalEditarProduto={() => setModalEditarProduto(false)} />
                </Modal>

            </View>

            <StatusBar style="light" />
        </View>
    );
}

const estiloModalEspecifico = StyleSheet.create({

});

export default NovoProduto