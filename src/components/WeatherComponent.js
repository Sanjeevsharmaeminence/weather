
// WeatherContext.js

import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const WeatherContext = createContext();

export const useWeatherContext = () => {
  return useContext(WeatherContext);
};

export const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchCity, setSearchCity] = useState('delhi');
  const updateSearchCity = (city) => {

    setSearchCity(city);
  };
  useEffect(() => {
   
   
           // let city='delhi'
            let key= '5516e9c7e64c1e009c378bebccf9334b';
    // Fetch weather data from the OpenWeatherMap API
    const fetchData = async () => {
      try {
        
        const response = await axios.get( `https://api.openweathermap.org/data/2.5/forecast?q=${searchCity}&appid=${key}` );
        console.log(response," Weather app  is -> ");
        //const data = response.data.list;
        const data = response.data;
        setWeatherData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [searchCity]);

  return (
    <WeatherContext.Provider value={{ weatherData, loading, searchCity, updateSearchCity }}>
      {children}
    </WeatherContext.Provider>
  );
};

