import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';

const Base_URL = `https://api.openweathermap.org/data/2.5/weather`;
const WEATHER_API_KEY = 'd323256bf52779f543c075f21d31fbac';
/* const url = `https://api.openweathermap.org/data/2.5/weather?lat=6.9319&lon=79.8478&appid=d323256bf52779f543c075f21d31fbac`; */

const MainScreen = () => {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    async function getCurrentLocation() {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log('Location:',location);
      setLocation(location);
    }

    getCurrentLocation();
  }, []);

  
  useEffect(() => {
    fetchWeather();
  }, []);

  const fetchWeather = async () => {
    const lat=6.9319;
    const long=79.8478;
    try {
      const result = await fetch(`${Base_URL}?lat=${lat}&lon=${long}&appid=${WEATHER_API_KEY}`);
      const data = await result.json();
      console.log(data);
      setWeather(data);
    } catch (error) {
      console.error("Error fetching weather data: ", error);
    }
  };


  if (!weather) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{weather.name}</Text>
      <Text style={styles.temp}>{Math.floor(weather.main.temp - 273.15)}°C</Text>
      {/* <Text>Feels Like: {(weather.main.feels_like - 273.15).toFixed(2)}°C</Text>
      <Text>Min Temperature: {(weather.main.temp_min - 273.15).toFixed(2)}°C</Text>
      <Text>Max Temperature: {(weather.main.temp_max - 273.15).toFixed(2)}°C</Text>
      <Text>Pressure: {weather.main.pressure} hPa</Text>
      <Text>Humidity: {weather.main.humidity}%</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center'
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    justifyContent:'center'
  },
  temp:{
    fontSize:100,
  }
});

export default MainScreen;
