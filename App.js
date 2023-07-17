import 'react-native-gesture-handler';
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';
import Puzzle from './src/screens/Puzzle';
import Chess from './src/Chess/Chess';
import Chess2 from './src/Chess2/Chess';
import ChessContextProvider from './src/context/ChessContextProvider';

const Stack = createStackNavigator();

export default function App() {
  return (

    <ChessContextProvider>
      <NavigationContainer>
        <StatusBar
          // backgroundColor="#50b186"
          barStyle="light-content"
        />
        <Stack.Navigator
          initialRouteName="chess2"
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="Puzzle" component={Puzzle} />
          <Stack.Screen name="chess" component={Chess} />
          <Stack.Screen name="chess2" component={Chess2} />
        </Stack.Navigator>
      </NavigationContainer>
    </ChessContextProvider>

  );
}
