import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import style from "./SecondPage.module.css";
import { WeatherTemperature } from "../../context/ContextWeather";
import Temperature from "../FirstPage/Temperature/Temperature";
import ButtonFirstPage from "../ButtonFirstPage/ButtonFirstPage";

function SecondPage() {
  const [usersNotFound, setUsersNotFound] = useState(false);
  const { temperature } = useContext(WeatherTemperature);
  const users = useSelector(state => state.data);

  useEffect(() => {
    if (users.length === 0) {
      setUsersNotFound(true);
    } else {
      setUsersNotFound(false);
    }
  }, [users]);

  return (
    <>
      {usersNotFound ? (
        <div className={style.userNotFound}>Користувачів не знайдено</div>
      ) : (
        <div className={style.block__color}>
          <div className={style.container__block}>
            {users.map(({ picture, name, id, gender, email, login, location }) => (
              <div key={name} className={style.container_card}>
                <h3 className={style.title}>Information about User</h3>
                <img src={picture.large} width={'260px'} alt="User" />
                <div className={`${style.content__cardName} ${style.content__cardPadding}`}>Name: {`${name.first} ${name.last}`}</div>
                <div className={`${style.content__cardGender} ${style.content__cardPadding}`}>Gender: {gender}</div>
                <div className={`${style.content__cardStreet} ${style.content__cardPadding}`}>Street: {`${location.street.number}, ${location.street.name}`}</div>
                <div className={`${style.content__cardEmail} ${style.content__cardPadding}`}>Email: {email}</div>
                <div className={`${style.title}`}>Information about weather</div>
                {temperature[login.uuid] && (
                  <Temperature temperature={temperature[login.uuid]} />
                )}
                <ButtonFirstPage page={false} stateData={{ picture, name, id, gender, email, login, location }} />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default SecondPage;
