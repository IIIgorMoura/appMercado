import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput, Modal, } from 'react-native';

import * as Animatable from 'react-native-animatable';

import { useState } from "react";

import ESTILOS from '../styles/ESTILOS';
import estiloModal from '../styles/estiloModal';
import DropdownMenu from '../hooks/dropdownMenu';

import { AddProdutoLista } from './AddProdutoLista';

export function CriarLista({ fecharModalCriarLista }) {
    const [novaLista, setNovaLista] = useState('');
    const [ativoModalListaAdicionarProdutos, setModalListaAdicionarProdutos] = useState(false);

    const [nomeLista, setNomeLista] = useState('');
    const [limiteValor, setLimiteValor] = useState('');

    const handleAdicionar = () => {
        // onAdicionarNovaLista(novaLista);
        setNovaLista('');
    };

    const salvarNovaLista = () => {
        setModalListaAdicionarProdutos(true);
    }

    return (
        <View style={estiloModal.container}>

            <Animatable.View delay={600} animation='fadeOutUp' style={estiloModal.content}>

                <Text>Criar Nova Lista</Text>

                <View style={estiloModal.formInput}>
                    <Text style={estiloModal.formInputText}>Nome da Lista</Text>
                    <TextInput
                        placeholder='Insira o nome da lista...'
                        placeholderTextColor='gray'
                        style={estiloModal.input}
                        value={nomeLista}
                        onChangeText={setNomeLista}
                    />
                </View>


                <View style={estiloModal.formInput}>
                    <Text style={estiloModal.formInputText}>Limite de Custo</Text>
                    <TextInput
                        placeholder='Insira o valor limite...'
                        placeholderTextColor='gray'
                        style={estiloModal.input}
                        value={limiteValor}
                        onChangeText={setLimiteValor}
                        keyboardType='numeric'
                    />
                </View>

                <DropdownMenu />

                <View style={estiloModal.baseBtnsModal}>
                    <TouchableOpacity style={estiloModal.btnVoltar} onPress={fecharModalCriarLista}>
                        <Text style={ESTILOS.txtRoxo}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={estiloModal.btnProximo} onPress={salvarNovaLista}>
                        <Text style={ESTILOS.txtBranco}>Continuar</Text>
                    </TouchableOpacity>
                </View>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={ativoModalListaAdicionarProdutos}
                    style={ESTILOS.modal}>
                    <AddProdutoLista fecharModalListaAdicionarProdutos={() => setModalListaAdicionarProdutos(false)}/>
                </Modal>

            </Animatable.View>

            <StatusBar style="light" />
        </View>
    );
}

const estiloModalEspecifico = StyleSheet.create({
});

export default CriarLista