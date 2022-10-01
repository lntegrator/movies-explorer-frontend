import { MAIN_API_URL } from "./constants";
import { IMAGES_BASE_URL } from "./constants";

class MainApi {
    constructor(headers, baseUrl){
        this._headers = headers;
        this._baseUrl = baseUrl;
    }

    _checkResponse = (res) => {
        if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);
    }    

    // Регистрация пользователя
    register(name, email, password){
        return fetch(`${this._baseUrl}/signup`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name, email, password
            })
        })
        .then(this._checkResponse)
    }

    // Авторизация пользователя
    auth(email, password){
        return fetch(`${this._baseUrl}/signin`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                email, password
            })
        })
        .then(this._checkResponse)
    }

    // Изменение данных профиля
    profileUpdate(name, email){
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'content-type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('jwt')}`,
            },
            body: JSON.stringify({
                name, email
            })
        })
        .then(this._checkResponse)
    }

    // Проверка токена
    checkToken(token){
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'content-type': 'application/json',
                'authorization': `Bearer ${token}`,
            }
        })
        .then(this._checkResponse)
    }

    // Получаем сохраненные фильмы
    getSavedMovies(){
        return fetch(`${this._baseUrl}/movies`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'content-type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('jwt')}`,
            }
        }
        )
        .then(this._checkResponse);
    }

    // Сохранение фильма
    saveMovie({ 
        id,
        country,
        director,
        duration,
        year,
        description,
        image,
        trailerLink,
        nameRU,
        nameEN,
        thumbnail,
    }){
        return fetch(`${this._baseUrl}/movies`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'content-type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('jwt')}`,
            },
            body: JSON.stringify({
                country: country || " ",
                director: director || " ",
                duration: duration || 0,
                year: year || " ",
                description: description || " ",
                image: `${IMAGES_BASE_URL}${image.url}` || " ",
                trailerLink: trailerLink || " ",
                nameRU: nameRU || " ",
                nameEN: nameEN || " ",
                thumbnail:
                  `${IMAGES_BASE_URL}/${image.formats.thumbnail.url}` || " ",
                movieId: id,
              })
        })
        .then(this._checkResponse)
    }

    deleteMovie(id){
        return fetch(`${this._baseUrl}/movies/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'content-type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('jwt')}`,
            },
        })
        .then(this._checkResponse)
    }
}

const mainApi = new MainApi({
    'content-type': 'application/json',
}, MAIN_API_URL);

export default mainApi;