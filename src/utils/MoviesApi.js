import { MOVIES_API_URL } from "./constants";

class MoviesApi {
    constructor(headers, baseUrl){
        this._headers = headers;
        this._baseUrl = baseUrl;
    }

    // Метод проверки запроса
    _checkResponse = (res) => {
        if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);
    }    

    // Получаем данные фильмов
    getCards(){
        return fetch(`${this._baseUrl}`, {
            method: 'GET',
            headers: this._headers,
        })
        .then(this._checkResponse)
    }
}

const moviesApi = new MoviesApi({
    'Content-Type': 'application/json',
}, MOVIES_API_URL);

export default moviesApi;