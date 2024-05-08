// 
import { Home } from './pages/index';
import { Produtos } from './pages/produtos';
import { Novidades } from './pages/novidades';
import { StatusBar } from 'react-native';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();

import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

function HomeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

function ProdutosStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Produtos"
                component={Produtos}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

export default function Routes() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: '#fff', // Cor do texto da aba ativa
                // tabBarInactiveTintColor: '#888', // Cor do texto das abas inativas
                // tabBarLabelStyle: { fontSize: 16, fontWeight: 'bold' }, // Estilo do texto da aba
                tabBarIndicatorStyle: { backgroundColor: '#fff', height: 4 }, // Estilo da barra indicadora
                tabBarStyle: { backgroundColor: '#6622F6', paddingTop: StatusBar.currentHeight },
            }}
        >
            <Tab.Screen name="index" component={Home} />
            <Tab.Screen name="produtos" component={Produtos} />
            <Tab.Screen name="novidades" component={Novidades} />
        </Tab.Navigator>

        
    );
}

// import { createStackNavigator } from '@react-navigation/stack';

// import Header from './components/Header';

// const Stack = createStackNavigator();

// export default function Routes() {
//     return (

//             <Stack.Navigator>
//                 <Header navigation={navigation} />
//                 <Stack.Screen
//                     options={{
//                         headerShown: false,
//                         animationEnabled: true,
//                         gestureEnabled: true,
//                         gestureDirection: 'horizontal',
//                     }}
//                     name="index"
//                     component={Home}
//                 />

//                 <Stack.Screen
//                     options={{
//                         headerShown: false,
//                         animationEnabled: true,
//                         gestureEnabled: true,
//                         gestureDirection: 'horizontal',
//                     }}
//                     name="produtos"
//                     component={Produtos}
//                 />

//                 <Stack.Screen
//                     options={{
//                         headerShown: false,
//                         animationEnabled: true,
//                         gestureEnabled: true,
//                         gestureDirection: 'horizontal',
//                     }}
//                     name="novidades"
//                     component={Novidades}
//                 />
//             </Stack.Navigator>
//     );
// };


