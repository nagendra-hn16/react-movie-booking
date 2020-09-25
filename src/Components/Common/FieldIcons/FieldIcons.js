import React from 'react'
import './FieldIcons.css'

function FieldIcons(props) {
    return (
        <div className={`fieldicon icon_${props.iconPosition}`}>
            {props.children}
        </div>
    )
}

export default FieldIcons
