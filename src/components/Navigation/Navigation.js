import React from "react";
import { NavLink } from "react-router-dom";
import './Navigation.css';
import ProfileButton from "../ProfileButton/ProfileButton";

function Navigation(){
    return(
        <nav className="navigation">
            <NavLink to="/movies" className="navigation__link" activeClassName="navigation__link_active">Фильмы</NavLink>
            <NavLink to="/saved-movies" className="navigation__link" activeClassName="navigation__link_active">Сохраненные фильмы</NavLink>
            <ProfileButton />
        </nav>
    )
}

export default Navigation;