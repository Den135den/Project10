import React, { useState, useRef, useEffect } from "react";
import style from "./Menu.module.css";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { LinkUser, RouteUser } from "../../routes/Routes";
import menu from './img/menu.svg'


function Menu() {
  const [isOpen, setIsOpen] = useState(false); 
  const menuRef = useRef(null);
  const menuToggleRef = useRef(null);


  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };


  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target) && !menuToggleRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };



  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);





  return (
    <BrowserRouter>
      <div className={style.mainContainer}>
        <nav className={style.navbar}>
          <div className={style.navbarContainer}>
            <div ref={menuRef} className={`${style.menu} ${isOpen ? style.open : ''}`}>
                {LinkUser.map(({ id, to, value }) => (
                    <NavLink to={to} className={style.value__link}>
                      {value}
                    </NavLink>
                 
                ))}
            </div>
            <img ref={menuToggleRef} className={style.menuToggle} onClick={toggleMenu} src={isOpen ? menu : menu} alt="Menu"/>
          </div>
        </nav>

        {RouteUser.map(({ id, path, components }) => (
          <Routes key={id}>
            <Route path={path} element={components} />
          </Routes>
        ))}
        
      </div>
    </BrowserRouter>
  );
}

export default Menu;
