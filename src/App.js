import React, { useState, useReducer } from 'react';
import './App.css';
import Header from './Components/Common/Header/Header';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MoviesList from './Components/MoviesList/MoviesList';
import MovieDetails from './Components/MovieDetails/MovieDetails';
import Summary from './Components/Summary/Summary';
import Checkout from './Components/Checkout/Checkout';
import Login from './Components/Login/Login';

export const AppContext = React.createContext();

const initialState = {
  isLoggedIn: false,
  userName: '',
  location: 'Bangalore',
  movieName: '',
  language: '',
  rating: '',
  screenType: '',
  selectedTheater: '',
  showDate: '',
  showTime: '',
  noOfSeats: '',
  price: ''
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return true;

    case 'LOGOUT':
      return false;

    case 'SET_USERNAME':
      return action.userName;

    case 'SET_LOCATION':
      return action.location

    case 'SET_MOVIE_NAME':
      return action.movieName

    case 'SET_LANGUAGE':
      return action.language

    case 'SET_RATING':
      return action.rating

    case 'SET_SCREEN_TYPE':
      return action.screenType

    case 'SET_SELECTED_THEATER':
      return action.theaterName

    case 'SET_SHOW_DATE':
      return action.showDate

    case 'SET_SHOW_TIME':
      return action.showTime

    case 'SET_NO_OF_SEATS':
      return action.noOfSeats

    case 'SET_PRICE':
      return action.price

    default:
      return state;
  }
}

/**
 * TODO
 * Use Error boundaries
 * Make a modal using Portal
 * 
 */
function App() {
  const [isLoggedIn, isLoggedInDispatch] = useReducer(reducer, initialState.isLoggedIn)
  const [userName, userNameDispatch] = useReducer(reducer, initialState.userName)
  const [location, locationDispatch] = useReducer(reducer, initialState.location)
  const [moviesList, setMoviesList] = useState([]);
  const [movieName, movieNameDispatch] = useReducer(reducer, initialState.movieName);
  const [language, languageDispatch] = useReducer(reducer, initialState.language);
  const [rating, ratingDispatch] = useReducer(reducer, initialState.rating);
  const [screenType, screenTypeDispatch] = useReducer(reducer, initialState.screenType);
  const [selectedTheater, selectedTheaterDispatch] = useReducer(reducer, initialState.selectedTheater);
  const [showDate, showDateDispatch] = useReducer(reducer, initialState.showDate);
  const [showTime, showTimeDispatch] = useReducer(reducer, initialState.showTime);
  const [noOfSeats, noOfSeatsDispatch] = useReducer(reducer, initialState.noOfSeats);
  const [price, priceDispatch] = useReducer(reducer, initialState.price);

  return (
    <AppContext.Provider 
      value={{
        isLoggedIn,
        isLoggedInDispatch,
        userName,
        userNameDispatch,
        location,
        locationDispatch,
        movieName,
        movieNameDispatch,
        language,
        languageDispatch,
        rating,
        ratingDispatch,
        screenType,
        screenTypeDispatch,
        selectedTheater,
        selectedTheaterDispatch,
        showDate,
        showDateDispatch,
        showTime,
        showTimeDispatch,
        noOfSeats,
        noOfSeatsDispatch,
        price,
        priceDispatch
      }}>
      <div className="app">
        <Header />
        <Router>
          <Switch>
            <Route path="/list">
              <MoviesList
                moviesList={moviesList}
                setMoviesList={setMoviesList} />
            </Route>
            <Route path="/details">
              <MovieDetails></MovieDetails>
            </Route>
            <Route path="/summary">
              <Summary></Summary>
            </Route>
            <Route path="/checkout">
              <Checkout></Checkout>
            </Route>
            <Route path="/">
              <Login />
            </Route>
          </Switch>
        </Router>
      </div>
    </AppContext.Provider>
  );
}

export default App;