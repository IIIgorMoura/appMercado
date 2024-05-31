import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import estiloModal from '../styles/estiloModal';

export function DropdownMenuPRODUTO({ onSelect }) {
    const [opcSelecionada, setOpcSelecionada] = useState('');

    const handleSelectChange = (itemValue) => {
        setOpcSelecionada(itemValue);
        onSelect(itemValue); 
    };

    return (
        <View style={estiloModal.formInput}>
            <View style={estiloModal.formInputText}>
                <Text>Tipo de produto:</Text>
            </View>

            <Picker
                style={estiloModal.input}
                selectedValue={opcSelecionada}
                onValueChange={handleSelectChange}
            >
                <Picker.Item label="Selecione..." value="" />
                <Picker.Item label="Vegetais" value="vegetais" />
                <Picker.Item label="Carnes" value="carnes" />
                <Picker.Item label="Padaria" value="padaria" />
                <Picker.Item label="Frutas" value="frutas" />
                <Picker.Item label="Limpeza" value="limpeza" />
                <Picker.Item label="Outros" value="outros" />
            </Picker>
        </View>
    );
}

export default DropdownMenuPRODUTO;