import React from 'react'
import './Card.scss'

const Card = (props) => {
   return (
      <div className="card">
         <div className="card-image">
            <img src={props.img} alt="" />
         </div>
         <div className="card-content">
            <h1 className="card-content--title">{props.title}</h1>
            <p className="card-content--text">{props.detail}</p>
         </div>
      </div>
   )
}


export default Card