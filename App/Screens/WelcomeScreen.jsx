import {Image, ImageBackground, StyleSheet, View, Text} from 'react-native';
import React from 'react';

export default function WelcomeScreen() {
  return (
    <ImageBackground 
      style={styles.background}
      source={require('../assets/cat.jpeg')}>
        
        <View style={styles.logoContainer}>
          <Image 
            style={styles.logo}
            source={require('../assets/logo.png')}
          />
          <Text style={styles.nameText}>Gayashan</Text>
        </View>

        
        <View style={styles.loginBtn}></View>
        <View style={styles.registerBtn}></View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 150,
  },
  logoContainer: {
    position: 'absolute', // Keep it at a specific spot
    top: 60, // Adjust the vertical position
    alignItems: 'center', // Center items horizontally
  },
  nameText: {
 // Space between logo and text
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  loginBtn: {
    width: '80%',
    height: 60,
    backgroundColor: '#5483b3',
    borderRadius: 30,
    marginVertical: 10,
  },
  registerBtn: {
    width: '80%',
    height: 60,
    backgroundColor: '#052659',
    borderRadius: 30,
    marginVertical: 10,
  },
});
