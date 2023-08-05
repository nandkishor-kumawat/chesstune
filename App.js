import 'react-native-gesture-handler';
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';
import Puzzle from './src/screens/Puzzle';
import Chess from './src/Chess/Chess';
import ChessContextProvider from './src/context/ChessContextProvider';
import Level_choose from './src/screens/Level_choose';

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
          initialRouteName="Level"
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="Level" component={Level_choose} />
          <Stack.Screen name="Puzzle" component={Puzzle} />
          <Stack.Screen name="chess" component={Chess} />
        </Stack.Navigator>
      </NavigationContainer>
    </ChessContextProvider>

  );
}
