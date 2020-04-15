import React, { Component } from 'react'
import CardJuego from './CustomComponent/CardJuego/CardJuego'
import Button from '@material-ui/core/Button'
import MenuNavbar from './MenuJuegosNavbar/MenuJuegosNavbar';
import fractions from '../../assets/Images/fractions.png';
import money from '../../assets/Images/monedas.png';
import sums from '../../assets/Images/sumas.png';
import './MenuJuegos.scss';

export default class MenuJuegos extends Component {
   render() {
      return (
         <div>
            <MenuNavbar></MenuNavbar>
            <div className="bodyContainer">
               <h1 className='Bienvenido1'>¡Hola {localStorage.getItem('sessionName')}!</h1>
               <h3 className='Bienvenido2'>Elegi cualquiera de nuestros juegos y comenzá a divertirte</h3>
               <ul className="bodyContainer-cards">
                  <Button>
                     <li className="bodyContainer-cards-item">
                        <CardJuego
                        title="Monedas"
                        detail="Vamos al super juntos! En este juego vamos aprender
                              a recibir y dar el cambio de lo que compramos.
                              Comenzemos a jugar"
                        img={money}>
                        </CardJuego>
                     </li>
                  </Button>
                  <Button>
                     <li className="bodyContainer-cards-item">
                        <CardJuego
                        title="Fracciones"
                        detail="En este juego aprenderemos a usar fracciones de una
                                 forma muy divertida con imagenes cotidianas.
                                 Ahora si, comenzemos a jugar!"
                        img={fractions}>
                        </CardJuego>
                     </li>
                  </Button>
                  <Button>
                     <li className="bodyContainer-cards-item">
                        <CardJuego
                        title="Sumas"
                        detail="El juego de sumas se trata en agilizar la mente.
                                 Vamos a estar viendo sumas, restas, encontrar el mayor
                                 y el menor de un numero. Empezemos a jugar!"
                        img={sums}>
                        </CardJuego>
                     </li>
                  </Button>
               </ul>
            </div>
         </div>
      )
   }
}
