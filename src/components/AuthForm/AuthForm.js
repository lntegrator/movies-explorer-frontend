import React from "react";
import { Link } from "react-router-dom";
import './AuthForm.css';
import { useState } from "react";
import { useFormWithValidation } from "../Validator/Validator";

function AuthForm({ formType, buttonText, text, linkText, link, onSubmit }){

    // Стейт состояния кнопки
    const [isDisabled, setDisabled] = useState(false);

    // Переменные для валидации 
    const { values, handleChange, errors, isValid } = useFormWithValidation();

    // Функция сабмита формы
    function handleSubmit(e){
        e.preventDefault();
        setDisabled(true);
        onSubmit(values);
        setDisabled(false);
    }


    return(
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <fieldset className="auth-form__fieldset">
                {formType === "registration" && (
                    <label className="auth-form__label">
                        Имя
                        <input
                            type="text"
                            placeholder="Имя"
                            className="auth-form__input"
                            name="name"
                            onChange={handleChange}
                            value={values.name || ''}
                            disabled={isDisabled}
                            minLength="3"
                            required
                        />
                        <span className="auth-form__error">{errors.name}</span>
                    </label>
                )}

                <label className="auth-form__label">
                    E-mail
                    <input
                        type="email"
                        placeholder="E-mail"
                        className="auth-form__input"
                        name="email"
                        onChange={handleChange}
                        value={values.email || ''}
                        disabled={isDisabled}
                        pattern="\S+@\S+\.\S+"
                        required
                    />
                    <span className="auth-form__error">{errors.email}</span>
                </label>

                <label className="auth-form__label">
                    Пароль
                    <input
                        type="password"
                        placeholder="Пароль"
                        className="auth-form__input"
                        name="password"
                        onChange={handleChange}
                        value={values.password || ''}
                        disabled={isDisabled}
                        required
                    />
                    <span className="auth-form__error">{errors.password}</span>
                </label>
            </fieldset>

            <div className="auth-form__btns">
                <button
                    className="auth-form__btn"
                    type="submit"
                    disabled={ isDisabled || !isValid }
                >
                    {buttonText}
                </button>
                <p className="auth-form__link-text">
                    {text}
                    <Link to={link} className="auth-form__link" type="button">{linkText}</Link>
                </p>
            </div>

        </form>
    )
}

export default AuthForm;