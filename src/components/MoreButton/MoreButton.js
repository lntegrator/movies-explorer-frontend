import React from "react";
import './MoreButton.css';

function MoreButton({ onClick }){
    return(
        <button
            className="more-button"
            type="button"
            onClick={onClick}
        >
            Ещё
        </button>
    )
}

export default MoreButton;