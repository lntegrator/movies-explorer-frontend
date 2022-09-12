import React from "react";
import './FilterCheckbox.css';

function FilterCheckbox() {
    return(
        <div className="filter-checkbox">
            <label className="filter-checkbox__text">
                Короткометражки
                <input
                className="filter-checkbox__check"
                type="checkbox"
                name="movie-checkbox"
                />
                <span className="filter-checkbox__toggle" />
            </label>
        </div>
    )
}

export default FilterCheckbox;