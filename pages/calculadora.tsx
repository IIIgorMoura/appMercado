import React, { useState, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useFocusEffect } from '@react-navigation/native';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ESTILOS from '../styles/ESTILOS';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CalculadoraTutorial } from '../components/modalsTutorial/calculadoraTutorial';

export function Calculadora() {
    const [exibicao, setExibicao] = useState('');
    const [resultado, setResultado] = useState('');
    const [modalCalculadoraTutorial, setModalCalculadoraTutorial] = useState(false)

    const verificarModalTutorialCalculadora = async () => {
        try {
            const valor = await AsyncStorage.getItem('modalTutorialCalculadoraExibido');
            if (valor === null) {
                // Modal não foi exibido, então exibe e marca como exibido
                setModalCalculadoraTutorial(true);
                await AsyncStorage.setItem('modalTutorialCalculadoraExibido', 'true');
            }
        } catch (error) {
            console.error('Erro ao verificar se o modal já foi exibido: ', error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            verificarModalTutorialCalculadora(); // Verifica se o modal de tutorial já foi exibido ao ganhar o foco
        }, [])
    );

    const fecharModalTutorialCalculadora = () => {
        setModalCalculadoraTutorial(false);
    }

    const handlePressionar = (value: string) => {
        if (value === '=') {
            try {
                setResultado(eval(exibicao.replace('^', '**')).toString());
            } catch (e) {
                setResultado('Error');
            }
        } else if (value === 'Limpar') {
            setExibicao('');
            setResultado('');
        } else if (value === '←') {
            setExibicao(exibicao.slice(0, -1));
        } else {
            setExibicao(exibicao + value);
        }
    };

    const getButtonStyle = (value: string) => {
        if (value === '=') return [styles.btn, styles.equalBtn];
        if (value === '←') return [styles.btn, styles.apagarBtn];
        if (value === 'Limpar') return [styles.btn, styles.limparBtn];
        if (['+', '-', '/', '*', '^'].includes(value)) return [styles.btn, styles.operacaoBtn];
        return styles.btn;
    };

    const getButtonTextStyle = (value: string) => {
        switch (value) {
            case '+':
                return [styles.btnTxt, styles.plusTxt];
            case '-':
                return [styles.btnTxt, styles.minusTxt];
            case '/':
                return [styles.btnTxt, styles.divideTxt];
            case '*':
                return [styles.btnTxt, styles.multiplyTxt];
            case '^':
                return [styles.btnTxt, styles.powerTxt];
            case '=':
                return [styles.btnTxt, styles.whiteTxt];
            case '←':
            case 'Limpar':
                return [styles.btnTxt, styles.whiteTxt];
            default:
                return styles.btnTxt;
        }
    };

    return (
        <View style={ESTILOS.container}>
            <StatusBar style="light" />
            <View style={styles.displayContainer}>
                <Text style={styles.exibicao}>{exibicao}</Text>
                <Text style={styles.resultado}>{resultado}</Text>
            </View>
            <View style={styles.linhaBtnSuperior}>
                <TouchableOpacity style={[styles.btn, styles.limparBtn]} onPress={() => handlePressionar('Limpar')}>
                    <Text style={getButtonTextStyle('Limpar')}>C</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btn, styles.apagarBtn]} onPress={() => handlePressionar('←')}>
                    <Text style={getButtonTextStyle('←')}>←</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btn, styles.equalBtn]} onPress={() => handlePressionar('=')}>
                    <Text style={getButtonTextStyle('=')}>=</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.linhaBtn}>
                {['7', '8', '9', '/'].map(value => (
                    <TouchableOpacity key={value} style={getButtonStyle(value)} onPress={() => handlePressionar(value)}>
                        <Text style={getButtonTextStyle(value)}>{value}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <View style={styles.linhaBtn}>
                {['4', '5', '6', '*'].map(value => (
                    <TouchableOpacity key={value} style={getButtonStyle(value)} onPress={() => handlePressionar(value)}>
                        <Text style={getButtonTextStyle(value)}>{value}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <View style={styles.linhaBtn}>
                {['1', '2', '3', '-'].map(value => (
                    <TouchableOpacity key={value} style={getButtonStyle(value)} onPress={() => handlePressionar(value)}>
                        <Text style={getButtonTextStyle(value)}>{value}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <View style={styles.linhaBtn}>
                {['0', '.', '^', '+'].map(value => (
                    <TouchableOpacity key={value} style={getButtonStyle(value)} onPress={() => handlePressionar(value)}>
                        <Text style={getButtonTextStyle(value)}>{value}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalCalculadoraTutorial}
                style={ESTILOS.modal}>
                <CalculadoraTutorial fecharModalTutorialCalculadora={fecharModalTutorialCalculadora} />
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#DCDCDC',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        width: '90%',
    },
    displayContainer: {
        width: '90%',
        backgroundColor: '#f1f3f4',
        marginBottom: 20,
        padding: 10,
        borderRadius: 20,


    },
    exibicao: {
        fontSize: 32,
        textAlign: 'right',
    },
    resultado: {
        fontSize: 24,
        textAlign: 'right',
        color: 'purple',
        fontWeight: 'bold',
    },
    linhaBtnSuperior: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '90%',
        marginVertical: 5,
    },
    linhaBtn: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '90%',
        marginVertical: 5,
    },
    btn: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 25,
        width: '22%',
        alignItems: 'center',
    },
    btnTxt: {
        fontSize: 24,
        color: 'black',
    },
    operacaoBtn: {
        backgroundColor: 'white',
    },
    plusTxt: {
        color: '#6622F6',
        fontWeight: 'bold',
    },
    minusTxt: {
        color: '#6622F6',
        fontWeight: 'bold',
    },
    divideTxt: {
        color: '#6622F6',
        fontWeight: 'bold',
    },
    multiplyTxt: {
        color: '#6622F6',
        fontWeight: 'bold',
    },
    powerTxt: {
        color: '#6622F6',
        fontWeight: 'bold',

    },
    equalBtn: {
        backgroundColor: '#6622F6',
        width: '45%',
    },
    equalTxt: {
        color: 'white',
    },
    apagarBtn: {
        backgroundColor: '#6622F6',
        width: '22%',
    },
    limparBtn: {
        backgroundColor: '#6622F6',
        width: '22%',
    },
    whiteTxt: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default Calculadora;