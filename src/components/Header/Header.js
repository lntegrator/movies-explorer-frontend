import React from "react";
import './Header.css';
import Navigation from "../Navigation/Navigation";
import NavigationMain from "../NavigationMain/NavigationMain";
import Burger from "../Burger/Burger";
import Logo from "../Logo/Logo";

function Header({ onBurger, page, loggedIn }) {

    if (!loggedIn){
        return(
            <header className="header header_main">
                <div className="header__container">
                    <Logo />
                    <NavigationMain />
                </div>
            </header>
        );
    }

    return(
        <header className={`header ${page==="main" && 'header_main'}`}>
            <div className="header__container">
                <Logo />
                <Navigation />
                <Burger
                    onBurger={ onBurger }
                />
            </div>
        </header>
    );
}

export default Header;