import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, TextInput } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as Animatable from "react-native-animatable";
import ESTILOS from "../styles/ESTILOS";
import estiloModal from "../styles/estiloModal";
import DropdownMenuPRODUTO from "../hooks/dropdownMenuPRODUTO";
import { adicionarProduto } from "../hooks/bancoProduto";

import { useNavigation } from "@react-navigation/native";

export function NovoProduto({ fecharModalNovoProduto }) {
  const navigation = useNavigation();

  const [nomeProduto, setNomeProduto] = useState('');
  const [precoProduto, setPrecoProduto] = useState('');
  const [tipoProduto, setTipoProduto] = useState('');

  const salvarNovoProduto = async () => {
    try {
      const novoProduto = {
        nome: nomeProduto,
        preco: parseFloat(precoProduto),
        tipo: tipoProduto
      };
      await adicionarProduto(novoProduto);
      fecharModalNovoProduto();
    } catch (error) {
      console.error('Erro ao adicionar novo produto: ', error);
    }
  };

  return (
    <View style={estiloModal.container}>
      <Animatable.View style={estiloModal.content}>
      <Text style={estiloModal.tituloModal}>Criar Novo Produto</Text>
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

        <DropdownMenuPRODUTO onSelect={setTipoProduto} />

        <View style={estiloModal.baseBtnsModal}>
          <TouchableOpacity style={estiloModal.btnVoltar} onPress={fecharModalNovoProduto}>
            <Text style={ESTILOS.txtRoxo}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={estiloModal.btnProximo} onPress={salvarNovoProduto}>
            <Text style={ESTILOS.txtBranco}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
      <StatusBar style="light" />
    </View>
  );
}