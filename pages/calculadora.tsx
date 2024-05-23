import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ESTILOS from '../styles/ESTILOS';

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

    return (
        <View style={ESTILOS.container}>
            <StatusBar style="light" />
            <Text style={styles.exibicao}>{exibicao}</Text>
            <Text style={styles.resultado}>{resultado}</Text>
            <View style={styles.linhaBtn}>
                {['7', '8', '9', '/'].map(value => (
                    <TouchableOpacity key={value} style={styles.btn} onPress={() => handlePressionar(value)}>
                        <Text style={styles.btnTxt}>{value}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <View style={styles.linhaBtn}>
                {['4', '5', '6', '*'].map(value => (
                    <TouchableOpacity key={value} style={styles.btn} onPress={() => handlePressionar(value)}>
                        <Text style={styles.btnTxt}>{value}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <View style={styles.linhaBtn}>
                {['1', '2', '3', '-'].map(value => (
                    <TouchableOpacity key={value} style={styles.btn} onPress={() => handlePressionar(value)}>
                        <Text style={styles.btnTxt}>{value}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <View style={styles.linhaBtn}>
                {['0', '.', '←', '+'].map(value => (
                    <TouchableOpacity key={value} style={styles.btn} onPress={() => handlePressionar(value)}>
                        <Text style={styles.btnTxt}>{value}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <View style={styles.linhaBtn}>
                <TouchableOpacity style={styles.clearBtn} onPress={() => handlePressionar('Limpar')}>
                    <Text style={styles.btnTxt}>C</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.equalBtn} onPress={() => handlePressionar('=')}>
                    <Text style={styles.btnTxt}>=</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    exibicao: {
        fontSize: 32,
        padding: 10,
        backgroundColor: '#f1f3f4',
        width: '100%',
        textAlign: 'right',
    },
    resultado: {
        fontSize: 24,
        padding: 10,
        backgroundColor: '#f1f3f4',
        width: '100%',
        textAlign: 'right',
        color: 'gray',
    },
    linhaBtn: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginVertical: 5,
    },
    btn: {
        backgroundColor: '#4285f4',
        padding: 20,
        borderRadius: 5,
        width: '20%',
        alignItems: 'center',
    },
    btnTxt: {
        fontSize: 24,
        color: 'white',
    },
    clearBtn: {
        backgroundColor: 'red',
        padding: 20,
        borderRadius: 5,
        width: '43%',
        alignItems: 'center',
    },
    equalBtn: {
        backgroundColor: 'green',
        padding: 20,
        borderRadius: 5,
        width: '43%',
        alignItems: 'center',
    },
});

export default Calculadora;