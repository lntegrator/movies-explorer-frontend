import React from "react";
import { NavLink } from "react-router-dom";
import './NavigationMain.css';

function NavigationMain() {
    return(
        <nav className="navigation-main">
            <NavLink exact to="/signup" className="navigation-main__link">Регистрация</NavLink>
            <NavLink exact to="/signin" className="navigation-main__signin-btn">Войти</NavLink>
        </nav>
    )
};

export default NavigationMain;