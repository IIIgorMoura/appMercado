import { Home } from './pages/index';
import { Produtos } from './pages/produtos';
import { Calculadora } from './pages/calculadora';
import { StatusBar } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

import { Vegetais } from './pages/produtoCategorias/vegetais';
import { Carnes } from './pages/produtoCategorias/carnes';
import { Frutas } from './pages/produtoCategorias/frutas';
import { Padaria } from './pages/produtoCategorias/padaria';
import { Limpeza } from './pages/produtoCategorias/limpeza';
import { Outros } from './pages/produtoCategorias/outros';
import ListaCompras from './pages/listaCompras';

function ProdutosStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="Produtos" component={Produtos} />
      <Stack.Screen name="Vegetais" component={Vegetais} />
      <Stack.Screen name="Carnes" component={Carnes} />
      <Stack.Screen name="Frutas" component={Frutas} />
      <Stack.Screen name="Padaria" component={Padaria} />
      <Stack.Screen name="Limpeza" component={Limpeza} />
      <Stack.Screen name="Outros" component={Outros} />

      <Stack.Screen name="Lista de Compras" component={ListaCompras} />
    </Stack.Navigator>
  );
}

function IndexStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="InícioLista" component={Home} />
      <Stack.Screen name="Lista de Compras" component={ListaCompras} />
    </Stack.Navigator>
  );
}

export default function Routes() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: '#fff',
                tabBarIndicatorStyle: { backgroundColor: '#fff', height: 4 }, 
                tabBarStyle: { backgroundColor: '#6622F6', paddingTop: StatusBar.currentHeight },
            }}
        >
            <Tab.Screen name="Início" component={IndexStackNavigator} />
            <Tab.Screen name="produtos" component={ProdutosStackNavigator} />
            <Tab.Screen name="calculadora" component={Calculadora} />
        </Tab.Navigator>
    );
}