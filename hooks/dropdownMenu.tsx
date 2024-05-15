import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, Modal } from 'react-native';
import estiloModal from '../styles/estiloModal';

function DropdownMenu() {
    const [opcSelecionada, setOpcSelecionada] = useState('');

    const handleSelectChange = (event) => {
        setOpcSelecionada(event.target.value);
    };

    return (
        <View>
            <div style={estiloModal.formInput}>
                <div style={estiloModal.formInputText}>
                    <label htmlFor="compra"><Text>Tipo de compra:</Text></label>
                </div>

                <select style={estiloModal.input} id="compra" value={opcSelecionada} onChange={handleSelectChange}>
                    <option value=""><Text>Selecione...</Text></option>
                    <option value="compra1"><Text>Compra do Mês</Text></option>
                    <option value="compra2"><Text>Compra da Semana</Text></option>
                    <option value="compra3"><Text>Compra do Dia</Text></option>
                    <option value="compra3"><Text>HortiFruti</Text></option>
                </select>
            </div>
        </View>

    );
}

export default DropdownMenu;