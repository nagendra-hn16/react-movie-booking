import React from 'react'
import './Container.css'

function Container(props) {
    return (
        <div className={`${props.name}_container container`}>
            <div className={`${props.name}_header header`}>
                <h2>{props.headerText}</h2>
            </div>
            <div className="content">
                {props.children}
            </div>
        </div>
    )
}

export default Container
