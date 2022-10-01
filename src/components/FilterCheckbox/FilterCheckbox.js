import React from "react";
import { useEffect } from "react";
import './FilterCheckbox.css';

function FilterCheckbox({ setShort, isShort }) {
    return(
        <div className="filter-checkbox">
            <label className="filter-checkbox__text">
                Короткометражки
                <input
                className="filter-checkbox__check"
                type="checkbox"
                name="movie-checkbox"
                defaultChecked={isShort}
                onChange={setShort}
                />
                <span className="filter-checkbox__toggle" />
            </label>
        </div>
    )
}

export default FilterCheckbox;