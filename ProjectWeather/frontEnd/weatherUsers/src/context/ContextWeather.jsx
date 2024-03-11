import React, {  useState, useEffect } from "react";

const WeatherTemperature = React.createContext();


function ContextWeather({children}){

    const [temperature, setTemperature] = useState({});

    useEffect(() => {
      const savedTemperature = localStorage.getItem("temperature");
      if (savedTemperature) {
        setTemperature(JSON.parse(savedTemperature));
      }
    }, []);
  
    useEffect(() => {
      localStorage.setItem("temperature", JSON.stringify(temperature));
    }, [temperature]);
    

  return(
        <WeatherTemperature.Provider value={{temperature, setTemperature}}>
        {children}
        </WeatherTemperature.Provider>
  )
}

export  {ContextWeather, WeatherTemperature};