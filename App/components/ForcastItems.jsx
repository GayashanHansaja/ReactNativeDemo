import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import dayjs from 'dayjs'
import { BlurView } from 'expo-blur';

const ForecastItems = ({forecast}) => {
  return (
      <BlurView intensity={50}style={styles.container}>

          <Text style={styles.temp}>{Math.round(forecast.main.temp- 273.15)}°C</Text>
          <Text style={styles.date}> {dayjs(forecast.dt *1000).format('ddd ha')}</Text>
      </BlurView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 150,    
        padding : 10,
        aspectRatio:9/16,
        borderRadius: 10 ,
        marginTop: 100,
        borderWidth: 1,
        borderColor: 'white',
    },

    temp: {
        fontSize: 24,
        color:'white',
        fontWeight: 'bold',
    },


    date:{
        fontWeight: 'bold',
        fontSize: 16,
        color:'white',
    }
})

export default  ForecastItems;