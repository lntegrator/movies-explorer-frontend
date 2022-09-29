import React from "react";
import { useContext, useState, useEffect } from "react";
import { currentUserContext } from "../../contexts/currentUserContext";
import './ProfileForm.css';
import { useFormWithValidation } from "../Validator/Validator";

function ProfileForm({ onSignOut, onSubmit }){

    //Подписка на контекст
    const currentUser = useContext(currentUserContext);

    // Стейт редактирования полей
    const [isEdit, setEdit] = useState(false);

    // Функция изменения стейта редактирования полей
    function handleEdit(){
        setEdit(true);
    }

    // Стейт состояния кнопки "Сохранить"
    const [isDisabled, setDisabled] = useState(true);

    // Переменные для валидации 
    const { values, handleChange, errors, isValid, setValues } = useFormWithValidation();

    // Фунция сохранения данных
    function handleProfileSubmit(e){
        e.preventDefault();
        console.log(values.name)
        if ((values.name !== currentUser.name) || (values.email !== currentUser.email)){
            setDisabled(true);
            onSubmit({ name: values.name, email: values.email });
            setDisabled(false);
            return setEdit(false);
        }
    }
    
    // При загрузке страницы подставляем значения текущего пользователя
    useEffect(() => {
        setValues({ name: currentUser.name, email: currentUser.email });
    }, [currentUser, setValues])

    return(
        <form className="profile-form" onSubmit={handleProfileSubmit}>
            <div className="profile-form__container">
                <h1 className="profile-form__title">Привет, {currentUser.name}!</h1>
                <fieldset className="profile-form__info">
                    <div className="profile-form__info-string">
                        <label className="profile-form__label" htmlFor="username">Имя</label>
                        <input 
                            className="profile-form__input"
                            name="name"
                            disabled={!isEdit}
                            value={values.name || ''}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="profile-form__devider"></div>
                    <div className="profile-form__info-string">
                        <label className="profile-form__label" htmlFor="email">E-mail</label>
                        <input 
                            className="profile-form__input"
                            name="email"
                            value={values.email || ''}
                            required
                            disabled={!isEdit}
                            onChange={handleChange}
                            pattern='\S+@\S+\.\S+'
                        />
                    </div>
                    <span className="profile-form__error">{errors.email}</span>
                </fieldset>
            </div>

            <div className="profile-form__buttons">

                {isEdit ? 
                    <button
                        className="profile-form__button"
                        type="submit"
                        disabled={!isValid || !isDisabled}
                    >
                        Сохранить
                    </button>
                    :
                    <button
                        className="profile-form__button"
                        type="button"
                        onClick={handleEdit}
                    >
                        Редактировать
                    </button> 
                    }

                <button
                    className="profile-form__button profile-form__button_red"
                    type="button"
                    onClick={onSignOut}
                >
                    Выйти из аккаунта
                </button>
            </div>
        </form>
    )
}

export default ProfileForm;