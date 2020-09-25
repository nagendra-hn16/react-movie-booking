import React, { useEffect, useState } from 'react'
import {  useHistory } from 'react-router-dom';
import './MovieDetails.css'
import { Button } from '@material-ui/core';
import Container from '../Common/Container/Container';

function MovieDetails() {
    const history = useHistory();
    const urlParams = new URLSearchParams(history.location.search);
    const [selectedTheater, setSelectedTheater] = useState('');
    const [theaterList, setTheaterList] = useState([]);
    const [bookingDetails, setBookingDetails] = useState({})
    const [proceedToSummary, setProceedToSummary] = useState(false);

    useEffect(() => {
        fetch('http://localhost:4000/movieDetails')
            .then(resp => resp.json())
            .then((result)=> {
                // console.log(result.bookingInfo.theaters);
                setTheaterList(result.bookingInfo.theaters)
            },
            (error) => {
                console.log(error);
            })
    }, [])

    useEffect(() => {
        //make post ajax call here
        if(proceedToSummary) {
            history.push('./summary')
        }
    // eslint-disable-next-line
    }, [proceedToSummary])

    useEffect(() => {
        fetch('http://localhost:4000/bookingDetails')
            .then(resp => resp.json())
            .then((result)=> {
                // console.log(result);
                setBookingDetails(result)
            },
            (error) => {
                console.log(error);
            })
    }, [selectedTheater])

    return (
        <div className="details">
            <Container
                name="moviedetails"
                headerText="Movie Details">
                <div className="moviedetails_content">
                    <div className="moviedetails_image"></div>
                    <div className="moviedetails_name details_row">
                    Movie Name: {urlParams.get('name')}
                    </div>
                    <div className="moviedetails_language details_row">
                        Language: {urlParams.get('language')}
                    </div>
                    <div className="moviedetails_screentype">
                        Format: {urlParams.get('format')}
                    </div>
                </div>
            </Container>

            <Container
                name="bookingdetails"
                headerText="Booking Details">
                {selectedTheater  === ''
                    ? <div className="bookingdetails_list">
                        <h3>Select Your Theater:</h3>
                        {theaterList.length > 0 && theaterList.map(theater =>
                            <div>
                                <Button
                                    className="theater_option"
                                    color="primary"
                                    onClick={(ev) => setSelectedTheater(ev.target.innerText)}>
                                    {theater}
                                </Button>
                            </div>)}
                    </div>
                    : <div className="bookingdetails_content">
                        <div className="details_row">
                            <h3>Theater Selected: {bookingDetails.selectedTheater}</h3>
                        </div>
                        <div className="bookingdetails_date details_row">
                            <label htmlFor="bookingDetailsDate">Date:</label>
                            <select id="bookingDetailsDate">
                                {bookingDetails && bookingDetails.dates && bookingDetails.dates.map((date) =>
                                    <option>{date}</option>
                                )}
                            </select>
                        </div>
                        <div className="bookingdetails_time details_row">
                            <label htmlFor="bookingDetailsTime">Show Time:</label>
                            <select id="bookingDetailsTime">
                                {bookingDetails && bookingDetails.timings && bookingDetails.timings.map((timing) =>
                                    <option>{timing}</option>
                                )}
                            </select>
                        </div>
                        <div className="bookingdetails_seats details_row">
                            <label htmlFor="bookingDetailsSeats">Number of Seats:</label>
                            <input type="text" id="bookingDetailsSeats" />
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
