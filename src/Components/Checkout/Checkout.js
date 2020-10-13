import React, { useState, useEffect } from 'react'
import Container from '../Common/Container/Container'
import { Button } from '@material-ui/core'
import './Checkout.css'
import {  useHistory } from 'react-router-dom';

function Checkout(props) {
    const history = useHistory();
    const goToList = () => {
        history.push('/list')
    }
    const [price, setPrice] = useState(0)

    useEffect(() => {
        fetch('https://safe-garden-70688.herokuapp.com/movie/bookingConfirmation',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: "include"
            }).then(resp => resp.json())
            .then(res => {
                setPrice(res.bookingConfirmation.price)
            }, error => {
                console.log(error)
            })
        
    }, [])

    return (
        <div className="checkout">
            <Container
                name="checkout"
                headerText="Checkout Details">
                <div className="checkout_total">
                    Total amount to be paid: Rs {price}
                </div>
                <div className="checkout_instruction">
                    Thanks for booking your tickets. Please collect your tickets at the counter.
                </div>
                <div className="checkout_moretickets">
                    <Button 
                        color="primary"
                        onClick={goToList}>Book More Tickets</Button>
                </div>
            </Container>
        </div>
    )
}

export default Checkout
