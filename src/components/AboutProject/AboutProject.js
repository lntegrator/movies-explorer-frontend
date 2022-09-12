import React from "react";
import SectionTitle from "../SectionTitle/SectionTitle";
import "./AboutProject.css";

function AboutProject() {
    return(
        <section className="about-project" id="about-project" >

            <SectionTitle
            title="О проекте"
             />

            <div className="about-project__info">

                <div className="about-project__info-block">
                    <h3 className="about-project__info-subtitle">Дипломный проект включал 5 этапов</h3>
                    <p className="about-project__info-text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </div>

                <div className="about-project__info-block">
                    <h3 className="about-project__info-subtitle">На выполнение диплома ушло 5 недель</h3>
                    <p className="about-project__info-text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
            </div>

            <div className="about-project__periods">
                <div className="about-project__period">
                    <p className="about-project__period-week">1 неделя</p>
                    <p className="about-project__period-info">Back-end</p>
                </div>
                <div className="about-project__period">
                    <p className="about-project__period-week about-project__period-week_front">4 недели</p>
                    <p className="about-project__period-info">Front-end</p>
                </div>
            </div>
        </section>
    )
};

export default AboutProject;