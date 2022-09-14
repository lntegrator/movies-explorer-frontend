import React from "react";
import { NavLink } from "react-router-dom";
import ProfileButton from "../ProfileButton/ProfileButton";
import './NavigationMobile.css';

function NavigationMobile({ isOpen, onClose }) {
    return(
        <div className={`navigation-mobile ${isOpen && 'navigation-mobile_active'}`}>
            <div className="navigation-mobile__container">
                <button
                    className="navigation-mobile__close-btn"
                    onClick={onClose}
                    type="button"
                />
                <nav className="navigation-mobile__nav">
                    <NavLink exact to="/" className="navigation__link" activeClassName="navigation-mobile__active">Главная</NavLink>
                    <NavLink to="/movies" className="navigation__link" activeClassName="navigation-mobile__active">Фильмы</NavLink>
                    <NavLink to="/saved-movies" className="navigation__link" activeClassName="navigation-mobile__active">Сохраненные фильмы</NavLink>
                </nav>
                <ProfileButton />
            </div>
            <div className="navigation-mobile__cover" onClick={onClose}></div>
        </div>
    )
}

export default NavigationMobile;