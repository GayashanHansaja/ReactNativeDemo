import { StyleSheet, Text, View,FlatList, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Base_URL = `https://api.openweathermap.org/data/2.5`;
const WEATHER_API_KEY = 'd323256bf52779f543c075f21d31fbac';
/* const url = `https://api.openweathermap.org/data/2.5/weather?lat=6.9319&lon=79.8478&appid=d323256bf52779f543c075f21d31fbac`; */
/* https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key} */
const MainScreen = () => {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [forecast, setForecast] = useState(null);
  

  //useEffect to fetch weather data and fotrecast data
  useEffect(() => {
    if(location){
    fetchWeather();
    forecastWeather();
    }
  }, [location]);


  //useEffect to get current location
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

  
//fetch currunt weather data
  const fetchWeather = async () => {
    if(!location){
      return;
    }

    try {
      const result = await fetch(`${Base_URL}/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${WEATHER_API_KEY}`);
      const data = await result.json();
      console.log(data);
      setWeather(data);
    } catch (error) {
      console.error("Error fetching weather data: ", error);
    }
  };

  //fetch forecast weather data
  const forecastWeather = async () => {
      if(!location){
        return;
      }

      try {
        const result = await fetch(`${Base_URL}/forecast?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${WEATHER_API_KEY}`);
        const data = await result.json();
        console.log(data.list);
        setForecast(data.list);
      } catch (error) {
        console.error("Error forcasting weather data: ", error);
      }
    };
  


  if (!weather) {
    return <ActivityIndicator />;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{weather.name}</Text>
      <Text style={styles.temp}>{Math.floor(weather.main.temp - 273.15)}°C</Text>
      {/* <Text>Feels Like: {(weather.main.feels_like - 273.15).toFixed(2)}°C</Text>
      <Text>Min Temperature: {(weather.main.temp_min - 273.15).toFixed(2)}°C</Text>
      <Text>Max Temperature: {(weather.main.temp_max - 273.15).toFixed(2)}°C</Text>
      <Text>Pressure: {weather.main.pressure} hPa</Text>
      <Text>Humidity: {weather.main.humidity}%</Text> */}
      <FlatList
        data={forecast}
        renderItem={({item}) => (
        <View>
        <Text>{item.main.temp}</Text>
      </View>
        )}
      />

      </SafeAreaView>
    </SafeAreaProvider>
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
    justifyContent:'center',
    alignItems:'center'
  },
  temp:{
    fontSize:100,
  }
});

export default MainScreen;
