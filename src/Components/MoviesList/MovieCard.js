import React, { useState, useEffect, useContext } from 'react'
import './MovieCard.css'
import Rating from '../Common/Rating/Rating'
import { Button } from '@material-ui/core';
import {  useHistory } from 'react-router-dom';
import { AppContext } from '../../App';

function MovieCard(props) {
    const appContext = useContext(AppContext);
    const [movieSelected, setMovieSelected] = useState(false);
    const name = props.movie.name;
    const language = props.movie.language;
    const rating = props.movie.rating;
    const screenType = props.movie['screenType'];
    // console.log(name, language, rating, screenType)
    const history = useHistory();
    useEffect(() => {
        if(movieSelected) {
            appContext.movieNameDispatch({
                type: 'SET_MOVIE_NAME',
                movieName: name
            });
            appContext.languageDispatch({
                type: 'SET_LANGUAGE',
                language
            });
            appContext.ratingDispatch({
                type: 'SET_RATING',
                rating
            });
            appContext.screenTypeDispatch({
                type: 'SET_SCREEN_TYPE',
                screenType
            });
            // Need to make post request to save selection
            // Not doing that cos I cant mock POST
            // Sending some data in the url to use in details page
            history.push('/details')
        }
    // eslint-disable-next-line
    }, [movieSelected])
    
    return (
        <div className="moviecard">
            <div className="moviecard_image"></div>
            <div>{name}</div>
            <div>{language}</div>
            <div>{screenType}</div>
            <Rating rating={rating}></Rating>
            <Button 
                variant="contained" 
                color="primary" 
                className="moviecard_button"
                onClick={() => setMovieSelected(true)}>
                Book
            </Button>
        </div>
    )
}

export default MovieCard
