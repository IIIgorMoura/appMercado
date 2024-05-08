import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';

import ESTILOS from '../styles/ESTILOS';

import Header from '../components/Header';

export function Home() {

  const navigation = useNavigation();

  return (
    <View style={ESTILOS.container}>

      <TouchableOpacity style={ESTILOS.btnDestaque}>
        <Text style={ESTILOS.txtBranco}>Adicionar Nova Lista</Text>
      </TouchableOpacity>

      <StatusBar style="light" />
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
