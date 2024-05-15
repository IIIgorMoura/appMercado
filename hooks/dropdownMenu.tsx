import React, { useState } from 'react';
import { View, Text } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import estiloModal from '../styles/estiloModal';

export function DropdownMenu() {
    const [opcSelecionada, setOpcSelecionada] = useState('');

    const handleSelectChange = (itemValue) => {
        setOpcSelecionada(itemValue);
    };

    return (
        <View style={estiloModal.formInput}>
            <View style={estiloModal.formInputText}>
                <Text>Tipo de compra:</Text>
            </View>

            <Picker
                style={estiloModal.input}
                selectedValue={opcSelecionada}
                onValueChange={handleSelectChange}
            >
                <Picker.Item label="Selecione..." value="" />
                <Picker.Item label="Compra do Mês" value="compra1" />
                <Picker.Item label="Compra da Semana" value="compra2" />
                <Picker.Item label="Compra do Dia" value="compra3" />
                <Picker.Item label="HortiFruti" value="compra4" />
            </Picker>
        </View>
    );
}

export default DropdownMenu;