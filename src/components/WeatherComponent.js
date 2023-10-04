import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { useWeatherContext } from './WeatherContext';

const WeatherComponent = () => {
  const { weatherData, loading, updateSearchCity } = useWeatherContext();
  const [searchCity, setSearchCity] = useState('');
  const [checkDate, setCheckDate] = useState(correct_Date_TimE());
  const [Apidata, setApiData] = useState(weatherData);
  const [runEffect, setRunEffect] = useState(true)
  const [userSearch, setUserSearch] = useState(false)
  let city_Nane = weatherData?.city?.name;

  useEffect(() => {
    setApiData(weatherData);
  }, [runEffect, loading, city_Nane])
  /*                  date and time                      */

  function correct_Date_TimE() {
    const currentDateAndTime = new Date();
    // currentDateAndTime.setHours('02');
    currentDateAndTime.setMinutes('00');
    currentDateAndTime.setSeconds('00');
    let currentHours = currentDateAndTime.getHours();
    const remainder = currentHours % 3;

    if (remainder !== 0) {
      const adjustment = remainder === 1 ? 2 : 1;
      currentHours += adjustment;
      currentDateAndTime.setHours(currentHours);
    }

    return currentDateAndTime;
  }
  /*                                   date and time         */



  const handleDateChange = (e) => {
    setUserSearch(true);
    const newDate = (e.target.value);
    checkDate.setDate(newDate.toString());
    setCheckDate(checkDate);
    setRunEffect(!runEffect)


  };

  const handleTimeChange = (e) => {
    const newTime = (e.target.value);
    checkDate.setHours(newTime.toString());
    setCheckDate(checkDate);
    setRunEffect(!runEffect)
    setUserSearch(true);
    // console.log(userSearch," -> -> -> ");
  };

  const find_City = (event) => {
    setSearchCity(event.target.value);
  }
  const Search_Click = () => {


    updateSearchCity(searchCity); //->> Update searchCity with the new value ->> 
    setSearchCity('');
  }

  function get_Date(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    let formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }
  function get_Time(date) {
    // Get the time in the format "HH:MM:SS"
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const formattedTime = `${hours}:${minutes}:${seconds}`;
    return formattedTime;
  }
  if (loading) {

    return (
      <div className="flex h-screen items-center justify-center">
        <div className="bg-blue-500 text-white p-4 rounded-lg shadow-lg">
          <svg className="animate-spin h-8 w-8 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"
            ></circle>
            <path className="opacity-75" fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291a7.962 7.962 0 01-2-.291h2v2c0 1.104.896 2 2 2V14H6.001z"
            ></path> </svg>
          Loading...
        </div>
      </div>
    );


  }

  return (
    <div>
      <div className="bg-blue-500 p-4 text-white flex justify-between items-center">
        <h1 className="text-2xl font-bold">Weather Report for {city_Nane} </h1>

        <div className="flex items-center space-x-4">
          <label htmlFor="date" className="text-gray-700 text-sm font-bold">
            Select Date:
          </label>
          <select
            id="date"
            value=''
            onChange={handleDateChange}
            className="px-4 py-2 border-none bg-blue-500 text-gray-700">
            <option value="">{get_Date(checkDate)}</option>
            <option value="04">2023-10-04</option>
            <option value="05">2023-10-05</option>
            <option value="06">2023-10-06</option>
            <option value="07">2023-10-07</option>
            <option value="08">2023-10-08</option>
          </select>

          <label htmlFor="time" className="text-gray-700 text-sm  font-bold">
            Select Time:
          </label>
          <select
            id="time"
            value=''
            onChange={handleTimeChange}
            className="px-4 py-2 border-none text-gray-700 bg-blue-500">
            <option value=""> {get_Time(checkDate) === '00:00:00' ? 'All' : get_Time(checkDate)}</option>
            <option value="09">09:00:00</option>
            <option value="12">12:00:00</option>
            <option value="15">15:00:00</option>
            <option value="18">18:00:00</option>
            <option value="21">21:00:00</option>
            <option value="03">03:00:00</option>
            <option value="06">06:00:00</option>
            <option value="00">All</option>
          </select>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Search location..."
            onChange={(event) => find_City(event)}
            value={searchCity}
            className="py-2 px-4 pr-10 rounded-full border-none outline-none bg-gray-100 text-gray-800"
          />
          <button
            onClick={Search_Click}
            className="absolute ml-4 top-0 right-0 bottom-0 px-4 py-2 rounded-full bg-blue-400 text-white hover:bg-blue-600">
            Search
          </button>
        </div>
      </div>

      <ul>
        {Apidata.list?.map((hourlyData, index) => { //  formatTimedigit formatDatedigit
          let API_Time = new Date(hourlyData.dt_txt);
          // console.log(userSearch," -> -> -> ");
          if (API_Time.getFullYear() === checkDate.getFullYear() &&
            API_Time.getMonth() === checkDate.getMonth() &&
            API_Time.getDate() === checkDate.getDate() &&
            (
              (!userSearch && API_Time.getHours() >= checkDate.getHours()) ||
              (userSearch && API_Time.getHours() === checkDate.getHours())
            ) &&
            API_Time.getMinutes() === checkDate.getMinutes()
          ) {

            return (
              <li
                key={index}
                className="w-1/2 p-4 m-4 rounded-lg shadow-md bg-gradient-to-r from-blue-200 via-blue-500 to-blue-200 text-gray-800 hover:bg-blue-400 hover:text-gray-900 mx-auto"
              >
                <div className="flex flex-col items-center space-y-2">
                  <p>
                    <span className="font-semibold">Date:</span> {get_Date(API_Time)}
                  </p>
                  <p>
                    <span className="font-semibold">Time:</span> {get_Time(API_Time)}
                  </p>
                  <div className="flex items-center space-x-4">

                    <p className="text-2xl font-semibold">{hourlyData.weather[0].description}</p>
                  </div>

                  <p>
                    <span className="font-semibold">Temperature:</span> {hourlyData.main.temp}°C
                  </p>
                  <p>
                    <span className="font-semibold">Wind:</span> {Math.round(hourlyData.wind.speed * 3.6)} km/h
                  </p>
                  {/* Add more details if needed */}
                </div>
              </li>
            );


          }
        }
        )}
      </ul>

    </div >
  );
};

export default WeatherComponent;
