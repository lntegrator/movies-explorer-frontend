import React from "react";
import MoreButton from "../MoreButton/MoreButton";
import MoviesCard from "../MoviesCard/MoviesCard";
import './MoviesCardList.css';
import { useState } from "react";
import { useEffect } from "react";
import { CARDS_VIEW } from "../../utils/constants";

function MoviesCardList({ cards, isButtonVisible, handleSaveMovie, handleDeleteMovie, page }){

    // Стейт количества карточек для подгрузки
    const [cardsNumber, setCardsNumber] = useState(0);

    // Стейт ширины экрана
    const [displaySize, setDisplaySize] = useState(document.documentElement.clientWidth);

    // Функция отслеживания ресайза окна
    function handleDislpayResize(){
        setTimeout(() => {
            setDisplaySize(document.documentElement.clientWidth)
        }, 500)
    }

    // Функция подгрузки карточек в зависимости от экрана
    function handleAddCards(){
        const addCardsNumber =
             displaySize >= CARDS_VIEW.size1570.point
             ? CARDS_VIEW.size1570.add
             : displaySize >=CARDS_VIEW.size1280.point
             ? CARDS_VIEW.size1280.add
             : displaySize >= CARDS_VIEW.size990.point
             ? CARDS_VIEW.size990.add
             : displaySize >= CARDS_VIEW.size768.point
             ? CARDS_VIEW.size768.add
             : CARDS_VIEW.size320.add
        setCardsNumber(cardsNumber + addCardsNumber);
    }

    useEffect(() => {
        setDisplaySize(document.documentElement.clientWidth);

        setCardsNumber(
            displaySize >= CARDS_VIEW.size1570.point
             ? CARDS_VIEW.size1570.initial
             : displaySize >=CARDS_VIEW.size1280.point
             ? CARDS_VIEW.size1280.initial
             : displaySize >= CARDS_VIEW.size990.point
             ? CARDS_VIEW.size990.initial
             : displaySize >= CARDS_VIEW.size768.point
             ? CARDS_VIEW.size768.initial
             : CARDS_VIEW.size320.initial
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