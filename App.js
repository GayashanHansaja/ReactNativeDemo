import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text ,Image,TouchableNativeFeedback,View,Button,Alart} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';



export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text>shut the fuck</Text>
        <TouchableNativeFeedback onPress={()=>console.log("Hiii")}><View style={{
          width:200,
          height:70,backgroundColor:"dodgerblue"}}> 
       </View></TouchableNativeFeedback>
        <Button color="orange" title="click me" 
            	onPress={()=>Alart.alert("My title","My massage",[
                {text:"yes",onPress:()=>console.log("yes")},
                {text:"no",onPress:()=>console.log("no")},
                ])
              }
            />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
