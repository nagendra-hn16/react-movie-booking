import React from 'react'
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import './Rating.css';

function Rating(props) {
    let currentRating = props.rating || 0;
    let ratingsArr = [0, 0, 0, 0, 0];
    for(let rating in ratingsArr) {
        if(currentRating >  0) {
            ratingsArr[rating] = 1;
            currentRating--
        }
    }
    return (
        <div className="rating">
            {ratingsArr.map(rating => rating === 1 ? <StarIcon/> : <StarBorderIcon/> )}
        </div>
    )
}

export default Rating
