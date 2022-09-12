import './App.css';
import { Route, Switch } from 'react-router-dom';
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

function App() {

  // Стейт открытия мобильного меню
  const [isOpenMobileMenu, setOpenMobileMenu] = useState(false);

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

  // Слушаем открытие мобильного меню
  useEffect(() => {
    if (isOpenMobileMenu) {
      document.addEventListener('keydown', handleCloseByEsc)
    }
    return () => document.removeEventListener('keydown', handleCloseByEsc)
  });


  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Header
            page="main"
          />
          <Main />
          <Footer/>
        </Route>
        <Route path="/signup">
          <Register />
        </Route>
        <Route path='/signin'>
          <Login />
        </Route>
        <Route path="/movies">
          <Header
            onBurger={handleOpenMobileMenu}
          />
          <Movies />
          <Footer />
        </Route>
        <Route path="/saved-movies">
          <Header
            onBurger={handleOpenMobileMenu}
          />
          <SavedMovies />
          <Footer />
        </Route>
        <Route path="/profile">
          <Header
            onBurger={handleOpenMobileMenu}
          />
          <Profile/>
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
      <NavigationMobile
        isOpen={isOpenMobileMenu}
        onClose={handleCloseMobileMenu}
      />
    </div>
  );
}

export default App;
