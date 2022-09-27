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
import moviesApi from '../../utils/MoviesApi';

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

   // Проверяем авторизацию
   useEffect(() => {
    if (loggedIn) {
      mainApi
        .checkToken(localStorage.getItem('jwt'))
        .then((res) => {
          setCurrentUser(res);
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  // Проверяем токен при посещении
  useEffect(() => {
    handleTokenCheck();
  }, [loggedIn, savedMovies])

  // Функция изменения стейта открытия мобильного меню
  const handleOpenMobileMenu = () => {
    setOpenMobileMenu(true);
  }

  // Функция закрытия мобильного меню
  const handleCloseMobileMenu = () => {
    setOpenMobileMenu(false);
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
        console.log(err)
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
    .catch(() => {
      console.log('Ошибка')
    })
  }

  //Авторизация
  function handleLogin({email, password}){
    mainApi.auth(email, password)
    .then((res) => {
      localStorage.setItem('jwt', res.token);
      mainApi.checkToken(res.token)
      .then((res) => {
        setLoggedIn(true);
        setCurrentUser(res);
        history.push('/movies');
      })
      .catch(() => {
        console.log('Ошибка')
      })
    })
  }

  // Выход из аккаунта
  function handleSignOut(){
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    localStorage.removeItem('filteredMovies');
    localStorage.removeItem('toggle');
    localStorage.removeItem('request');
    localStorage.removeItem('toggleShort');
    localStorage.removeItem('savedMovies');
    history.push('/');
  }

  // Обновление профиля
  function handleProfileUpdate({ name, email }){
    mainApi.profileUpdate(name, email)
    .then((res) => {
      console.log(res)
      setCurrentUser(res);
    })
    .catch((err) => {
      console.log(err)
    })
  }

  function getMovies(){
    mainApi.getSavedMovies()
      .then((res) => {
        setSavedMovies(res);
        // console.log(res)
        localStorage.setItem('savedMovies', JSON.stringify(res));
        // console.log(JSON.parse(localStorage.getItem('savedMovies')));
      })
      .catch((err) => {
        console.log(err);
      })
  }

  // Сохранение фильма
  function handleSaveMovie(movie){
    mainApi.saveMovie(movie)
    .then((savedMovie) => {
      getMovies()
    })
    .catch((err) => {
      console.log(err);
    })
  }

  // Удаление фильма 
  function handleDeleteMovie(id){
    console.log(id)
    mainApi.deleteMovie(id)
    .then(setSavedMovies((state) => {state.filter((movie) => movie._id !== id)})
    )
    .catch((err) => {
      console.log(err);
    })
  }

  // Подгружаем массив карточек со стороннего сервиса
  useEffect(() => {
    if(loggedIn){
      moviesApi.getCards()
        .then((res) => {
          localStorage.setItem('movies', JSON.stringify(res));
          // console.log(localStorage.getItem('movies'))
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, [loggedIn])

  // Подгружаем сохраненные карточки
  useEffect(() => {
    if(loggedIn){
      // getMovies();
      // mainApi.getSavedMovies()
      // .then((res) => {
      //   console.log(res)
      //   // setSavedMovies(res);
      //   // localStorage.setItem('savedMovies', JSON.stringify(res));
      // })
      // .catch((err) => {
      //   console.log(err);
      // })
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
    localStorage.setItem('toggle', false)
  })

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
          <ProtectedRoute path="/movies" loggedIn={loggedIn}>
            <Header
                page="movies"
                onBurger={handleOpenMobileMenu}
                loggedIn={loggedIn}
              />
              <Movies
                handleSaveMovie={handleSaveMovie}
                handleDeleteMovie={handleDeleteMovie}
              />
              <Footer />
          </ProtectedRoute>
          <ProtectedRoute path="/saved-movies" loggedIn={loggedIn}>
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
          <ProtectedRoute path="/profile" loggedIn={loggedIn}>
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
      </div>
    </currentUserContext.Provider>
  );
}

export default App;
