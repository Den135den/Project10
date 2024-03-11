import React from "react";
import style from "./Temperature.module.css";
import Sunny from '../img/sunny.png';
import Cloudy from '../img/cloudy.png';
import Cold from '../img/Cold.svg'
import Hot from '../img/Hot.png'
import Freez from '../img/Freez.png'


function Temperature({ temperature }) {
   
    return (
        <div>
            {temperature && (
                <div className={style.temperature__block} >
                    
                    <div className={style.temperature}>

                        <div> 
                            Current Temperature: {temperature.current_weather.temperature + ' ' + temperature.current_weather_units.temperature} 
                        </div>

                        <div className={style.content__temperature}> 
                            Lowest Temperature: {Math.min(...temperature.hourly.temperature_2m)}
                        </div> 

                        <div className={style.content__temperature}>   
                            Highest Temperature: {Math.max(...temperature.hourly.temperature_2m)}
                        </div>   

                    </div>
                    <div className={style.temperature}> 
                        <img
                        src={
                            temperature?.current_weather?.temperature > 25? Sunny :
                            temperature?.current_weather?.temperature >= 15 && temperature?.current_weather?.temperature <= 25 ? Hot : 
                            temperature?.current_weather?.temperature < 15 && temperature?.current_weather?.temperature >= 0 ? Cloudy : 
                            temperature?.current_weather?.temperature < 0  && temperature?.current_weather?.temperature > -10 ? Cold :
                            Freez
                        }
                       
                            width={'70px'}   
                            alt="Logo_weather"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Temperature;
