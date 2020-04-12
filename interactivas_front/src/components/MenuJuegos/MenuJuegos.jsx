import React, { Component } from 'react'
import CardJuego from './CustomComponent/CardJuego/CardJuego'
import auth from '../../ProtectedRoutes/auth'
import Button from '@material-ui/core/Button'
import kidTablet from "../../assets/Images/kidTablet.jpg";
import MenuNavbar from './MenuJuegosNavbar/MenuJuegosNavbar'

export default class MenuJuegos extends Component {

   signOut = (e) => {
      e.preventDefault();
      auth.signOut(() => this.props.history.push('/'))
   }

   render() {
      return (
          <div>
             <MenuNavbar></MenuNavbar>
             <div className="bodyContainer">
                <ul className="bodyContainer-cards">
                   <li className="bodyContainer-cards-item">
                      <CardJuego
                          title="Juegos 🎮"
                          detail="¡Juegos divertidos y desafiantes!"
                          img={kidTablet}></CardJuego>
                   </li>
                   <li className="bodyContainer-cards-item">
                      <CardJuego
                          title="Juegos 🎮"
                          detail="¡Juegos divertidos y desafiantes!"
                          img={kidTablet}></CardJuego>
                   </li>
                   <li className="bodyContainer-cards-item">
                      <CardJuego
                          title="Juegos 🎮"
                          detail="¡Juegos divertidos y desafiantes!"
                          img={kidTablet}></CardJuego>
                   </li>
                </ul>
             </div>
             <Button onClick={this.signOut} variant="contained" color="primary">Cerrar sesión</Button>
          </div>
      )
   }
}
