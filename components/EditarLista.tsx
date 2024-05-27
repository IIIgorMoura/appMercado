// import React, { useState, useEffect } from "react";
// import { StyleSheet, Text, TouchableOpacity, View, TextInput, Modal } from "react-native";
// import { StatusBar } from "expo-status-bar";
// import * as Animatable from "react-native-animatable";
// import ESTILOS from "../styles/ESTILOS";
// import estiloModal from "../styles/estiloModal";
// import DropdownMenuLISTA from "../hooks/dropdownMenuLISTA";

// export function EditarLista({ lista, fecharModalEditarLista, handleAtualizarLista }) {
//   const [nomeLista, setNomeLista] = useState(lista.nomeLista);
//   const [limiteValor, setLimiteValor] = useState(lista.limite.toString());
//   const [tipoCompra, setTipoCompra] = useState(lista.tipoCompra);

//   const salvarAtualizacoesLista = async () => {
//     if (!nomeLista || !limiteValor || !tipoCompra) {
//       alert("Por favor, preencha todos os campos.");
//       return;
//     }

//     try {
//       await handleAtualizarLista(lista.id, nomeLista, parseFloat(limiteValor), tipoCompra);
//       fecharModalEditarLista();
//     } catch (error) {
//       console.error('Erro ao atualizar a lista de compras: ', error);
//     }
//   };

//   return (
//     <View style={estiloModal.container}>
//       <Animatable.View style={estiloModal.content}>
//         <Text style={estiloModal.tituloModal}>Editar Lista</Text>
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
//         <DropdownMenuLISTA selectedValue={tipoCompra} onSelect={setTipoCompra} />
//         <View style={estiloModal.baseBtnsModal}>
//           <TouchableOpacity style={estiloModal.btnVoltar} onPress={fecharModalEditarLista}>
//             <Text style={ESTILOS.txtRoxo}>Cancelar</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={estiloModal.btnProximo} onPress={salvarAtualizacoesLista}>
//             <Text style={ESTILOS.txtBranco}>Salvar</Text>
//           </TouchableOpacity>
//         </View>
//       </Animatable.View>
//       <StatusBar style="light" />
//     </View>
//   );
// }

// const estiloModalEspecifico = StyleSheet.create({});

// export default EditarLista;