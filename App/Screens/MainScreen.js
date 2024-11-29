import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useEffect ,useState} from 'react';
import { ActivityIndicator } from 'react-native-web';

/* const Base_URL=`https://api.openweathermap.org/data/2.5/weather`;
const WEATHER_API_KEY=process.env.EXPO_PUBLIC_WEATHER_API_KEY; */
const url=`https://api.openweathermap.org/data/2.5/weather?lat=6.9319&lon=79.8478&appid=d323256bf52779f543c075f21d31fbac`

type Weather={
    name:String;
    main:{
        temp: number;
        feels_like:number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
        sea_level: number;
        grnd_level:number;
    }
}
const MainScreen =()=> {
    const [weather,setWeather]=useState<Weather>(null);
    const fetchWeather=async()=>{
        const lat=6.9319;
        const long=79.8478;

        const result=await fetch(
            url/* `${Base_URL}?lat=${lat}&lon=${long}&appid=${WEATHER_API_KEY}` */
        );
        const data=await result.json();
        console.log(data);
        setWeather(data);

    };

    useEffect(()=>{
        fetchWeather();
    },[]);
    if (!weather){
        return<ActivityIndicator/>
    }

  return (
    <View>
        <Text>{weather.name}</Text>
    </View>
  );
};

export default MainScreen;