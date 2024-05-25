import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ESTILOS from "../../styles/ESTILOS";
import estiloModal from "../../styles/estiloModal";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export function FimTutorial() {
    return (
        <View style={estiloModal.containerModalTutorial}>
            <View style={estiloModal.contentReduzidoTutorialBemVindo}>
                <FontAwesome6 name="smile-wink" size={50} color="black" />
                <Text style={estiloModal.tituloModal}>SUA VEZ!</Text>

                <View style={estiloModal.txtModalReduzido}>
                    <Text >Comece adicionando produtos</Text>
                    <Text>Assim você pode usa-los em listas futuras!</Text>
                </View>

                <View style={estiloModal.baseBtnsModalReduzido}>
                    <TouchableOpacity style={estiloModal.btnDestaqueModalReduzido}>
                        <Text style={ESTILOS.txtBtnDestaque}>Concluir</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}