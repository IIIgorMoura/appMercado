import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './routes';

export default function App() {
  return (
    
    <NavigationContainer>
      <StatusBar/>
      <Routes />
    </NavigationContainer>


  )
}

// import React from 'react';
// import { StatusBar } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import Routes from './routes';
// import AppNavigator from './routes';

// export default function App() {
//   return <AppNavigator />;
// }