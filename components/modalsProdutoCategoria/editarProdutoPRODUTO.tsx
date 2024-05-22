import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import ESTILOS from '../../styles/ESTILOS';
import estiloModal from '../../styles/estiloModal';
import { atualizarProduto } from '../../hooks/bancoProduto';

export function EditarProdutoPRODUTO({ produto, fecharModal, atualizarProdutos }) {
    const [nomeProduto, setNomeProduto] = useState(produto.nome);
    const [precoProduto, setPrecoProduto] = useState(produto.preco.toString());

    const handleSalvar = async () => {
        try {
            const produtoAtualizado = {
                ...produto,
                nome: nomeProduto,
                preco: parseFloat(precoProduto),
            };
            await atualizarProduto(produto.id, produtoAtualizado);
            await atualizarProdutos(produtoAtualizado); 
            fecharModal(); 
        } catch (error) {
            console.error('Erro ao atualizar produto: ', error);
        }
    };

    return (
        <View style={estiloModal.container}>
            <View style={estiloModal.content}>
                <Text>Editar Produto</Text>
                <View style={estiloModal.formInput}>
                    <Text style={estiloModal.formInputText}>Nome do Produto</Text>
                    <TextInput
                        placeholder="Insira o nome do produto..."
                        placeholderTextColor="gray"
                        style={estiloModal.input}
                        value={nomeProduto}
                        onChangeText={setNomeProduto}
                    />
                </View>
                <View style={estiloModal.formInput}>
                    <Text style={estiloModal.formInputText}>Preço do Produto</Text>
                    <TextInput
                        placeholder="Insira o preço do produto..."
                        placeholderTextColor="gray"
                        style={estiloModal.input}
                        value={precoProduto}
                        onChangeText={setPrecoProduto}
                        keyboardType="numeric"
                    />
                </View>
                <View style={estiloModal.baseBtnsModal}>
                    <TouchableOpacity style={estiloModal.btnVoltar} onPress={fecharModal}>
                        <Text style={ESTILOS.txtRoxo}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={estiloModal.btnProximo} onPress={handleSalvar}>
                        <Text style={ESTILOS.txtBranco}>Salvar</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <StatusBar style="light" />
        </View>
    );
}

const estiloModalEspecifico = StyleSheet.create({});

export default EditarProdutoPRODUTO;