import React, { useState } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
import './SavedMovies.css';

function SavedMovies(){

    // Стейт загрузки информации
    const [isLoading, setLoading] = useState(false);

    return(
        <section className="saved-movies">
            <SearchForm />
            <Preloader
                isOn={isLoading}
            />
            <MoviesCardList />
            <div className="saved-movies__devider"></div>
        </section>
    )
}

export default SavedMovies;