import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ESTILOS from "../../styles/ESTILOS";
import estiloModal from "../../styles/estiloModal";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export function FimTutorial({ fecharModalFimTutorial }) {
    return (
        <View style={estiloModal.containerModalTutorial}>
            <View style={estiloModal.contentReduzidoTutorialBemVindo}>
                <FontAwesome6 name="smile-wink" size={50} color="black" />
                <Text style={estiloModal.tituloModal}>SUA VEZ!</Text>

                <View style={estiloModal.txtModalReduzido}>
                    <Text>Comece adicionando produtos</Text>
                    <Text>Assim você pode usá-los em listas futuras!</Text>
                </View>

                <View style={estiloModal.baseBtnsModalReduzido}>
                    <TouchableOpacity style={estiloModal.btnDestaqueModalReduzido} onPress={fecharModalFimTutorial}>
                        <Text style={ESTILOS.txtBtnDestaque}>Concluir</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}