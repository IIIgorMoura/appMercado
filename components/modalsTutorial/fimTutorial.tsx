import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import ESTILOS from "../../styles/ESTILOS";
import estiloModal from "../../styles/estiloModal";

export function FimTutorial({ fecharModalFimTutorial }) {
    return (
        <View style={estiloModal.containerModalTutorial}>
            <View style={estiloModal.contentReduzidoTutorialBemVindo}>
                <Image source={require('../../assets/icons/smileIconTutorial.png')} />
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