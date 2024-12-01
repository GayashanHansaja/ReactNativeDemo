import { StyleSheet, Text, View,FlatList, SafeAreaView ,ImageBackground} from 'react-native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ForcastItems from '../components/ForcastItems';
import { BlurView } from 'expo-blur';

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
    <ImageBackground style={styles.container}
    source={require('../assets/cat.jpeg')}>
      <View 
      style={{
        ...StyleSheet.absoluteFillObject,
        backgroundColor:'rgba(0,0,0,0.5)'}}/>
      <View >
  <Text style={styles.title}>{weather.name}</Text>
  <Text style={styles.temp}>{Math.floor(weather.main.temp - 273.15)}°C</Text>
        
      </View>
      
  <FlatList
    data={forecast}
    contentContainerStyle={styles.listContent}
    horizontal
    showsHorizontalScrollIndicator={false}
    renderItem={({ item }) => <ForcastItems forecast={item} />}
    keyExtractor={(item, index) => index.toString()}
  />
</ImageBackground>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
   // A soothing light blue background
    paddingHorizontal: 20,
    paddingVertical: 30,
    justifyContent: 'center',
    
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white', // A complementary darker green for the title
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 200,
  },
  temp: {
    fontSize: 80,
    fontWeight: '300',
    color: 'white', // Darker green for temperature
    textAlign: 'center',
    marginBottom: 20,
  },
  listContent: {
    gap: 20, // Moderate spacing between items
    paddingVertical: 20,
  },
});


export default MainScreen;
