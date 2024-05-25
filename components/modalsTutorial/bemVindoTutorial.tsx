import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ESTILOS from "../../styles/ESTILOS";
import estiloModal from "../../styles/estiloModal";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export function BemVindoTutorial({fecharModalBemVindo }) {
    return (
        <View style={estiloModal.containerModalTutorial}>
            <View style={estiloModal.contentReduzidoTutorialBemVindo}>
                <FontAwesome6 name="smile-wink" size={50} color="black" />
                <Text style={estiloModal.tituloModal}>SEJA BEM-VINDO!</Text>

                <View style={estiloModal.txtModalReduzido}>
                    <Text >Este é seu App de Lista de Compras</Text>
                    <Text>Mas antes, vamos aprender como usar?</Text>
                </View>


                <View style={estiloModal.baseBtnsModalReduzido}>
                    <TouchableOpacity style={estiloModal.btnDestaqueModalReduzido} onPress={fecharModalBemVindo}>
                        <Text style={ESTILOS.txtBtnDestaque}>Próximo</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}