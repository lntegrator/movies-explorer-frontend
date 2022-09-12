import React from "react";
import './Burger.css';

function Burger({ onBurger }){
    return(
        <button 
            className="burger-btn"
            onClick={onBurger}
        />
    )
}

export default Burger;