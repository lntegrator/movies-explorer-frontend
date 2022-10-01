import React from "react";
import './SearchForm.css';
import icon from '../../images/search.svg';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useState } from "react";
import { useEffect } from "react";

function SearchForm({ isShort, filterMovies, searchError, setShort, page }){

     // Стейт запроса
     const [request, setRequest] = useState('');

    // Стейт ошибки под полем поиска
    const [error, setError] = useState('');

    //Переменная со всеми фильмами
    const allMovies = JSON.parse(localStorage.getItem('movies'));

    // Дефолтное значение поля поиска
    const defaultRequest = page==='savedMovies' ? '' : localStorage.getItem('request');

    //Функция сабмита формы
    function handleSubmit(e){
        e.preventDefault();
        if (request){
            if (page==='movies'){
                localStorage.setItem('request', request);
            }
            filterMovies(request, isShort, allMovies);
            return setError('');
        }
        return setError('Нужно ввести ключевое слово');
    }

    // Функция изменения стейта поля при вводе
    function handleChange(e){
        setRequest(e.target.value);
    }

    useEffect(() => {
        setRequest(request);
    }, [request])

    return(
        <section className="search">
            <form className="search__form" onSubmit={handleSubmit} noValidate>
                <div className="search__field">
                    <input
                        className="search__input"
                        placeholder="Фильм"
                        onChange={handleChange}
                        defaultValue = {defaultRequest}
                        required
                    />
                    <button className="search__button" type="submit"><img src={icon} alt='Иконка'/></button>
                </div>
                <span className="search__error">{ error }</span>
                
                <FilterCheckbox
                    setShort={setShort}
                    isShort={isShort}
                />
                <span className="search__error">{ searchError }</span>
            </form>
        </section>
    )
}

export default SearchForm;