import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export function Calculadora() {
    const [exibicao, setExibicao] = useState('');
    const [resultado, setResultado] = useState('');

    const handlePressionar = (value: string) => {
        if (value === '=') {
            try {
                setResultado(eval(exibicao).toString());
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
        if (['+', '-', '/', '*'].includes(value)) return [styles.btn, styles.operacaoBtn];
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
        <View style={styles.container}>
            <StatusBar style="light" />
            <View style={styles.displayContainer}>
                <Text style={styles.exibicao}>{exibicao}</Text>
                <Text style={styles.resultado}>{resultado}</Text>
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
                {['0', '.', '←', '+'].map(value => (
                    <TouchableOpacity key={value} style={getButtonStyle(value)} onPress={() => handlePressionar(value)}>
                        <Text style={getButtonTextStyle(value)}>{value}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <View style={styles.linhaBtn}>
                <TouchableOpacity style={[styles.btn, styles.limparBtn]} onPress={() => handlePressionar('Limpar')}>
                    <Text style={getButtonTextStyle('Limpar')}>C</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btn, styles.equalBtn]} onPress={() => handlePressionar('=')}>
                    <Text style={getButtonTextStyle('=')}>=</Text>
                </TouchableOpacity>
            </View>
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
    },
    displayContainer: {
        width: '95%',
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
    linhaBtn: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginVertical: 5,
    },
    btn: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 5,
        width: '20%',
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
        color: 'purple',
    },
    minusTxt: {
        color: 'purple',
    },
    divideTxt: {
        color: 'purple',
    },
    multiplyTxt: {
        color: 'purple',
    },
    equalBtn: {
        backgroundColor: 'purple',
        width: '45%',
    },
    equalTxt: {
        color: 'white',
    },
    apagarBtn: {
        backgroundColor: 'purple',
    },
    limparBtn: {
        backgroundColor: 'purple',
        width: '45%',
    },
    whiteTxt: {
        color: 'white',
    },
});

export default Calculadora;
