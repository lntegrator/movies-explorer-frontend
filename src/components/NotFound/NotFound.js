import React from "react";
import { Link } from "react-router-dom";
import './NotFound.css';

function NotFound() {
    return(
        <section className="not-found">
            <div className="not-found__container">
                <h1 className="not-found__title">404</h1>
                <p className="not-found__subtitle">Страница не найдена</p>
            </div>
            <Link to="/" className="not-found__backlink">Назад</Link>
        </section>
    )
}

export default NotFound;