import React, { Component } from 'react'
import Card from './Card/Card'
import './LandingBody.scss'
import kidImage from '../../../assets/Images/kidVictory.jpg'
import kidTablet from '../../../assets/Images/kidTablet.jpg'
import kidLaptop from '../../../assets/Images/kidLaptop.jpg'

export default class LandingBody extends Component {

   render() {
      return (
         <div className="bodyContainer" id="games">
            <ul className="bodyContainer-cards">
               <li className="bodyContainer-cards-item">
                  <Card
                      title="Juegos 🎮"
                      detail="¡Juegos divertidos y desafiantes!"
                      img={kidTablet}/>
               </li>
               <li className="bodyContainer-cards-item">
                  <Card
                      title="Ranking 📊"
                      detail="¡Compite con tus amigos!"
                      img={kidImage}/>
               </li>
               <li className="bodyContainer-cards-item">
                  <Card
                      title="Para todas las edades 🧑‍🎓"
                      detail="¡Juegos de matemática y gramática!"
                      img={kidLaptop}/>
               </li>
            </ul>
         </div>
      )
   }
}
