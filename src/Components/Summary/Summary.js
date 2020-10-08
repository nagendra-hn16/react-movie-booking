import React, { useContext } from 'react'
import Container from '../Common/Container/Container'
import './Summary.css'
import { Button } from '@material-ui/core'
import {  useHistory } from 'react-router-dom';
import { AppContext } from '../../App';

function Summary() {
    const appContext = useContext(AppContext);
    let  errorOnPage  = false;
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

    const goForward = async () =>  {
        const resp  = await fetch('https://safe-garden-70688.herokuapp.com/login/confirmBooking',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'autorization': `bearer ${sessionStorage.getItem('userToken')}`
                },
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
            });
        if(resp.msg === "booking confirmed!") {
            history.push(`/checkout`)
        } else  {
            errorOnPage = true;
        }
        
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
