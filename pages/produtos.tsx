import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import ESTILOS from '../styles/ESTILOS'

export function Produtos() {

  const navigation = useNavigation();

  return (
    <View style={ESTILOS.container}>
      <View style={ESTILOS.header}>
        
        {/* INSERIR LOGO */}
        {/* <Image source={require('../assets/')} /> */}

        <View style={ESTILOS.headerTabs}>
          <TouchableOpacity style={ESTILOS.headerTab} onPress={() => navigation.navigate('index')}>
            <Text style={ESTILOS.txtBranco}>Início</Text>
          </TouchableOpacity>
          <TouchableOpacity style={ESTILOS.headerTab} onPress={() => navigation.navigate('produtos')}>
            <Text style={ESTILOS.txtBranco}>Produtos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={ESTILOS.headerTab} onPress={() => navigation.navigate('novidades')}>
            <Text style={ESTILOS.txtBranco}>Novidades</Text>
          </TouchableOpacity>
        </View>
      </View>
      
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
