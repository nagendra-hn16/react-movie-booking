import React, { useEffect, useState  } from 'react'
import Container from '../Common/Container/Container'
import './Summary.css'
import { Button } from '@material-ui/core'
import {  useHistory } from 'react-router-dom';

function Summary() {
    const [summaryDetails, setSummaryDetails] = useState({})
    const history = useHistory();
    useEffect(() => {
        fetch('http://localhost:4000/bookingSummary')
            .then(resp => resp.json())
            .then(result => {
                setSummaryDetails(result);
            },
            error => {
                console.log(error);
            })
    }, [])

    const goBack =() => {
        history.push(`/details?name=Movie1&language=$English&format=2D`)
    }

    const goForward =() => {
        history.push(`/checkout`)
    }
    return (
        <div className="summary">
            <Container
                name="summary"
                headerText="Booking Summary">

                {summaryDetails
                    ? <div className="summary_details">
                        <div className="summary_details_label">
                            You have selected the following details
                        </div>
                        <div className="summary_row">
                            <span>Theater Name</span>
                            : {summaryDetails.theaterName}
                        </div>
                        <div className="summary_row">
                            <span>Location</span>
                            : {summaryDetails.location}
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
                            : {summaryDetails.date}
                        </div>
                        <div className="summary_row">
                            <span>Show Timing</span>
                            : {summaryDetails.time}
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
