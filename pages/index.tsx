import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View, Modal, FlatList } from 'react-native';
import { useState, useEffect } from "react";
import { CriarLista } from '../components/CriarLista';
import { Ionicons } from '@expo/vector-icons';
import ESTILOS from '../styles/ESTILOS';
import { obterListasCompras, adicionarListaCompras } from '../hooks/bancoLista'; // Importar função para obter e adicionar listas de compras
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Home() {
  const navigation = useNavigation();
  const [ativoModalCriarLista, setModalCriarLista] = useState(false);
  const [listasCompras, setListasCompras] = useState([]);

  // Função para carregar as listas de compras ao carregar a tela e sempre que houver uma alteração
  const carregarListasCompras = async () => {
    try {
      const listas = await obterListasCompras();
      setListasCompras(listas);
    } catch (error) {
      console.error('Erro ao carregar listas de compras: ', error);
    }
  };

  const removerLista = async (id) => {
    try {
      const novaLista = listasCompras.filter((item) => item.id !== id);
      await AsyncStorage.setItem('listasCompras', JSON.stringify(novaLista));
      setListasCompras(novaLista);
    } catch (error) {
      console.error('Erro ao remover lista de compras do AsyncStorage: ', error);
    }
  };

  useEffect(() => {
    carregarListasCompras();
  }, []); // Executar apenas uma vez ao carregar a tela

  const abrirModalCriarLista = () => {
    setModalCriarLista(true);
  };

  const fecharModalCriarLista = () => {
    setModalCriarLista(false);
  };

  // Função para lidar com a adição de uma nova lista de compras
  const handleAdicionarLista = async (nomeLista, limite) => {
    try {
      await adicionarListaCompras(nomeLista, limite);
      carregarListasCompras(); // Após adicionar, carregar novamente as listas de compras
      fecharModalCriarLista();
    } catch (error) {
      console.error('Erro ao adicionar nova lista de compras: ', error);
    }
  };



  return (
    <View style={ESTILOS.container}>
      <TouchableOpacity style={ESTILOS.btnDestaque} onPress={abrirModalCriarLista}>
        <Text style={ESTILOS.txtBranco}>Adicionar Nova Lista</Text>
        <Ionicons style={ESTILOS.btnDestaqueIcon} name="add-circle-outline" color="white" size={20}></Ionicons>
      </TouchableOpacity>

      <FlatList style={ESTILOS.listaElementos}
        data={listasCompras}
        renderItem={({ item }) => (
          <View style={ESTILOS.listaItem}>
            <Text>{item.nomeLista}</Text>
            <Text>{item.limite}</Text>
            <TouchableOpacity onPress={() => removerLista(item.id)}>
              <Text style={{ color: 'red' }}>Remover</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />

      <Modal
        animationType="fade"
        transparent={true}
        visible={ativoModalCriarLista}
        style={ESTILOS.modal}
      >
        {/* Passando handleAdicionarLista como prop para CriarLista */}
        <CriarLista fecharModalCriarLista={fecharModalCriarLista} handleAdicionarLista={handleAdicionarLista} />
      </Modal>

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