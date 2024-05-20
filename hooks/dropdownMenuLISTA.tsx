import React, { useState } from 'react';
import { View, Text } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import estiloModal from '../styles/estiloModal';

export function DropdownMenuLISTA({ onSelect }) {
    const [opcSelecionada, setOpcSelecionada] = useState('');

    const handleSelectChange = (itemValue) => {
        setOpcSelecionada(itemValue);
        onSelect(itemValue);
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
                <Picker.Item label="Compra do Mês" value="Compra do Mês" />
                <Picker.Item label="Compra da Semana" value="Compra da Semana" />
                <Picker.Item label="Compra do Dia" value="Compra do Dia" />
                <Picker.Item label="HortiFruti" value="HortiFruti" />
            </Picker>
        </View>
    );
}

export default DropdownMenuLISTA;