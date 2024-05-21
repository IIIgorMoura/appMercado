import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View, Modal, FlatList } from 'react-native';
import { useState, useEffect } from "react";
import { CriarLista } from '../components/CriarLista';
import { Ionicons } from '@expo/vector-icons';
import ESTILOS from '../styles/ESTILOS';
import { obterListasCompras, adicionarListaCompras } from '../hooks/bancoLista';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Home() {
  const navigation = useNavigation();
  const navegarParaListaCompras = (id: number) => {
    navigation.navigate('ListaCompras', { listaId: id });
  };

  const [ativoModalCriarLista, setModalCriarLista] = useState(false);
  const [listasCompras, setListasCompras] = useState([]);

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
  }, []);

  const abrirModalCriarLista = () => {
    setModalCriarLista(true);
  };

  const fecharModalCriarLista = () => {
    setModalCriarLista(false);
  };

  const handleAdicionarLista = async (nomeLista, limite, tipoCompra) => {
    try {
      const id = await adicionarListaCompras(nomeLista, limite, tipoCompra);
      carregarListasCompras();
      return id;
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

      <FlatList
        style={ESTILOS.listaElementos}
        showsVerticalScrollIndicator={false}
        data={listasCompras}
        renderItem={({ item }) => (
          <TouchableOpacity style={ESTILOS.listaItem} onPress={() => navegarParaListaCompras(item.id)}>
            <Text>{item.nomeLista}</Text>
            <Text>{`Limite de Custo: R$ ${item.limite.toFixed(2)}`}</Text>
            <Text>{`Tipo de Compra: ${item.tipoCompra}`}</Text>
            <TouchableOpacity onPress={() => removerLista(item.id)}>
              <Ionicons name="trash-bin-outline" size={24} color="red" />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />



      <Modal
        animationType="fade"
        transparent={true}
        visible={ativoModalCriarLista}
        style={ESTILOS.modal}
      >
        <CriarLista fecharModalCriarLista={fecharModalCriarLista} handleAdicionarLista={handleAdicionarLista} navegarParaListaCompras={navegarParaListaCompras} />
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

export default Home;