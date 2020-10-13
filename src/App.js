import React, { useReducer } from 'react';
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
  locations: ['Bangalore', 'Chennai', 'Chandigarh'],
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

    case 'SET_LOCATIONS':
      return action.locations

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
  const [isLoggedIn, isLoggedInDispatch] = useReducer(reducer, initialState.isLoggedIn)
  const [userName, userNameDispatch] = useReducer(reducer, initialState.userName)
  const [locations, locationsDispatch] = useReducer(reducer, initialState.locations)
  const [location, locationDispatch] = useReducer(reducer, initialState.location)

  return (
    <AppContext.Provider 
      value={{
        isLoggedIn,
        isLoggedInDispatch,
        userName,
        userNameDispatch,
        locations,
        locationsDispatch,
        location,
        locationDispatch
      }}>
      <div className="app">
        <Header />
        <Router>
          <Switch>
            <Route path="/list">
              <MoviesList />
            </Route>
            <Route path="/details">
              <MovieDetails />
            </Route>
            <Route path="/summary">
              <Summary />
            </Route>
            <Route path="/checkout">
              <Checkout />
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