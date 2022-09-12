import React from "react";
import "./Promo.css"
import banner from "../../images/promo-banner.svg"

function Promo() {
    return(
        <section className="promo">
            <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
            <img src={banner} alt="Paraktikum Logo" className="promo__img"/>
        </section>
    )
}

export default Promo;