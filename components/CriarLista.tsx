import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput } from 'react-native';

import { useState } from "react";

import ESTILOS from '../styles/ESTILOS';
import estiloModal from '../styles/estiloModal';

export function CriarLista({ fecharModalCriarLista }) {
    const [novaLista, setNovaLista] = useState('');

    const [nomeLista, setNomeLista] = useState('');
    const [limiteValor, setLimiteValor] = useState('');

    const handleAdicionar = () => {
        onAdicionarNovaLista(novaLista);
        setNovaLista('');
    };

    return (
        <View style={estiloModal.container}>

            <View style={estiloModal.content}>

                <Text>Criar Nova Lista</Text>

                <View style={estiloModal.formInput}>
                    <Text>Nome da Lista</Text>
                    <TextInput
                        placeholder='Insira o nome da lista...'
                        placeholderTextColor='gray'
                        style={estiloModal.input}
                        value={nomeLista}
                        onChangeText={setNomeLista}
                    />
                </View>


                <View style={estiloModal.formInput}>
                    <Text>Limite de Custo</Text>
                    <TextInput
                        placeholder='Insira o valor limite...'
                        placeholderTextColor='gray'
                        style={estiloModal.input}
                        value={limiteValor}
                        onChangeText={setLimiteValor}
                        keyboardType='numeric'
                    />
                </View>


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

export default CriarLista