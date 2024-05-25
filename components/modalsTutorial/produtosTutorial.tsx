import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ESTILOS from "../../styles/ESTILOS";
import estiloModal from "../../styles/estiloModal";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export function ProdutosTutorial({ fecharModalProdutoTutorial }) {
    return (
        <View style={estiloModal.containerModalTutorial}>
            <View style={estiloModal.contentReduzidoTutorial}>
                <MaterialCommunityIcons name="food-apple-outline" size={50} color="black" />
                <Text style={estiloModal.tituloModal}>PÁGINA PRODUTOS</Text>

                <View style={estiloModal.txtModalReduzidoTutorial}>
                    <Text >Nesta página você pode:</Text>
                    <Text>- Adicionar um novo produto;</Text>
                    <Text>- Ver as categorias de produtos;</Text>
                    <Text>- Visitar os produtos que você já adicionou;</Text>
                </View>

                <View style={estiloModal.txtModalReduzidoTutorial}>
                    <Text>Agora vamos à página da calculadora!</Text>
                    <Text>Arraste para a direita ou clique na aba Calculadora</Text>
                </View>

                <View style={estiloModal.baseBtnsModalReduzido}>
                    <TouchableOpacity style={estiloModal.btnDestaqueModalReduzido} onPress={fecharModalProdutoTutorial}>
                        <Text style={ESTILOS.txtBtnDestaque}>Continuar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}