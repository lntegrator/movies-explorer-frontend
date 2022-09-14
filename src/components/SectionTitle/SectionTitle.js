import React from "react";
import './SectionTitle.css';

function SectionTitle(props) {
    return(
        <div className="section-title__container">
            <h2 className="section-title__text">{props.title}</h2>
        </div>
    )
};

export default SectionTitle;