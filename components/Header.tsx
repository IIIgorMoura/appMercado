// Header.js
import React from 'react';
import ESTILOS from '../styles/ESTILOS';
import { View, Text, TouchableOpacity } from 'react-native';

const Header = ({ navigation }) => {
  return (
    <View style={ESTILOS.header}>
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
  );
}

export default Header;