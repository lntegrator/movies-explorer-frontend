import React from "react";
import './Portfolio.css';

function Portfolio(){
    return(
        <section className="portfolio">
            <h3 className="portfolio__title">Портфолио</h3>
            <ul className="portfolio__links">
                <li className="portfolio__link"><a href='https://github.com/lntegrator/russian-travel' className="portfolio__link-text" target="_blank" rel="noopener noreferrer">Статичный сайт</a> ↗</li>
                <li className="portfolio__link"><a href='https://github.com/lntegrator?tab=repositories' className="portfolio__link-text" target="_blank" rel="noopener noreferrer">Адаптивный сайт</a> ↗</li>
                <li className="portfolio__link"><a href='https://github.com/lntegrator/react-mesto-api-full' className="portfolio__link-text" target="_blank" rel="noopener noreferrer">Одностраничное приложение</a> ↗</li>
            </ul>
        </section>
    )
}

export default Portfolio;