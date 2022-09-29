import './App.css';
import { Route, Switch, useHistory } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import { useState, useEffect } from 'react';
import NavigationMobile from '../NavigationMobile/NavigationMobile';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { currentUserContext } from '../../contexts/currentUserContext';
import mainApi from '../../utils/MainApi';
import InfoToolTip from '../InfoToolTip/InfoToolTip';

function App() {

  const history = useHistory();

  // Стейт контекста
  const [currentUser, setCurrentUser] = useState({});

  // Стейт авторизации
  const [loggedIn, setLoggedIn] = useState(false);

  // Стейт открытия мобильного меню
  const [isOpenMobileMenu, setOpenMobileMenu] = useState(false);

  // Сохраненные карточки
  const [savedMovies, setSavedMovies] = useState([]);

  // Стейт попапа уведомления
  const [isInfoToolTipOpen, setInfoToolTipOpen] = useState(false);

  // Стейт информации в попапе уведомления
  const [infoToolTipInformation, setInfoToolTipInformation] = useState({});

  // Функция показа попапа уведомления
  const handleInfoToolTip = (message, isGood) => {
    setInfoToolTipInformation({ message, isGood });
    setInfoToolTipOpen(true);
  }

  // Проверяем токен при посещении
  useEffect(() => {
    handleTokenCheck();
  }, [])

  // Функция изменения стейта открытия мобильного меню
  const handleOpenMobileMenu = () => {
    setOpenMobileMenu(true);
  }

  // Функция закрытия мобильного меню
  const handleCloseMobileMenu = () => {
    setOpenMobileMenu(false);
  }
 
  // Закрытие инофрмационного попапа
  const handleCloseInfoToolTip = () => {
    setInfoToolTipOpen(false);
    setInfoToolTipInformation({});
  }

  // Функция закрытия мобильного меню по нажатию ESC
  const handleCloseByEsc = (evt) => {
    if(evt.key === 'Escape'){
      handleCloseMobileMenu();
    }
  }

  // Функция проверки токена
  function handleTokenCheck(){
    const jwt = localStorage.getItem('jwt');
    if(jwt) {
      mainApi.checkToken(jwt)
      .then((res) => {
        setLoggedIn(true);
        setCurrentUser(res);
      })
      .catch((err) => {
        handleInfoToolTip(`Ошибка ${err.message}`, false);
        handleSignOut();
      })
    }
  }

  // Регистрация
  function handleRegister({name, email, password}){
    mainApi.register(name, email, password)
    .then((res) => {
      setCurrentUser(res);
      handleLogin({email, password})
    })
    .catch((err) => {
      handleInfoToolTip(`Ошибка ${err.message}`, false);
    })
  }

  //Авторизация
  function handleLogin({email, password}){
    mainApi.auth(email, password)
    .then((res) => {
      localStorage.setItem('jwt', res.token);
      handleTokenCheck(res.token);
      history.push('/movies');
    })
    .catch((err) => {
      handleInfoToolTip(`Ошибка ${err.message}`, false);
    })
  }

  // Выход из аккаунта
  function handleSignOut(){
    setLoggedIn(false);
    localStorage.clear();
    history.push('/');
  }

  // Обновление профиля
  function handleProfileUpdate({ name, email }){
    mainApi.profileUpdate(name, email)
    .then((res) => {
      setCurrentUser(res);
      handleInfoToolTip('Профиль успешно обновлен', true)
    })
    .catch((err) => {
      handleInfoToolTip(`Ошибка ${err.message}`, false);
    })
  }

  // Функция получения сохраненных фильмов
  function getSavedMovies(){
    mainApi.getSavedMovies()
      .then((res) => {
        setSavedMovies(res);
        localStorage.setItem('savedMovies', JSON.stringify(res));
      })
      .catch((err) => {
      })
  }

  // Сохранение фильма
  function handleSaveMovie(movie){
    const Reg = /^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*/;
    
    if(!Reg.test(movie.trailerLink)){
      movie.trailerLink = 'https://youtube.com/'
    }

    mainApi.saveMovie(movie)
    .then((savedMovie) => {
      getSavedMovies()
    })
    .catch((err) => {
      handleInfoToolTip(`Ошибка ${err.message}`, false);
    })
  }

  // Удаление фильма 
  function handleDeleteMovie(id){
    console.log(id)
    mainApi.deleteMovie(id)
    .then(setSavedMovies((state) => {state.filter((movie) => movie._id !== id)})
    )
    .catch((err) => {
      handleInfoToolTip(`Ошибка ${err.message}`, false);
    })
  }

  // Подгружаем сохраненные карточки
  useEffect(() => {
    if(loggedIn){
      getSavedMovies();
    }
  }, [loggedIn])

  // Слушаем открытие мобильного меню
  useEffect(() => {
    if (isOpenMobileMenu) {
      document.addEventListener('keydown', handleCloseByEsc)
    }
    return () => document.removeEventListener('keydown', handleCloseByEsc)
  });

  useEffect(() => {
    setCurrentUser(currentUser);
  }, [currentUser])


  return (
    <currentUserContext.Provider value={currentUser}>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Header
              page="main"
              loggedIn={loggedIn}
              onBurger={handleOpenMobileMenu}
            />
            <Main />
            <Footer/>
          </Route>
          {/* <ProtectedRoute path="/signup" type='auth'>
            <Register
                onSubmit={handleRegister}
              />
          </ProtectedRoute> */}
          <Route path="/signup">
            <Register
              onSubmit={handleRegister}
            />
          </Route>
          <Route path='/signin'>
            <Login
              onSubmit={handleLogin}
            />
          </Route>
          {/* <ProtectedRoute path='/signin' type='auth'>
            <Login
                onSubmit={handleLogin}
              /> 
          </ProtectedRoute> */}
          <ProtectedRoute path="/movies">
            <Header
                page="movies"
                onBurger={handleOpenMobileMenu}
                loggedIn={loggedIn}
              />
              <Movies
                handleSaveMovie={handleSaveMovie}
                handleDeleteMovie={handleDeleteMovie}
                handleInfoToolTip={handleInfoToolTip}
              />
              <Footer />
          </ProtectedRoute>
          <ProtectedRoute path="/saved-movies">
            <Header
              onBurger={handleOpenMobileMenu}
              loggedIn={loggedIn}
            />
            <SavedMovies
              handleSaveMovie={handleSaveMovie}
              handleDeleteMovie={handleDeleteMovie}
              savedMovies={savedMovies}
            />
            <Footer />
          </ProtectedRoute>
          <ProtectedRoute path="/profile">
            <Header
              onBurger={handleOpenMobileMenu}
              loggedIn={loggedIn}
            />
            <Profile
              onSignOut={handleSignOut}
              onSubmit={handleProfileUpdate}
            />
          </ProtectedRoute>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
        <NavigationMobile
          isOpen={isOpenMobileMenu}
          onClose={handleCloseMobileMenu}
        />
        <InfoToolTip
          isOpen={isInfoToolTipOpen}
          onClose={handleCloseInfoToolTip}
          info={infoToolTipInformation}
        />
      </div>
    </currentUserContext.Provider>
  );
}

export default App;
