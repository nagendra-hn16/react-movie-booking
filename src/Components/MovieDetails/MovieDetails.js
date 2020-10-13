import React, { useEffect, useState, useContext } from 'react'
import {  useHistory } from 'react-router-dom';
import './MovieDetails.css'
import { Button } from '@material-ui/core';
import Container from '../Common/Container/Container';
import { AppContext } from '../../App';

function MovieDetails() {
    const history = useHistory();
    const appContext = useContext(AppContext);
    const [movieDetails, setMovieDetails] = useState({});
    const [theaterList, setTheaterList] = useState([]);
    const [selectedTheater, setSelectedTheater] = useState('');
    const [bookingDetails, setBookingDetails] = useState({})
    const [showDate, setShowDate] = useState('')
    const [showTime, setShowTime] = useState('')
    const [seats, setSeats] = useState('')

    const [proceedToSummary, setProceedToSummary] = useState(false);
    
    // Populate the booking details based on the selected theater
    const setTheaterDetails = (ev) => {
        // console.log(theaterList);
        for(const theater of theaterList) {
            if(theater.theaterName === ev.target.value) {
                setBookingDetails(theater);
                break;
            }
        }
        setSelectedTheater(ev.target.value);
    }

    // Get a list of theaters that show the selected movie in the city selected
    useEffect(() => {
        fetch(`https://safe-garden-70688.herokuapp.com/movie/movieDetails`,
            {
                method: 'GET',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(resp => resp.json())
            .then((res)=> {
                // console.log(res);
                appContext.userNameDispatch({
                    type: 'SET_USERNAME',
                    userName: res.header.userName
                });
                appContext.locationsDispatch({
                    type: 'SET_LOCATIONS',
                    locations: res.header.locations || appContext.locations
                });
                appContext.locationDispatch({
                    type: 'SET_LOCATION',
                    location: res.header.selectedLocation
                });
                setTheaterList(res.theatersList);
                setMovieDetails(res.selectedMovieDetails)
            },
            (error) => {
                console.log(error);
            })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        //make post ajax call here
        if(proceedToSummary) {
            fetch(`https://safe-garden-70688.herokuapp.com/movie/selectShow`,
            {
                method: 'POST',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    showDate,
                    showTime,
                    seats,
                    selectedTheater,
                    price: ((parseInt(bookingDetails.ticketPrice) || 200) * parseInt(seats))
                })
            }).then(res => res.json())
            .then(result => {
                // console.log(result.msg, result.msg === "show selected");
                if(result.msg === "show selected") {
                    history.push('/summary');
                }
            }, error => {
                console.log(error);
            })
        }
    // eslint-disable-next-line
    }, [proceedToSummary])

    return (
        <div className="details">
            <Container
                name="moviedetails"
                headerText="Movie Details">
                <div className="moviedetails_content">
                    <div className="moviedetails_image"></div>
                    <div className="moviedetails_name details_row">
                        Movie Name: {movieDetails.movieName}
                    </div>
                    <div className="moviedetails_language details_row">
                        Language: {movieDetails.language}
                    </div>
                    <div className="moviedetails_screentype">
                        Format: {movieDetails.screenType}
                    </div>
                </div>
            </Container>

            <Container
                name="bookingdetails"
                headerText="Booking Details">
                {selectedTheater === ''
                    ? <div className="bookingdetails_list">
                        <h3>Select Your Theater:</h3>
                        {theaterList.length > 0 
                            ? theaterList.map((theater, index) =>
                                <div key={`theater${index}`}>
                                    <input
                                        type="radio"
                                        name="theaterName"
                                        id={`theater${index}`}
                                        className="theater_option"
                                        value={theater.theaterName}
                                        onChange={(ev) => setTheaterDetails(ev)}>
                                    </input>
                                    <label htmlFor={`theater${index}`}>
                                        {theater.theaterName}
                                    </label>
                                </div>)
                            : <div>  No Theaters for selected movie in DB. Please select Movie1 </div>}
                    </div>
                    : <div className="bookingdetails_content">
                        <div className="details_row">
                            <h3>Theater Selected: {selectedTheater}</h3>
                        </div>
                        <div className="bookingdetails_date details_row">
                            <label htmlFor="bookingDetailsDate">Date:</label>
                            <select
                                id="bookingDetailsDate"
                                onChange={(ev) => setShowDate(ev.target.value)}
                                value={showDate}>
                                <option>Select Show Date</option>
                                {bookingDetails && bookingDetails.showDates 
                                    && bookingDetails.showDates.map((date, index) =>
                                    <option 
                                        value={date}
                                        key={`date${index}`}>
                                        {date}
                                    </option>
                                )}
                            </select>
                        </div>
                        <div className="bookingdetails_time details_row">
                            <label htmlFor="bookingDetailsTime">Show Time:</label>
                            <select id="bookingDetailsTime"
                                onChange={(ev) => setShowTime(ev.target.value)}
                                value={showTime}>
                                <option>Select Show Time</option>
                                {bookingDetails && bookingDetails.showTimes 
                                    && bookingDetails.showTimes.map((showTime, index) =>
                                    <option 
                                        value={showTime}
                                        key={`time${index}`}>
                                        {showTime}
                                    </option>
                                )}
                            </select>
                        </div>
                        <div className="bookingdetails_seats details_row">
                            <label htmlFor="bookingDetailsSeats">Number of Seats:</label>
                            <input 
                                type="text" 
                                id="bookingDetailsSeats" 
                                value={seats}
                                onChange={(ev) => setSeats(ev.target.value)}/>
                        </div>
                        <Button
                            variant="contained" 
                            color="primary"
                            onClick={() => setProceedToSummary(true)}> 
                            Proceed 
                        </Button>
                    </div>
                }
            </Container>
        </div>
    )
}

export default MovieDetails
