import React, { useEffect, useContext, useState } from 'react'
import Container from '../Common/Container/Container'
import './Summary.css'
import { Button } from '@material-ui/core'
import {  useHistory } from 'react-router-dom';
import { AppContext } from '../../App';

function Summary() {
    const appContext = useContext(AppContext);
    let  errorOnPage  = false;
    const [summaryDetails, setSummaryDetails] = useState({})
    const history = useHistory();
    useEffect(() => {
        fetch('https://safe-garden-70688.herokuapp.com/movie/bookingSummary',
            {
                method: 'GET',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(resp => resp.json())
            .then(res => {
                setSummaryDetails(res.bookingSummary);
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
            },
            error => {
                console.log(error);
            })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const goBack =() => {
        history.push(`/details`)
    }

    const goForward = () =>  {
        fetch('https://safe-garden-70688.herokuapp.com/movie/confirmBooking',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: "include"
            }).then(resp => resp.json())
            .then(res => {
                console.log(res)
                console.log(res.msg)
                if(res.msg === "booking confirmed!") {
                    history.push(`/checkout`)
                }
            }, error => {
                errorOnPage = true;
            })
    }
    return (
        <div className="summary">
            <Container
                name="summary"
                headerText="Booking Summary">
                {errorOnPage
                    ? <div className="summary_error">
                        There was some issue with  your booking. Please try later.
                    </div>
                    : ''}
                {summaryDetails.seats
                    ? <div className="summary_details">
                        <div className="summary_details_label">
                            You have selected the following details
                        </div>
                        <div className="summary_row">
                            <span>Theater Name</span>
                            : {summaryDetails.selectedTheater}
                        </div>
                        <div className="summary_row">
                            <span>Location</span>
                            : {summaryDetails.selectedLocation}
                        </div>
                        <div className="summary_row">
                            <span>Seats Booked</span>
                            : {summaryDetails.seats}
                        </div>
                        <div className="summary_row">
                            <span>Movie Name</span>
                            : {summaryDetails.movieName}
                        </div>
                        <div className="summary_row">
                            <span>Price</span>
                            : {summaryDetails.price}
                        </div>
                        <div className="summary_row">
                            <span>Show Date</span>
                            : {summaryDetails.showDate}
                        </div>
                        <div className="summary_row">
                            <span>Show Timing</span>
                            : {summaryDetails.showTime}
                        </div>
                        
                        <div className="summary_actions">
                            <Button
                                variant="contained" 
                                color="primary"
                                onClick={goBack}>
                                Modify Booking
                            </Button>
                            <Button
                                variant="contained" 
                                color="primary"
                                onClick={goForward}>
                                Confirm Booking
                            </Button>
                        </div>
                    </div>
                    : ''}
                
            </Container>
        </div>
    )
}

export default Summary
