import React from "react";
import MoreButton from "../MoreButton/MoreButton";
import MoviesCard from "../MoviesCard/MoviesCard";
import './MoviesCardList.css';
import { useState } from "react";
import { useEffect } from "react";

function MoviesCardList({ cards, isButtonVisible, handleSaveMovie, handleDeleteMovie, page, handleChangeButton, buttonClass}){

    // Стейт количества карточек для подгрузки
    const [cardsNumber, setCardsNumber] = useState(0);

    // Стейт ширины экрана
    const [displaySize, setDisplaySize] = useState(document.documentElement.clientWidth);

    // Функция отслеживания ресайза окна
    function handleDislpayResize(){
        setTimeout(() => {
            setDisplaySize(document.documentElement.clientWidth)
        }, 5000)
    }

    // Функция подгрузки карточек в зависимости от экрана
    function handleAddCards(){
        const addCardsNumber = displaySize >= 1280 ? 4 : 2
        setCardsNumber(cardsNumber + addCardsNumber);
    }

    useEffect(() => {
        setDisplaySize(document.documentElement.clientWidth);
        setCardsNumber(
            displaySize >= 1280 ? 16 : displaySize >= 768 ? 8 : 5
        );
        
        window.addEventListener("resize", handleDislpayResize);

        return () => {
        window.removeEventListener("resize", handleDislpayResize);
        };
    }, [displaySize])


    if (page==='movies'){
        return(
            <section className="movies-card-list">
                <div className="movies-card-list__container">
                    { cards && 
                    cards.slice(0, cardsNumber).map((card) => (
                        <MoviesCard
                            key={card.id}
                            card={card}
                            handleSaveMovie={handleSaveMovie}
                            handleDeleteMovie={handleDeleteMovie}
                            page={page}
                            handleChangeButton={handleChangeButton}
                            buttonClass={buttonClass}
                        />
                    ))}
                </div>
                { cards && 
                    cards.length > cardsNumber && isButtonVisible &&
                    <MoreButton
                        onClick={handleAddCards}
                    />}
            </section>
        )
    }
    return(
        <section className="movies-card-list">
                <div className="movies-card-list__container">
                    { cards && cards.map((card) => (
                        <MoviesCard
                            key={page==='movies' ? card.id : card._id}
                            card={card}
                            handleSaveMovie={handleSaveMovie}
                            handleDeleteMovie={handleDeleteMovie}
                            page={page}
                        />
                    ))}
                </div>
            </section>
    )
};

export default MoviesCardList;