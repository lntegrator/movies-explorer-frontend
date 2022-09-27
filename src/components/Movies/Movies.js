import React, { useState } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import './Movies.css';
import '../Preloader/Preloader';
import Preloader from "../Preloader/Preloader";
import { useEffect } from "react";
import { filterMovies } from "../../utils/constants";
import mainApi from "../../utils/MainApi";

function Movies({ handleSaveMovie }){

    // Стейт тоггла
    const [isShort, setShort] = useState(JSON.parse(localStorage.getItem('toggle')));

    // Достаем все фильмы
    const [allMovies, setAllMovies] = useState(JSON.parse(localStorage.getItem('movies')));
    // console.log(JSON.parse(localStorage.getItem('movies')));
    console.log(allMovies)

    const [buttonClass, setButtonClass] = useState('movies-card__btn');

    // Функция переключения тоггла
    function handleChangeToggle(){
        if (isShort){
            setShort(false);
            localStorage.setItem('toggle', JSON.stringify(false));
            return handleFilterMovies(localStorage.getItem('request'), JSON.parse(localStorage.getItem('toggle')));
        } else {
            setShort(true);
            localStorage.setItem('toggle', JSON.stringify(true));
            return handleFilterMovies(localStorage.getItem('request'), JSON.parse(localStorage.getItem('toggle')));
        }
    }

    // Удаление фильма 
    function handleDeleteMovie(id){
        mainApi.deleteMovie(id)
        .then((res) => {
            mainApi.getSavedMovies()
            .then((res) => {
              localStorage.setItem('savedMovies', JSON.stringify(res));
            })
            .catch((err) => {
              console.log(err);
            })        }
        )
        .catch((err) => {
        console.log(err);
        })
    }

    // Стейт ошибки поиска
    const [error, setError] = useState('');
    
    // Стейт загрузки информации
    const [isLoading, setLoading] = useState(false);

    // Берем карточки из хранилища
    const [cards, setCards] = useState(JSON.parse(localStorage.getItem('filteredMovies')));

    const page='Movies';

    // Функция фильтрации карточек
    function handleFilterMovies(request, isShort){
        console.log(allMovies)
        filterMovies(request, isShort, allMovies, setLoading, setError, page);
        setCards(JSON.parse(localStorage.getItem('filteredMovies')));
        return
    }

    function handleChangeButton(isSaved){
        console.log(isSaved)
        if (isSaved){
            console.log('удаляем сохранение')
            console.log(buttonClass)
            return setButtonClass('movies-card__btn');
        }
        console.log('добавляем сохранение')
        return setButtonClass('movies-card__btn movies-card__btn_active')
   }

    useEffect(() => {
        setLoading(isLoading);
    }, [allMovies, cards, isLoading, isShort, setShort]);

    useEffect(() => {
        setAllMovies(JSON.parse(localStorage.getItem('movies')));
    }, [allMovies])

    return(
        <main className="movies-page">
            <SearchForm
                setShort={handleChangeToggle}
                filterMovies={handleFilterMovies}
                isShort={isShort}
                searchError={error}
            />
            <Preloader
                isOn = {isLoading}
            />
            <MoviesCardList
                cards={cards}
                isButtonVisible={true}
                handleSaveMovie={handleSaveMovie}
                handleDeleteMovie={handleDeleteMovie}
                handleChangeButton={handleChangeButton}
                page={'movies'}
                buttonClass={buttonClass}
            />
        </main>
    )
}

export default Movies;