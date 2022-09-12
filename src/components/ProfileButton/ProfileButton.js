import React from "react";
import { NavLink } from "react-router-dom";
import './ProfileButton.css';

function ProfileButton(){
    return(
        <NavLink to="/profile" className="profile-btn">
            Аккаунт
            <div className="profile-btn__icon"></div>
        </NavLink>
    )
}

export default ProfileButton;