import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import ESTILOS from '../styles/ESTILOS';

import Header from '../components/header';

export function Novidades() {

    const navigation = useNavigation();

    return (
        <View style={ESTILOS.container}>
            <Header navigation={navigation} />

            <Text>Open up App.js to start working on your app!</Text>
            <StatusBar style="auto" />
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
});
