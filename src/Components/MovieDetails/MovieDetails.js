import React, { useEffect, useState, useContext } from 'react'
import {  useHistory } from 'react-router-dom';
import './MovieDetails.css'
import { Button } from '@material-ui/core';
import Container from '../Common/Container/Container';
import { AppContext } from '../../App';

function MovieDetails() {
    const history = useHistory();
    const appContext = useContext(AppContext);
    const language = appContext.language;
    const name = appContext.movieName || 'Movie1';
    const location = appContext.location || 'Bangalore';
    const screenType = appContext.screenType;
    // const [selectedTheater, setSelectedTheater] = useState('');
    const [theaterList, setTheaterList] = useState([]);
    const [bookingDetails, setBookingDetails] = useState({})
    const [proceedToSummary, setProceedToSummary] = useState(false);
    console.log(appContext.selectedTheater);
    // Populate the booking details based on the selected theater
    const setSelectedTheater = (ev) => {
        // console.log(ev.target.innerText);
        for(const theater of theaterList) {
            if(theater.theaterName === ev.target.innerText) {
                setBookingDetails(theater);
                break;
            }
        }
        return appContext.selectedTheaterDispatch({
            type: "SET_SELECTED_THEATER",
            theaterName: ev.target.innerText
        })
    }

    // Get a list of theaters that show the selected movie in the city selected
    useEffect(() => {
        fetch(`https://safe-garden-70688.herokuapp.com/login/theatersList?name=${name}&city=${location}`)
            .then(resp => resp.json())
            .then((result)=> {
                console.log(result);
                setTheaterList(result)
            },
            (error) => {
                console.log(error);
            })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        //make post ajax call here
        if(proceedToSummary) {
            appContext.priceDispatch({
                type: "SET_PRICE",
                price: ((parseInt(bookingDetails.ticketPrice) || 200) * parseInt(appContext.noOfSeats))
            })
            history.push('./summary')
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
                        Movie Name: {name}
                    </div>
                    <div className="moviedetails_language details_row">
                        Language: {language}
                    </div>
                    <div className="moviedetails_screentype">
                        Format: {screenType}
                    </div>
                </div>
            </Container>

            <Container
                name="bookingdetails"
                headerText="Booking Details">
                {appContext.selectedTheater  === ''
                    ? <div className="bookingdetails_list">
                        <h3>Select Your Theater:</h3>
                        {theaterList.length > 0 && theaterList.map(theater =>
                            <div>
                                <Button
                                    className="theater_option"
                                    color="primary"
                                    onClick={(ev) => setSelectedTheater(ev)}>
                                    {theater.theaterName}
                                </Button>
                            </div>)}
                    </div>
                    : <div className="bookingdetails_content">
                        <div className="details_row">
                            <h3>Theater Selected: {appContext.selectedTheater}</h3>
                        </div>
                        <div className="bookingdetails_date details_row">
                            <label htmlFor="bookingDetailsDate">Date:</label>
                            <select
                                id="bookingDetailsDate"
                                onChange={(ev) => appContext.showDateDispatch({
                                    type: "SET_SHOW_DATE",
                                    showDate: ev.target.value
                                })}>
                                <option>Select Show Date</option>
                                {bookingDetails && bookingDetails.showDates && bookingDetails.showDates.map((date) =>
                                    <option value={date}>{date}</option>
                                )}
                            </select>
                        </div>
                        <div className="bookingdetails_time details_row">
                            <label htmlFor="bookingDetailsTime">Show Time:</label>
                            <select id="bookingDetailsTime"
                                onChange={(ev) => appContext.showTimeDispatch({
                                    type: "SET_SHOW_TIME",
                                    showTime: ev.target.value
                                })}>
                                <option>Select Show Time</option>
                                {bookingDetails && bookingDetails.showTimes && bookingDetails.showTimes.map((showTime) =>
                                    <option value={showTime}>{showTime}</option>
                                )}
                            </select>
                        </div>
                        <div className="bookingdetails_seats details_row">
                            <label htmlFor="bookingDetailsSeats">Number of Seats:</label>
                            <input 
                                type="text" 
                                id="bookingDetailsSeats" 
                                onChange={(ev) => appContext.noOfSeatsDispatch({
                                    type: "SET_NO_OF_SEATS",
                                    noOfSeats: ev.target.value
                                })}/>
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
