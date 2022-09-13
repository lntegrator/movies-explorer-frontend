import React from "react";
import './Portfolio.css';

function Portfolio(){
    return(
        <section className="portfolio">
            <h3 className="portfolio__title">Портфолио</h3>
            <div className="portfolio__links">
                <a href='https://github.com/lntegrator/russian-travel' className="portfolio__link" target="_blank" rel="noopener noreferrer">Статичный сайт <span>↗</span></a>
                <a href='https://github.com/lntegrator?tab=repositories' className="portfolio__link" target="_blank" rel="noopener noreferrer">Адаптивный сайт<span>↗</span></a>
                <a href='https://github.com/lntegrator/react-mesto-api-full' className="portfolio__link" target="_blank" rel="noopener noreferrer">Одностраничное приложение<span>↗</span></a>
            </div>
        </section>
    )
}

export default Portfolio;