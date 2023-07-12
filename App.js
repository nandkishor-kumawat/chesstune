import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';


export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        // backgroundColor="#50b186"
        barStyle="light-content"
      />
      <HomeScreen/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050A18',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
