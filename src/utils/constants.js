export const MOVIES_API_URL = 'https://api.nomoreparties.co/beatfilm-movies';
export const MAIN_API_URL = 'https://api.webdiploma.nomoredomains.sbs';
export const SHORT_MOVIE_TIMING = 40;
export const IMAGES_BASE_URL = 'https://api.nomoreparties.co';

export const CARDS_VIEW = {
    size1570: { point: 1570, initial: 20, add: 5 },
    size1280: { point: 1280, initial: 16, add: 4 },
    size990: { point: 990, initial: 12, add: 3 }, 
    size768: { point: 768, initial: 8, add: 2 },
    size320: { point: 475, initial: 5, add: 2 }
};

// Массив отфильтрованных фильмов
let filteredMovies = [];

// Функция фильтрации фильмов
export const filterMovies = (request, isShort, allMovies, setLoading, setError, page) => {
    filteredMovies = [];
    setLoading(true);
    allMovies.filter(function(movie) {
        const nameRu = movie.nameRU.toLowerCase();
        const nameEn = movie.nameEN.toLowerCase();

        if (!request && page==='SavedMovies'){
            if(isShort && movie.duration <= SHORT_MOVIE_TIMING){
                setError(false);
                setLoading(false);
                return filteredMovies.push(movie);
            }
            if (!isShort){
                setLoading(false);
                return filteredMovies.push(movie);
            }
        } else {
            if (!request){
                setLoading(false);
                return filteredMovies = [];
            }

            if (
                (nameRu.includes(request.toLowerCase())
                    || nameEn.includes(request.toLowerCase())
                )
                && 
                (!isShort || (isShort && movie.duration <= SHORT_MOVIE_TIMING))
                ){
                    setError(false);
                    setLoading(false);
                    return filteredMovies.push(movie);
                }
        }
        return setLoading(false);
    })
    if (filteredMovies.length < 1){
        setError('По данному запросу ничего не найдено')
    }

    if (page==='Movies'){
        // console.log(filteredMovies)
        return localStorage.setItem('filteredMovies', JSON.stringify(filteredMovies));
    } else {
        return localStorage.setItem('filteredSavedMovies', JSON.stringify(filteredMovies));
        //  console.log(JSON.parse(localStorage.getItem('filteredSavedMovies')))
    }
}