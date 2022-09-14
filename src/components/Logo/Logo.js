import React from "react";
import './Logo.css';
import logo from '../../images/logo.svg';
import { Link } from "react-router-dom";

function Logo() {
    return(
        <Link to='/' className="logo__link"><img src={logo} alt='Логотип сервиса' className="logo__img"/></Link>
    )
}

export default Logo;