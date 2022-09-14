import React from "react";
import { Link } from "react-router-dom";
import "./NavTab.css";

function NavTab(){
    return(
        <div className="navtab">
            <nav className="navtab__links">
                <a href="#about-project" className="navtab__link">О проекте</a>
                <a href="#techs" className="navtab__link">Технологии</a>
                <a href="#about-me" className="navtab__link">Студент</a>
            </nav>
        </div>
    );
}

export default NavTab;