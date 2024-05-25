import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ESTILOS from "../../styles/ESTILOS";
import estiloModal from "../../styles/estiloModal";
import Octicons from '@expo/vector-icons/Octicons';

export function InicioTutorial() {
    return (
        <View style={estiloModal.containerModalTutorial}>
            <View style={estiloModal.contentReduzidoTutorial}>
                <Octicons name="checklist" size={24} color="black" />
                <Text style={estiloModal.tituloModal}>PÁGINA INÍCIO</Text>

                <View style={estiloModal.txtModalReduzidoTutorial}>
                    <Text >Nesta página você pode:</Text>
                    <Text>- Criar novas listas de compras;</Text>
                    <Text>- Visitar as que você já criou apertando nelas;</Text>
                </View>

                <View style={estiloModal.txtModalReduzidoTutorial}>
                    <Text>Mas antes, vamos para a página produtos!</Text>
                    <Text>Arraste para a direita ou clique na aba Produtos</Text>
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