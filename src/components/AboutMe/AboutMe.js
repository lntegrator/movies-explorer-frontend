import React from "react";
import './AboutMe.css';
import Avatar from '../../images/avatar.jpg';
import SectionTitle from "../SectionTitle/SectionTitle";
import Portfolio from "../Portfolio/Portfolio";

function AboutMe(){
    return(
        <section className="aboutme" id="about-me">
            <SectionTitle
            title="Студент" />

            <div className="aboutme__container">
                <div className="aboutme__info">
                    <div className="aboutme__resume">
                        <h3 className="aboutme__name">Василий</h3>
                        <p className="aboutme__speciality">Web-разработчик, 27 лет</p>
                        <p className="aboutme__text">Родился и живу в Алматы, Казахстан. Работаю дизайнером, учу веб-разработку для ухода в фриланс и разработки собственных проектов.</p>
                    </div>
                    <a href='https://github.com/lntegrator?tab=repositories' className="aboutme__link" target="_blank" rel="noopener noreferrer">Github</a>
                </div>
                <img src={Avatar} alt="Yanchuk Vassiliy" className="aboutme__photo" />
            </div>

            <Portfolio />

        </section>
    )
}

export default AboutMe;