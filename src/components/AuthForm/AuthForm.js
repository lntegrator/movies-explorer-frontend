import React from "react";
import { Link } from "react-router-dom";
import './AuthForm.css';

function AuthForm({ formType, buttonText, text, linkText, link }){

    return(
        <form className="auth-form" noValidate>
            <fieldset className="auth-form__fieldset">
                {formType === "registration" && (
                    <label className="auth-form__label">
                        Имя
                        <input
                            type="text"
                            placeholder="Имя"
                            required
                            className="auth-form__input"
                        />
                        <span className="auth-form__error">Какая-то ошибка</span>
                    </label>
                )}

                <label className="auth-form__label">
                    E-mail
                    <input
                        type="email"
                        placeholder="E-mail"
                        required
                        className="auth-form__input"
                    />
                    <span className="auth-form__error">Какая-то ошибка</span>
                </label>

                <label className="auth-form__label">
                    Пароль
                    <input
                        type="password"
                        placeholder="Пароль"
                        required
                        className="auth-form__input"
                    />
                    <span className="auth-form__error">Какая-то ошибка</span>
                </label>
            </fieldset>

            <div className="auth-form__btns">
                <button className="auth-form__btn">{buttonText}</button>
                <p className="auth-form__link-text">
                    {text}
                    <Link to={link} className="auth-form__link">{linkText}</Link>
                </p>
            </div>

        </form>
    )
}

export default AuthForm;

// className={`navigation-mobile ${isOpen && 'navigation-mobile_active'}`