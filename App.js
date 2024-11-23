import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text ,Image} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text>shut the fuck</Text>
        <Image style={{
          width:200,
          height:300,}}
          blurRadius={10}
          fadeDuration={100}
        source={{
          uri:"https://picsum.photos/200/300"}}/>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'dodgerblue',
  },
});
