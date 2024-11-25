import { StyleSheet, Text, View,ImageBackground } from 'react-native'
import React from 'react'
import Colors from '../config/Colors'


export default function 
() {
  return (
    <View style={styles.container}>
        <ImageBackground
        resizeMode='contain'
        style={styles.image}
        source={require("../assets/tree.jpeg")}>
            
        <View style={styles.close}></View>
        <View style={styles.delete}></View>
        </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'white',
        flex:1,
    },
    close:{
        width:50,
        height:50,
        backgroundColor:Colors.primary,
        position:'absolute',
        top:40,
        left:15,
        borderRadius:50,
        
    },
    delete:{
        width:50,
        height:50,
        backgroundColor:'black',
        position:'absolute',
        top:40,
        borderRadius:50,
        right:15,
        
    },
    image:{
        width:'100%',
        height:'100%',
        flex:1,
    },
})