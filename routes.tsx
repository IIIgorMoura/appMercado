// 
import { Home } from './pages/index';
import { Produtos } from './pages/produtos';
import { Novidades } from './pages/novidades';
import { StatusBar } from 'react-native';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();

export default function Routes() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: '#fff',
                tabBarIndicatorStyle: { backgroundColor: '#fff', height: 4 }, 
                tabBarStyle: { backgroundColor: '#6622F6', paddingTop: StatusBar.currentHeight },
            }}
        >
            <Tab.Screen name="Início" component={Home} />
            <Tab.Screen name="produtos" component={Produtos} />
            <Tab.Screen name="novidades" component={Novidades} />
        </Tab.Navigator>

        
    );
}
