// import React, { useState, useEffect } from "react";
// import { StyleSheet, Text, TouchableOpacity, View, TextInput, Modal } from "react-native";
// import { StatusBar } from "expo-status-bar";
// import * as Animatable from "react-native-animatable";
// import ESTILOS from "../styles/ESTILOS";
// import estiloModal from "../styles/estiloModal";
// import { criarTabela, adicionarListaCompras } from "../hooks/bancoLista";

// export function CriarLista({ fecharModalCriarLista, setListasCompras }) {
//   const [nomeLista, setNomeLista] = useState('');
//   const [limiteValor, setLimiteValor] = useState('');

//   useEffect(() => {
//     criarTabela();
//   }, []);

//   const salvarNovaLista = () => {
//     adicionarListaCompras(nomeLista, parseFloat(limiteValor), (insertId) => {
//       console.log('Nova lista criada com ID: ', insertId);
//       // Atualizar a lista de compras após a inserção
//       setListasCompras((prevListas) => [
//         ...prevListas,
//         { id: insertId, nomeLista, limiteValor: parseFloat(limiteValor) }
//       ]);
//       // Fechar o modal
//       fecharModalCriarLista();
//     });
//   };

//   return (
//     <View style={estiloModal.container}>
//       <Animatable.View style={estiloModal.content}>
//         <Text>Criar Nova Lista</Text>
//         <View style={estiloModal.formInput}>
//           <Text style={estiloModal.formInputText}>Nome da Lista</Text>
//           <TextInput
//             placeholder="Insira o nome da lista..."
//             placeholderTextColor="gray"
//             style={estiloModal.input}
//             value={nomeLista}
//             onChangeText={setNomeLista}
//           />
//         </View>
//         <View style={estiloModal.formInput}>
//           <Text style={estiloModal.formInputText}>Limite de Custo</Text>
//           <TextInput
//             placeholder="Insira o valor limite..."
//             placeholderTextColor="gray"
//             style={estiloModal.input}
//             value={limiteValor}
//             onChangeText={setLimiteValor}
//             keyboardType="numeric"
//           />
//         </View>
//         <View style={estiloModal.baseBtnsModal}>
//           <TouchableOpacity style={estiloModal.btnVoltar} onPress={fecharModalCriarLista}>
//             <Text style={ESTILOS.txtRoxo}>Cancelar</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={estiloModal.btnProximo} onPress={salvarNovaLista}>
//             <Text style={ESTILOS.txtBranco}>Continuar</Text>
//           </TouchableOpacity>
//         </View>
//       </Animatable.View>
//       <StatusBar style="light" />
//     </View>
//   );
// }

// const estiloModalEspecifico = StyleSheet.create({});

// export default CriarLista;

import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Modal } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as Animatable from "react-native-animatable";
import ESTILOS from "../styles/ESTILOS";
import estiloModal from "../styles/estiloModal";
import { adicionarListaCompras } from "../hooks/bancoLista";
import DropdownMenuLISTA from "../hooks/dropdownMenuLISTA";

export function CriarLista({ fecharModalCriarLista, handleAdicionarLista }) {
  const [nomeLista, setNomeLista] = useState('');
  const [limiteValor, setLimiteValor] = useState('');

  const salvarNovaLista = async () => {
    // Verificar se os campos estão preenchidos antes de salvar a lista
    if (!nomeLista || !limiteValor) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    try {
      // Chamar a função handleAdicionarLista passando os parâmetros necessários
      await handleAdicionarLista(nomeLista, parseFloat(limiteValor));
      fecharModalCriarLista(); // Fechar o modal após adicionar a lista
    } catch (error) {
      console.error('Erro ao adicionar nova lista de compras: ', error);
    }
  };
  
  return (
    <View style={estiloModal.container}>
      <Animatable.View style={estiloModal.content}>
        <Text>Criar Nova Lista</Text>
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

        <View style={estiloModal.baseBtnsModal}>
          <TouchableOpacity style={estiloModal.btnVoltar} onPress={fecharModalCriarLista}>
            <Text style={ESTILOS.txtRoxo}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={estiloModal.btnProximo} onPress={salvarNovaLista}>
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