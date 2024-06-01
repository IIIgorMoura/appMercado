import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import ESTILOS from "../../styles/ESTILOS";
import estiloModal from "../../styles/estiloModal";

export function BemVindoTutorial({ fecharModalBemVindo }) {
    return (
        <View style={estiloModal.containerModalTutorial}>
            <View style={estiloModal.contentReduzidoTutorialBemVindo}>
                <Image source={require('../../assets/icons/smileIconTutorial.png')} />
                <Text style={estiloModal.tituloModal}>SEJA BEM-VINDO!</Text>

                <View style={estiloModal.txtModalReduzido}>
                    <Text >Este é seu App de Lista de Compras</Text>
                    <Text>Mas antes, vamos aprender como usar?</Text>
                </View>


                <View style={estiloModal.baseBtnsModalReduzido}>
                    <TouchableOpacity style={estiloModal.btnDestaqueModalReduzido} onPress={fecharModalBemVindo}>
                        <Text style={ESTILOS.txtBtnDestaque}>Vamos!</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}