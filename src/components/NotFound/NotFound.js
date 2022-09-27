import React from "react";
import { useHistory } from "react-router-dom";
import './NotFound.css';

function NotFound() {

    const history = useHistory();
    const goBack = () => {
        history.goBack();
    }

    console.log(history)

    return(
        <section className="not-found">
            <div className="not-found__container">
                <h1 className="not-found__title">404</h1>
                <p className="not-found__subtitle">Страница не найдена</p>
            </div>
            <button
                type="button"
                className="not-found__backlink"
                onClick={goBack}>
                Назад
            </button>
        </section>
    )
}

export default NotFound;