import React, { useState, useEffect } from 'react'
import './MovieCard.css'
import Rating from '../Common/Rating/Rating'
import { Button } from '@material-ui/core';
import {  useHistory } from 'react-router-dom';

function MovieCard(props) {
    const [movieSelected, setMovieSelected] = useState(false);
    const name = props.movie.name;
    const language = props.movie.language;
    const rating = props.movie.rating;
    const format = props.movie['2D/3D'];
    const history = useHistory();

    useEffect(() => {
        if(movieSelected) {
            //Need to make post request to save selection
            // Not doing that cos I cant mock POST
            //Sending some data in the url to use in details page
            history.push(`/details?name=${name}&language=${language}&format=${format}`)
        }
    // eslint-disable-next-line
    }, [movieSelected])
    
    return (
        <div className="moviecard">
            <div className="moviecard_image"></div>
            <div>{name}</div>
            <div>{language}</div>
            <div>{format}</div>
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
