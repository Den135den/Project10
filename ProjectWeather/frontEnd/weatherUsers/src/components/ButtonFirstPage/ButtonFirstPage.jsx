import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUserFirstPage, removeUserFirstPage } from "../../redux/action/action";
import style from "./ButtonFirstPage.module.css";
import MapContainer from "../Map/Map";

function ButtonFirstPage({ stateData, page }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [stateButton, setStateButton] = useState(true);
  const dispatch = useDispatch();

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleAddUser = () => {
    dispatch(addUserFirstPage(stateData));
    setStateButton(false);
  };

  const handleRemoveUser = () => {
    dispatch(removeUserFirstPage(stateData));
    setStateButton(true);
  };

  return (
    <div className={style.container__button}>
      {page && (
        stateButton ? (
          <button className={style.button__content} onClick={handleAddUser}>
            Зберегти
          </button>
        ) : (
          <button className={style.button__content} onClick={handleRemoveUser}>
            Удалить
          </button>
        )
      )}
      <button className={`${style.button__content2} ${style.button__contentMargin}`} onClick={openModal}>
        Погода
      </button>

      
      {modalOpen && (
        <div className={style.modal}>
          <div className={style.modalContent}>
            <span className={style.close} onClick={closeModal}>&times;</span>
            <MapContainer
              stateData={stateData}
              latitude={stateData.location.coordinates.latitude}
              longitude={stateData.location.coordinates.longitude}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ButtonFirstPage;
