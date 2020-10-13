import React, { useState, useContext } from 'react'
import './Login.css'
import { useHistory } from "react-router-dom";
import Container from '../Common/Container/Container';
import { AppContext } from '../../App.js'
import { useFormValidation } from '../Common/Hooks/useFormValidation';

function Login() {
    const appContext = useContext(AppContext);
    const [invalid, setInvalid] = useState(false)
    const history = useHistory();

    const {
        values,
        errorMsgs,
        bind,
        isFormValid
    } = useFormValidation({
        userName: {
            required: 'Please enter your User Name',
            pattern: {
                value: '^[a-zA-Z0-9_]+$',
                message: 'User Name is invalid'
            }
        },
        password: {
            required: 'Please enter your password'
        }
    }, {
        userName: '',
        password: ''
    })

    const handleSubmit=(event) => {
        event.preventDefault();
        const isValid = isFormValid();
        if (isValid) {
            fetch('https://safe-garden-70688.herokuapp.com/login/validateUsers', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        "username": values.userName,
                        "password": values.password
                    })
                })
                .then(res => res.json())
                .then(
                    (result) => {
                        // console.log('result', result);
                        if (result.msg === 'valid user') {
                            appContext.isLoggedInDispatch({
                                type: 'LOGIN'
                            });
                            appContext.userNameDispatch({
                                type: 'SET_USERNAME',
                                userName: values.userName
                            });
                            history.push('/list');
                        } else {
                            setInvalid(true);
                        }
                    },
                    (error) => {
                        console.log('error', error);
                    }
                )
        }
    }

    return (<div className="login">
        <Container 
            name="login"
            headerText="Login">
            <form className="login_form" >
            <div className="login_username" >
                <label htmlFor="userName" > User Name: </label> 
                <div className={`login_username_field${errorMsgs.userName 
                    ? ' field_error_container' 
                    : ''}`}>
                    <input type="text"
                        id="userName"
                        name="userName" 
                        { ...bind('userName') }/> 
                    {errorMsgs.userName
                        ? <div className="field_error">
                            {errorMsgs.userName}
                        </div>
                        : ''}
                </div> 
            </div> 
            <div className="login_password">
                <label htmlFor="password"> Password: </label> 
                <div className={`login_password_field${errorMsgs.password 
                    ? ' field_error_container' 
                    : ''}`}>
                    <input type="password"
                        id="password"
                        name="password" 
                        {...bind('password')}/> 
                        {errorMsgs.password
                            ? <div className="field_error"> 
                                {errorMsgs.password} 
                            </div>  
                            : ''}
                </div> 
            </div> 
            <div className="login_submit">
                <button 
                    onClick={ handleSubmit}> 
                    Sign In 
                </button>
            </div> 
            {invalid ? 'Invalid credentials.' : ''}
            </form>
    </Container> 
    </div>)
}

export default Login