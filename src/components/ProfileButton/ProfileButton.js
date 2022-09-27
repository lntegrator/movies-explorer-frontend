import React from "react";
import { NavLink } from "react-router-dom";
import './ProfileButton.css';

function ProfileButton({ onClick }){
    return(
        <NavLink to="/profile" className="profile-btn" onClick={onClick}>
            Аккаунт
            <div className="profile-btn__icon"></div>
        </NavLink>
    )
}

export default ProfileButton;