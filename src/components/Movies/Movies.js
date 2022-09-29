import React, { useState } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import './Movies.css';
import '../Preloader/Preloader';
import Preloader from "../Preloader/Preloader";
import { useEffect } from "react";
import { filterMovies } from "../../utils/constants";
import mainApi from "../../utils/MainApi";
import moviesApi from "../../utils/MoviesApi";

function Movies({ handleSaveMovie, handleInfoToolTip }){

    // Стейт тоггла
    const [isShort, setShort] = useState(JSON.parse(localStorage.getItem('toggle')));
    

    // Функция переключения тоггла
    function handleChangeToggle(){
        if (isShort){
            console.log('vxod')
            setShort(false);
            localStorage.setItem('toggle', JSON.stringify(false));
            return handleFilterMovies(localStorage.getItem('request'), false);
        } else {
            console.log('vxod2')
            setShort(true);
            localStorage.setItem('toggle', JSON.stringify(true));
            return handleFilterMovies(localStorage.getItem('request'), true);
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
                handleInfoToolTip(`Ошибка ${err.message}`, false);
            })        
        }
        )
        .catch((err) => {
            handleInfoToolTip(`Ошибка ${err.message}`, false);
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

        const allMovies = JSON.parse(localStorage.getItem('movies'));

        if (allMovies){
            filterMovies(request, isShort, allMovies, setLoading, setError, page);
            setCards(JSON.parse(localStorage.getItem('filteredMovies')));
            return localStorage.setItem('toggle', isShort);
        }
        moviesApi.getCards()
        .then((res) => {
          localStorage.setItem('movies', JSON.stringify(res));
          filterMovies(request, isShort, res, setLoading, setError, page);
          setCards(JSON.parse(localStorage.getItem('filteredMovies')));
          return localStorage.setItem('toggle', isShort);

        })
        .catch((err) => {
            handleInfoToolTip(`Ошибка ${err.message}`, false);
        })
    }

    useEffect(() => {
        setCards(cards);
        localStorage.setItem('toggle', JSON.stringify(isShort));
    }, [cards, isShort]);

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
                page={'movies'}
            />
        </main>
    )
}

export default Movies;