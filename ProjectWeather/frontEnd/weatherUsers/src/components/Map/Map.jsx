import React, { useState, useEffect, useContext } from "react";
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { WeatherTemperature } from "../../context/ContextWeather";
import style from './Map.module.css';

const MapContainer = ({ google, latitude, longitude, stateData }) => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const { temperature } = useContext(WeatherTemperature);



  useEffect(() => {
    const savedState = JSON.parse(localStorage.getItem("mapState"));
    if (savedState) {
      setSelectedPlace(savedState.selectedPlace);
      setMarkerPosition(savedState.markerPosition);
      setCurrentTime(savedState.currentTime);
    }



    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);



  useEffect(() => {
    localStorage.setItem("mapState", JSON.stringify({ selectedPlace, markerPosition, currentTime }));


    if (stateData && stateData.picture && stateData.picture.large) {
      setSelectedPlace(stateData.picture.large);
    }

    setMarkerPosition({ lat: latitude, lng: longitude });

  }, [latitude, longitude, stateData, selectedPlace, markerPosition, currentTime]);



  const infoWindowStyle = {
    position: "absolute",
    marginTop: "20px",
    marginLeft: "30px",
    top: "-70px",
    left: "-20px",
    backgroundColor: "white",
    padding: "5px",
    borderRadius: "5px",
    boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.5)",
    zIndex: 1000
  };


  
  return (
    <div className={style.mapContainer}>
      <Map google={google} zoom={4} initialCenter={{ lat: latitude, lng: longitude }}>
        <Marker position={markerPosition} />
        {selectedPlace && (
          <div style={{ ...infoWindowStyle, left: markerPosition.lng, top: markerPosition.lat }}>

            <img src={selectedPlace} alt="Selected place" />

            <div>{`${stateData.name.first} ${stateData.name.last}`}</div>
            <div className={style.color__timer}>Time: {currentTime}</div>

            {temperature && temperature[stateData.login.uuid] && (
              <div className={style.color__temperatura}>Temperature {temperature[stateData.login.uuid].current_weather.temperature + ' '
                + temperature[stateData.login.uuid].current_weather_units.temperature}</div>
            )}
          </div>
        )}
      </Map>
    </div>
  );
};



export default GoogleApiWrapper({
  apiKey: 'AIzaSyDGC6N95KEFovjeemUXy2NuLe2JGOId14M'
})(MapContainer);

