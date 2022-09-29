import React from "react";
import './InfoToolTip.css';
import iconOk from '../../images/ok.svg';
import iconError from '../../images/error.svg';

function InfoToolTip({ info, isOpen, onClose }){
    return(
        <div className={`infoToolTip ${isOpen && 'infoToolTip__active'}`}>
            <button
                    className="infoToolTip__close-btn"
                    onClick={onClose}
                    type="button"
            />
            { info.isGood
                ? <img src={iconOk} alt='Все добре' className="infoToolTip__icon"/>
                : <img src={iconError} alt='Тікай з міста' className="infoToolTip__icon"/>
            }
            <p className="infoToolTip__text">{info.message}</p>
        </div>
    )
}

export default InfoToolTip;