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
  location: 'Bangalore'
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
  // const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isLoggedIn, isLoggedInDispatch] = useReducer(reducer, initialState.isLoggedIn)
  const [userName, userNameDispatch] = useReducer(reducer, initialState.userName)
  // const [userName, setUserName] = useState('');
  const [location, locationDispatch] = useReducer(reducer, initialState.location)
  // const [location, setlocation] = useState('Bangalore')
  const [moviesList, setMoviesList] = useState([]);
  return (
    <AppContext.Provider 
      value={{
        isLoggedIn,
        isLoggedInDispatch,
        userName,
        userNameDispatch,
        location,
        locationDispatch
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