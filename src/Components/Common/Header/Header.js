import React, { useContext } from 'react'
import './Header.css'
import { Button } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import FieldIcons from '../FieldIcons/FieldIcons';
import { AppContext } from '../../../App';

function Header() {
    const appContext = useContext(AppContext);
    const locations = appContext.locations;
    return (
        <div className="global_header">
            <div className="global_header_logo">
                Infy Movies
            </div>
            <div>
                {appContext.userName
                    ? <div className="global_header_actions">
                        <p>Welcome {appContext.userName}</p>
                        <Button 
                            variant="contained" 
                            color="primary"
                            onClick={()  => appContext.isLoggedInDispatch({type: 'LOGOUT'})}
                            className="global_header_button">
                            Log out
                        </Button>
                        <div className="header_actions_locations">
                            <FieldIcons iconPosition="before">
                                <LocationOnIcon className="fieldicon_font"/>
                            </FieldIcons>
                            {locations && locations.length > 0
                                ? <select 
                                    id="header_actions_locations"
                                    onChange={(event) => appContext.locationDispatch({
                                        type: 'SET_LOCATION',
                                        location: event.target.value
                                    })}>
                                    {locations.map((location, index) => 
                                        <option key={`location${index}`} value={location}>
                                            {location}
                                        </option>)}
                                </select>
                                : <span>{appContext.location}</span>}
                            
                        </div>
                    </div>
                    : ''
                }
            </div>
            
        </div>
    )
}

export default Header
