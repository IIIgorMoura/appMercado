import { createStackNavigator } from '@react-navigation/stack';
import { Home } from './pages/index';
import { Produtos } from './pages/produtos';
import { Novidades } from './pages/novidades';

const Stack = createStackNavigator();

export default function Routes() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                options={{ headerShown: false }}
                name="index"
                component={Home}
            />

            <Stack.Screen
                options={{ headerShown: false }}
                name="produtos"
                component={Produtos}
            />

            <Stack.Screen
                options={{ headerShown: false }}
                name="novidades"
                component={Novidades}
            />
        </Stack.Navigator>
    )
} 