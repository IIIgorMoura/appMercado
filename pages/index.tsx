import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';

import ESTILOS from '../styles/ESTILOS';

import Header from '../components/header';

export function Home() {

  const navigation = useNavigation();

  return (
    <View style={ESTILOS.container}>
      <Header navigation={navigation} />

      <TouchableOpacity style={ESTILOS.btnDestaque}>
        <Text style={ESTILOS.txtBranco}>Adicionar Nova Lista</Text>
      </TouchableOpacity>

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
