import React from "react";
import MoreButton from "../MoreButton/MoreButton";
import MoviesCard from "../MoviesCard/MoviesCard";
import './MoviesCardList.css';

function MoviesCardList(){
    return(
        <section className="movies-card-list">
            <div className="movies-card-list__container">
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
            </div>
            <MoreButton />
        </section>
    )
};

export default MoviesCardList;