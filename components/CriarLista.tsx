import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Modal } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as Animatable from "react-native-animatable";
import ESTILOS from "../styles/ESTILOS";
import estiloModal from "../styles/estiloModal";
import DropdownMenuLISTA from "../hooks/dropdownMenuLISTA";
import { AddProdutoLista } from "./AddProdutoLista";
import { useNavigation } from "@react-navigation/native";

export function CriarLista({ fecharModalCriarLista, handleAdicionarLista, navegarParaListaCompras }) {
  const navigation = useNavigation();
  const [nomeLista, setNomeLista] = useState('');
  const [limiteValor, setLimiteValor] = useState('');
  const [tipoCompra, setTipoCompra] = useState('');
  const [modalAddProduto, setModalAddProduto] = useState(false);
  const [listaId, setListaId] = useState(null);

  const salvarNovaLista = async () => {
    if (!nomeLista || !limiteValor || !tipoCompra) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    try {
      const id = await handleAdicionarLista(nomeLista, parseFloat(limiteValor), tipoCompra);
      setListaId(id);
      return id;
    } catch (error) {
      console.error('Erro ao adicionar nova lista de compras: ', error);
    }
  };

  const continuar = async () => {
    const id = await salvarNovaLista();
    if (id) {
      fecharModalCriarLista();
      navegarParaListaCompras(id);
    }
  };

  return (
    <View style={estiloModal.container}>
      <Animatable.View style={estiloModal.content}>
      <Text style={estiloModal.tituloModal}>Criar Nova Lista</Text>
        <View style={estiloModal.formInput}>
          <Text style={estiloModal.formInputText}>Nome da Lista</Text>
          <TextInput
            placeholder="Insira o nome da lista..."
            placeholderTextColor="gray"
            style={estiloModal.input}
            value={nomeLista}
            onChangeText={setNomeLista}
          />
        </View>
        <View style={estiloModal.formInput}>
          <Text style={estiloModal.formInputText}>Limite de Custo</Text>
          <TextInput
            placeholder="Insira o valor limite..."
            placeholderTextColor="gray"
            style={estiloModal.input}
            value={limiteValor}
            onChangeText={setLimiteValor}
            keyboardType="numeric"
          />
        </View>

        <DropdownMenuLISTA onSelect={setTipoCompra} />

        <View style={estiloModal.baseBtnsModal}>
          <TouchableOpacity style={estiloModal.btnVoltar} onPress={fecharModalCriarLista}>
            <Text style={ESTILOS.txtRoxo}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={estiloModal.btnProximo} onPress={continuar}>
            <Text style={ESTILOS.txtBranco}>Continuar</Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
      <StatusBar style="light" />
    </View>
  );
}

const estiloModalEspecifico = StyleSheet.create({});

export default CriarLista;