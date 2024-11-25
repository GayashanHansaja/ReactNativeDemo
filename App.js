import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text ,Image,TouchableNativeFeedback,View,Button,Alart} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import WelcomeScreen from './App/Screens/WelcomeScreen';
import ViewImage from './App/Screens/ViewImage';



export default function App() {
  return (
    <ViewImage/>
  );
}
