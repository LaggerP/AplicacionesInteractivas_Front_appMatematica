import React, { Component } from 'react'
import './MenuJuegos.scss';
import CardJuego from './CustomComponent/CardJuego/CardJuego'
import Button from '@material-ui/core/Button'
import MenuJuegosNavbar from './MenuJuegosNavbar/MenuJuegosNavbar';
import fractions from '../../assets/Images/fractions.png';
import money from '../../assets/Images/monedas.png';
import sums from '../../assets/Images/sumas.png';
import auth from "../../ProtectedRoutes/auth";
import { Link } from 'react-router-dom';

export default class MenuJuegos extends Component {

   getUser () {
      return auth.getUser()
   }

   render() {
      return (
         <div>
            <MenuJuegosNavbar/>
            <div className="bodyContainerMenuJuegos">
               <h1 className='Bienvenido1'>¡Hola {this.getUser()}!</h1>
               <h3 className='Bienvenido2'>Elegi cualquiera de nuestros juegos y comenzá a divertirte</h3>
               <ul className="bodyContainer-cards">
                  <li className="bodyContainerMenuJuegos-cards-itemJuego">
                     <Button>
                        <CardJuego
                        title="Monedas"
                        detail="Vamos al super juntos! En este juego vamos aprender
                              a recibir y dar el cambio de lo que compramos.
                              Comenzemos a jugar"
                        img={money}>
                        </CardJuego>
                     </Button>
                  </li>
               
                  <li className="bodyContainerMenuJuegos-cards-itemJuego">
                     <Button component = {Link} to = "/games/multiplicacion">
                        <CardJuego
                        title="Multiplicación"
                        detail="En este juego aprenderemos a multiplicar
                                 forma muy divertida con imagenes cotidianas.
                                 Ahora si, comenzemos a jugar!"
                        img={fractions}>
                        </CardJuego>
                     </Button>
                  </li>
               
               
                  <li className="bodyContainerMenuJuegos-cards-itemJuego">
                     <Button>
                        <CardJuego
                        title="Sumas"
                        detail="El juego de sumas se trata en agilizar la mente.
                                 Vamos a estar viendo sumas, restas, encontrar el mayor
                                 y el menor de un numero. Empezemos a jugar!"
                        img={sums}>
                        </CardJuego>
                     </Button>
                  </li>
               </ul>
            </div>
         </div>
      )
   }
}
