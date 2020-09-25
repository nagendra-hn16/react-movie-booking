import React, { useState, useEffect, useContext } from 'react'
import MovieCard from './MovieCard';
import './MoviesList.css';
import FieldIcons from '../Common/FieldIcons/FieldIcons';
import SearchIcon from '@material-ui/icons/Search';
import Container from '../Common/Container/Container';
import { AppContext } from '../../App.js'

function MoviesList(props) {
    const appContext = useContext(AppContext);
    console.log(appContext)
    const [sortedBy, setSortedBy] = useState('Default');
    const moviesList = props.moviesList;
    const [language, setLanguage] = useState('');
    const [searchText, setSearchText] = useState('')

    // useEffect(() => {
    //     fetch(`http://localhost:4000/moviesList/${appContext.location}/Default`)
    //     .then(resp => resp.json())
    //     .then((result) => {
    //         setMoviesList(result.Movies);
    //     },
    //     (error) => {
    //         console.log(error);
    //     })
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [appContext.location])

    useEffect(() => {
        fetch(`http://localhost:4000/moviesList`)
        .then(resp => resp.json())
        .then((result) => {
            props.setMoviesList(result[appContext.location][sortedBy].Movies);
        },
        (error) => {
            console.log(error);
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortedBy, appContext.location])
    return (
        <div className="movieslist">
            <Container
                name="movieslist"
                headerText="Movies now in theaters">                    
                    <div className="movieslist_filters">
                        <div className="movieslist_filters_sortby">
                            <label htmlFor="sortbyFilters">Sort By : </label>
                            <select
                                id="sortbyFilters"
                                onChange={(event) => setSortedBy(event.target.value)}>
                                <option value="Default"> Select </option>
                                <option value="popularity"> Popularity </option>
                                <option value="screenType"> Screen Type </option>
                            </select>
                        </div>
                        <div className="movieslist_filters_language">
                            <label htmlFor="filterByLanguage">Language : </label>
                            <select
                                id="filterByLanguage"
                                onChange={(event) => setLanguage(event.target.value)}>
                                <option value=""> All </option>
                                <option value="English"> English </option>
                                <option value="Hindi"> Hindi </option>
                            </select>
                        </div>
                        <div className="movieslist_filters_search">
                            <input 
                                type="text"
                                placeholder="Search"
                                onChange={(event) => setSearchText(event.target.value)} />
                            <FieldIcons iconPosition="after">
                                <SearchIcon className="fieldicon_font"/>
                            </FieldIcons>
                        </div>
                    </div>
                    <div className="movieslist_cards_container">
                        <div className="movieslist_cards">
                            {moviesList && moviesList.length > 0 && moviesList.map((movie) => {
                                    return (language === '' || language === movie.language)
                                    && (searchText === '' || movie.name.indexOf(searchText) !== -1)
                                        ? <MovieCard
                                            movie={movie} />
                                        : ''
                                    // return movie.name
                                }
                            )}
                        </div>
                    </div>
            </Container>
        </div>
    )
}

export default MoviesList
