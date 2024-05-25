import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ESTILOS from "../../styles/ESTILOS";
import estiloModal from "../../styles/estiloModal";
import Ionicons from '@expo/vector-icons/Ionicons';

export function CalculadoraTutorial() {
    return (
        <View style={estiloModal.containerModalTutorial}>
            <View style={estiloModal.contentReduzidoTutorial}>
                <Ionicons name="calculator" size={24} color="black" />
                <Text style={estiloModal.tituloModal}>Calculadora</Text>

                <View style={estiloModal.txtModalReduzidoTutorial}>
                    <Text >Na calculadora você pode fazer diversos tipos de cálculos</Text>
                    <Text>Como calcular seus gastos, suas compras, entre outros</Text>
                </View>

                <View style={estiloModal.txtModalReduzidoTutorial}>
                    <Text>Agora vamos voltar à aba Produtos</Text>
                    <Text>Arraste para esquerda ou clique na aba Produtos</Text>
                </View>

                <View style={estiloModal.baseBtnsModalReduzido}>
                    <TouchableOpacity style={estiloModal.btnDestaqueModalReduzido}>
                        <Text style={ESTILOS.txtBtnDestaque}>Continuar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}