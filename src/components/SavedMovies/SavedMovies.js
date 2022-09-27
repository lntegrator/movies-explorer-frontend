import React, { useState } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
import './SavedMovies.css';
import { useEffect } from "react";
import { filterMovies } from "../../utils/constants";
import mainApi from "../../utils/MainApi";

function SavedMovies(){

    // Стейт тоггла
    const [isShort, setShort] = useState(JSON.parse(localStorage.getItem('shortToggle')));

    // Достаем все фильмы
    const allMovies = JSON.parse(localStorage.getItem('savedMovies'));

    const page = 'SavedMovies';

    // Функция переключения тоггла
    function handleChangeToggle(){
        if (isShort){
            setShort(false);
            localStorage.setItem('shortToggle', JSON.stringify(false));
            return handleFilterMovies(localStorage.getItem('requestShort'), JSON.parse(localStorage.getItem('shortToggle')));
        } else {
            setShort(true);
            localStorage.setItem('shortToggle', JSON.stringify(true));
            return handleFilterMovies(localStorage.getItem('requestShort'), JSON.parse(localStorage.getItem('shortToggle')));
        }
    }

    // Стейт ошибки поиска
    const [error, setError] = useState('');
    
    // Стейт загрузки информации
    const [isLoading, setLoading] = useState(false);

    // Берем карточки из хранилища
    const [cards, setCards] = useState(JSON.parse(localStorage.getItem('savedMovies')));

    // Удаление фильма 
    function handleDeleteMovie(id){
        mainApi.deleteMovie(id)
        .then((res) => {
            mainApi.getSavedMovies()
            .then((res) => {
              localStorage.setItem('savedMovies', JSON.stringify(res));
              setCards(JSON.parse(localStorage.getItem('savedMovies')));
            })
            .catch((err) => {
              console.log(err);
            })        }
        )
        .catch((err) => {
        console.log(err);
        })
    }

    // Функция фильтрации карточек
    function handleFilterMovies(request, isShort){
        filterMovies(request, isShort, allMovies, setLoading, setError, page);
        setCards(JSON.parse(localStorage.getItem('filteredSavedMovies')));
        // console.log(JSON.parse(localStorage.getItem('filteredSavedMovies')))
        return
    }

    useEffect(() => {
        setLoading(isLoading);
    }, [cards, isLoading, isShort, setShort, allMovies]);

    return(
        <section className="saved-movies">
            <SearchForm
                setShort={handleChangeToggle}
                filterMovies={handleFilterMovies}
                isShort={isShort}
                searchError={error}
                page={'savedMovies'}
            />
            <Preloader
                isOn={isLoading}
            />
            <MoviesCardList
                isButtonVisible={false}
                cards={cards}
                page={'savedMovies'}
                handleDeleteMovie={handleDeleteMovie}
            />
            <div className="saved-movies__devider"></div>
        </section>
    )
}

export default SavedMovies;