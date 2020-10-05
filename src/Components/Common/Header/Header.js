import React, { useEffect, useState, useContext } from 'react'
import './Header.css'
import { Button } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import FieldIcons from '../FieldIcons/FieldIcons';
import { AppContext } from '../../../App';

function Header(props) {
    const appContext = useContext(AppContext);
    const [isLoaded, setIsLoaded] = useState(false)
    const [locations, setLocations] = useState([])
    const [error, setError] = useState('')

    useEffect(() => {
        fetch('http://localhost:5000/locations')
        .then(response => response.json())
        .then(result => {
                setIsLoaded(true);
                setLocations(result[0].locations);
            },
            error => {
                setIsLoaded(false);
                setError(error.toString());
            }
        )
    }, [])
    return (
        <div className="global_header">
            <div className="global_header_logo">
                Infy Movies
            </div>
            <div>
                {appContext.isLoggedIn
                    ? <div className="global_header_actions">
                        <p>Welcome {appContext.userName}</p>
                        <Button 
                            variant="contained" 
                            color="primary"
                            onClick={()  => appContext.isLoggedInDispatch({type: 'LOGOUT'})}
                            className="global_header_button">
                            Log out
                        </Button>
                        {isLoaded
                            ? <div className="header_actions_locations">
                                <FieldIcons iconPosition="before">
                                    <LocationOnIcon className="fieldicon_font"/>
                                </FieldIcons>
                                <select 
                                    id="header_actions_locations"
                                    onChange={(event) => appContext.locationDispatch({
                                        type: 'SET_LOCATION',
                                        location: event.target.value
                                    })}>
                                    {locations && locations.length > 0 && locations.map((location, index) => 
                                        <option key={`location${index}`} value={location}>
                                            {location}
                                        </option>)}
                                </select>
                            </div>
                            : <div>{error}</div>}
                    </div>
                    : ''
                }
            </div>
            
        </div>
    )
}

export default Header
