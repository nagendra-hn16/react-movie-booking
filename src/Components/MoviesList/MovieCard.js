import React, { useState, useEffect } from 'react'
import './MovieCard.css'
import Rating from '../Common/Rating/Rating'
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
// import { AppContext } from '../../App';

function MovieCard(props) {
    // const appContext = useContext(AppContext);
    const [movieSelected, setMovieSelected] = useState(false);
    const name = props.movie.name;
    const language = props.movie.language;
    const rating = props.movie.rating;
    const screenType = props.movie['screenType'];
    // console.log(name, language, rating, screenType)
    const history = useHistory();
    useEffect(() => {
        if(movieSelected) {
            fetch('https://safe-garden-70688.herokuapp.com/movie/select',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: "include",
                body: JSON.stringify({
                    "movieName": name,
                    language,
                    rating,
                    screenType
                })
            }).then(res => res.json())
            .then(result => {
                history.push('/details')
            },
            error => {
                console.log(error)
            })
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
