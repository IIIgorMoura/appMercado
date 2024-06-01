import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View, Modal, FlatList, Image } from 'react-native';
import { useState, useEffect } from "react";
import { CriarLista } from '../components/CriarLista';
import { Ionicons } from 'react-native-vector-icons';
import ESTILOS from '../styles/ESTILOS';
import { obterListasCompras, adicionarListaCompras } from '../hooks/bancoLista';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { BemVindoTutorial } from '../components/modalsTutorial/bemVindoTutorial';
import { InicioTutorial } from '../components/modalsTutorial/inicioTutorial';

export function Home() {
  const navigation = useNavigation();
  const navegarParaListaCompras = (id) => {
    navigation.navigate('Lista de Compras', { listaId: id });
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

  const verificarModalTutorial = async () => {
    try {
      const valor = await AsyncStorage.getItem('modalTutorialExibido');
      if (valor === null) {
        ativoModalTutorial(true);
        await AsyncStorage.setItem('modalTutorialExibido', 'true');
      }
    } catch (error) {
      console.error('Erro ao verificar se o modal já foi exibido: ', error);
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
    verificarModalTutorial();
  }, []);

  const abrirModalCriarLista = () => {
    setModalCriarLista(true);
  };

  const fecharModalCriarLista = () => {
    setModalCriarLista(false);
  };

  const fecharModalBemVindo = () => {
    ativoModalTutorialInicial(true);
    ativoModalTutorial(false);
  };

  const fecharModalTutorialInicio = () => {
    ativoModalTutorialInicial(false);
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

  const [modalTutorial, ativoModalTutorial] = useState(false);
  const [modalTutorialInicial, ativoModalTutorialInicial] = useState(false);

  const abrirModalTutorial = () => {
    ativoModalTutorial(true);
  };

  const tipoCompraIcones = {
    "Compra do Mês": require('../assets/icons/listaMes.png'),
    "Compra da Semana": require('../assets/icons/listaSemana.png'),
    "Compra do Dia": require('../assets/icons/listaDia.png'),
    "HortiFruti": require('../assets/icons/listaHortifruti.png'),
  };

  const limparAsyncStorage = async () => {
    try {
      await AsyncStorage.clear();
      console.log('AsyncStorage limpo com sucesso!');
    } catch (error) {
      console.error('Erro ao limpar AsyncStorage: ', error);
    }
  };

  return (
    <View style={ESTILOS.container}>
      <Text style={ESTILOS.titulo}>SUAS LISTAS</Text>
      <TouchableOpacity style={ESTILOS.btnDestaque} onPress={abrirModalCriarLista}>
        <Text style={ESTILOS.txtBtnDestaque}>Adicionar Nova Lista</Text>
        <Ionicons style={ESTILOS.btnDestaqueIcon} name="add-circle-outline" color="white" size={30} />
      </TouchableOpacity>

      <FlatList
        style={ESTILOS.listaElementos}
        showsVerticalScrollIndicator={false}
        data={listasCompras}
        renderItem={({ item }) => (
          <TouchableOpacity style={ESTILOS.listaItem} onPress={() => navegarParaListaCompras(item.id)}>
            <View style={ESTILOS.listaItemConteudo}>
              <Image source={tipoCompraIcones[item.tipoCompra]} style={ESTILOS.listaItemIcone} />
              <View style={ESTILOS.listaItemTexto}>
                <Text style={ESTILOS.listaItemTitulo}>{item.nomeLista}</Text>
                <Text style={ESTILOS.limiteCusto}>{`Limite de Custo: R$ ${item.limite.toFixed(2)}`}</Text>
                <Text style={ESTILOS.limiteCusto}>{`${item.tipoCompra}`}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => removerLista(item.id)}>
              <Ionicons name="trash-bin-outline"  style={ESTILOS.remover} />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />

      {/* <TouchableOpacity onPress={limparAsyncStorage}>
        <Text>Reset AsyncStorage</Text>
      </TouchableOpacity> */}

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalTutorial}>
        <BemVindoTutorial fecharModalBemVindo={fecharModalBemVindo} />
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalTutorialInicial}>
        <InicioTutorial fecharModalTutorialInicio={fecharModalTutorialInicio} />
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={ativoModalCriarLista}
        style={ESTILOS.modal}>
        <CriarLista fecharModalCriarLista={fecharModalCriarLista} handleAdicionarLista={handleAdicionarLista} navegarParaListaCompras={navegarParaListaCompras} />
      </Modal>

      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  
});

export default Home;
