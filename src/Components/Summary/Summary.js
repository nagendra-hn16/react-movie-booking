import React, { useContext } from 'react'
import Container from '../Common/Container/Container'
import './Summary.css'
import { Button } from '@material-ui/core'
import {  useHistory } from 'react-router-dom';
import { AppContext } from '../../App';

function Summary() {
    const appContext = useContext(AppContext);
    // const [summaryDetails, setSummaryDetails] = useState({})
    const history = useHistory();
    // useEffect(() => {
    //     fetch('http://localhost:4000/bookingSummary')
    //         .then(resp => resp.json())
    //         .then(result => {
    //             setSummaryDetails(result);
    //         },
    //         error => {
    //             console.log(error);
    //         })
    // }, [])

    const goBack =() => {
        history.push(`/details`)
    }

    const goForward =() => {
        fetch('http://localhost:5000/login/confirmBooking',
            {
                method: 'POST',
                'Content-Type': 'application/json',
                body: JSON.stringify({
                    "movieName": appContext.movieName,
                    "selectedTheater": appContext.selectedTheater,
                    "location": appContext.location,
                    "noOfSeats": appContext.noOfSeats,
                    "price": appContext.price,
                    "showDate": appContext.showDate,
                    "showTime": appContext.showTime,
                    "userName": appContext.userName
                })
            })
        history.push(`/checkout`)
    }
    return (
        <div className="summary">
            <Container
                name="summary"
                headerText="Booking Summary">

                {appContext.noOfSeats
                    ? <div className="summary_details">
                        <div className="summary_details_label">
                            You have selected the following details
                        </div>
                        <div className="summary_row">
                            <span>Theater Name</span>
                            : {appContext.selectedTheater}
                        </div>
                        <div className="summary_row">
                            <span>Location</span>
                            : {appContext.location}
                        </div>
                        <div className="summary_row">
                            <span>Seats Booked</span>
                            : {appContext.noOfSeats}
                        </div>
                        <div className="summary_row">
                            <span>Movie Name</span>
                            : {appContext.movieName}
                        </div>
                        <div className="summary_row">
                            <span>Price</span>
                            : {appContext.price}
                        </div>
                        <div className="summary_row">
                            <span>Show Date</span>
                            : {appContext.showDate}
                        </div>
                        <div className="summary_row">
                            <span>Show Timing</span>
                            : {appContext.showTime}
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
