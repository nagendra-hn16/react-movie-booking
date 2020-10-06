import React, { useContext } from 'react'
import Container from '../Common/Container/Container'
import { Button } from '@material-ui/core'
import './Checkout.css'
import {  useHistory } from 'react-router-dom';
import { AppContext } from '../../App';

function Checkout() {
    const appContext = useContext(AppContext);
    const history = useHistory();
    const goToList = () => {
        history.push('/list')
    }

    return (
        <div className="checkout">
            <Container
                name="checkout"
                headerText="Checkout Details">
                <div className="checkout_total">
                    Total amount to be paid: Rs {appContext.price}
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
