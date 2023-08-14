import 'react-native-gesture-handler';
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';
import Puzzle from './src/screens/Puzzle';
import Chess from './src/components/Chess/Chess';
import ChessContextProvider from './src/context/ChessContextProvider';
import Level_choose from './src/screens/Level_choose';
import About from './src/screens/About';
import Live_chess from './src/screens/Live_chess';
import Menu from './src/screens/Menu';
import User_datails from './src/screens/User_datails';
import CreatePuzzle from './src/screens/CreatePuzzle';



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
          initialRouteName="createPuzzle"
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name='Menu' component={Menu} />
          <Stack.Screen name='Live_chess' component={Live_chess} />
          <Stack.Screen name='About' component={About} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="Level" component={Level_choose} />
          <Stack.Screen name="Puzzle" component={Puzzle} />
          <Stack.Screen name="chess" component={Chess} />
          <Stack.Screen name="User_datails" component={User_datails} />
          <Stack.Screen name="createPuzzle" component={CreatePuzzle} />
        </Stack.Navigator>
      </NavigationContainer>
    </ChessContextProvider>

  );
}
