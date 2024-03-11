import React, { useContext, useEffect, useState, Suspense } from "react";
import style from './FirstPage.module.css';
import loader from './img/loader.svg'

import { WeatherTemperature } from "../../context/ContextWeather";

const Temperature = React.lazy(() => import("./Temperature/Temperature"));
const ButtonFirstPage = React.lazy(() => import("../ButtonFirstPage/ButtonFirstPage"));

function FirstPage() {
    const [stateData, setStateData] = useState([]);
    const { temperature, setTemperature} = useContext(WeatherTemperature);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);



    
    useEffect(() => {    
        setLoading(true);
        fetch(`https://randomuser.me/api/?results=8&page=${currentPage}`)
            .then(result => result.json())
            .then(data => {
                setStateData(prevState => [...prevState, ...data.results]);
                setLoading(false);
    
                data.results.forEach(({ login, location }) => {
                    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${location.coordinates.latitude}&longitude=${location.coordinates.longitude}&current_weather=true&hourly=temperature_2m`)
                        .then(result => result.json())
                        .then(resultWeather => {
                            setTemperature(prevState => ({ ...prevState, [login.uuid]: resultWeather }));
                        })
                        .catch(error => {
                            console.error('Произошла ошибка при загрузке данных о погоде:', error);
                        });
                });
            })
            .catch(error => console.error('Помилка завантаження користувачів:', error));
    }, [currentPage, setTemperature]);
    


    const loadMoreUsers = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };



    return (
        <div className={style.block__color}>
            <div className={style.container__block} >
                {stateData.map(({ picture, name, gender, email, login, location }, id) => (
                    <div key={id} className={style.container_card}>
                        <h3 className={style.title}>Information about User</h3>
                        <img src={picture.large} width={'260px'} alt="User" />
                        <div className={`${style.content__cardName} ${style.content__cardPadding}`}>Name: {`${name.first} ${name.last}`}</div>
                        <div className={`${style.content__cardGender} ${style.content__cardPadding}`}>Gender: {gender}</div>
                        <div className={`${style.content__cardStreet} ${style.content__cardPadding}`}>Street: {`${location.street.number}, ${location.street.name}`}</div>
                        <div className={`${style.content__cardEmail} ${style.content__cardPadding}`}>Email: {email}</div>
                        <div className={`${style.title}`}>Information about weather</div>
                        {temperature[login.uuid] && (
                            <Suspense fallback={<div>Loading...</div>}>
                                <Temperature temperature={temperature[login.uuid]} />
                            </Suspense>
                        )}
                        <Suspense fallback={<div>Loading...</div>}>
                            <ButtonFirstPage page={true} stateData={{ picture, name, gender, email, login, location }} />
                        </Suspense>
                    </div>
                ))}
            </div>


            {loading &&
                 <div className={style.container__loader}>
                     <img src={loader} alt="loader"/>
                     <div className={style.loader__text}>Loading...</div>
                </div>}

                     <div className={style.button__loaderPosition}>
                        <button onClick={loadMoreUsers} className={style.button__contentLoader}  disabled={loading}>Load More</button>
                    </div>  
        </div>
    );
}

export default FirstPage;
