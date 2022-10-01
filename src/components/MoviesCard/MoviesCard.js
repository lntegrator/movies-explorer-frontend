import React from "react";
import "./MoviesCard.css";
import { IMAGES_BASE_URL } from "../../utils/constants";
import { useState } from "react";
import { useEffect } from "react";
import mainApi from "../../utils/MainApi";

function MoviesCard( { card, handleInfoToolTip, handleDeleteMovie, page }){

    const [savedMovies, setSavedMovies] = useState(JSON.parse(localStorage.getItem('savedMovies')));
    const [isSaved, setSaved] = useState(savedMovies && savedMovies.find(movie => movie.nameRU === card.nameRU) ? true : false)
    const imgUrl = page==='movies' ? `${IMAGES_BASE_URL}${card.image.url}` : card.image;

    function handleSaveMovie(movie){
        const Reg = /^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*/;
        
        if(!Reg.test(movie.trailerLink)){
          movie.trailerLink = 'https://youtube.com/'
        }
    
        mainApi.saveMovie(movie)
        .then((savedMovie) => {
          savedMovies.push(savedMovie);
          localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
          setSaved(true);
        })
        .catch((err) => {
            handleInfoToolTip(`Ошибка ${err.message}`, false);
        })
      }

    function cardClick(){
        if (isSaved) {
            if (page==='savedMovies'){
                return handleDeleteMovie(card._id);
            }
            const movieId = savedMovies.filter((movie) => {
                return movie.nameRU === card.nameRU
            })[0]._id
            handleDeleteMovie(movieId);
            return setSaved(false);
        }
        return handleSaveMovie(card)
    }

    const duration = (minutes) => {
        if (minutes>=60){
            const hours = Math.floor(minutes/60)
            const min = minutes%60
            return `${hours} часов ${min} минут` 
        }
        return `${minutes} минут`
    }

    useEffect(() => {
        setSavedMovies(savedMovies);
    }, [savedMovies, isSaved])

    return(
        <article className="movies-card">
            <a
                href={card.trailerLink}
                className="movies-card__link"
                target="_blank"
                rel="noreferrer"
            >
                <img
                    src={imgUrl}
                    className="movies-card__image" alt={`Обложка фильма "${card.nameRU}"`}
                />
            </a>
                <div className="movies-card__info">
                    <h3 className="movies-card__title">{card.nameRU}</h3>
                    {
                        isSaved && page==='savedMovies' &&
                        <button
                            className="movies-card__btn movies-card__btn_delete"
                            type="button"
                            onClick={cardClick}
                        >
                        </button>
                    }
                    {
                        isSaved && page==='movies' &&
                        <button
                            className="movies-card__btn movies-card__btn_active"
                            type="button"
                            onClick={cardClick}
                        >
                        </button>
                    }
                    {
                        !isSaved &&
                        <button
                            className="movies-card__btn"
                            type="button"
                            onClick={cardClick}
                        >
                        </button>
                    }

                </div>
                <p className="movies-card__timing">{duration(card.duration)}</p>
        </article>
    )
};

export default MoviesCard;