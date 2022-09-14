import React from "react";
import './ProfileForm.css';

function ProfileForm(){
    return(
        <form className="profile-form">
            <div className="profile-form__container">
                <h1 className="profile-form__title">Привет, юзернейм!</h1>
                <fieldset className="profile-form__info">
                    <div className="profile-form__info-string">
                        <label className="profile-form__label" htmlFor="username">Имя</label>
                        <input 
                            className="profile-form__input"
                            id="username"
                            placeholder="Username"
                            required
                            disabled
                        />
                    </div>
                    <div className="profile-form__devider"></div>
                    <div className="profile-form__info-string">
                        <label className="profile-form__label" htmlFor="email">E-mail</label>
                        <input 
                            className="profile-form__input"
                            id="email"
                            placeholder="mail@freedom.ua"
                            required
                            disabled
                        />
                    </div>
                </fieldset>
            </div>
            <div className="profile-form__buttons">
                <button className="profile-form__button" type="button">Редактировать</button>
                <button className="profile-form__button profile-form__button_red" type="button">Выйти из аккаунта</button>
            </div>
        </form>
    )
}

export default ProfileForm;