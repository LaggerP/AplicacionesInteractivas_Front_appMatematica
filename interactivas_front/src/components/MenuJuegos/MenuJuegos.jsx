import React, { Component } from 'react'
import './MenuJuegos.scss';
import MenuJuegosNavbar from './MenuJuegosNavbar/MenuJuegosNavbar';
import fracciones from '../../assets/Images/GamesImages/Fracciones/fracciones.png';
import multiplicacion from '../../assets/Images/multiplicacion.png'
import billetes from '../../assets/Images/GamesImages/Billetes/billetes.png';
import sumas from '../../assets/Images/GamesImages/Sumas/sumas.png';
import auth from "../../ProtectedRoutes/auth";
import { Link } from 'react-router-dom';

export default class MenuJuegos extends Component {

    getUser() {
        return auth.getUser()
    }


    render() {

        return (
            <div>
                <MenuJuegosNavbar/>
                <div className="MenuJuegosContainer">
                    <div className="MenuJuegosContainer--title">
                        <h1>Hola {this.getUser()}</h1>
                        <h2>¡Elige al juego que deseas jugar!</h2>
                        <h4>Tu posición en el ranking es: 1/100</h4>
                    </div>

                    <div className="MenuJuegosContainer--cards">
                        <Link to="/games/billetes" className="Link">
                            <div className="MenuJuegosContainer--cards-item">
                                <div className="MenuJuegosContainer--cards-item-imgBackground">
                                    <img src={billetes} alt=""/>
                                </div>
                                <div className="MenuJuegosContainer--cards-item-description">
                                    <h2>Billetes</h2>
                                    <p>¡Vayamos de compras!
                                        <br/>
                                    Usemos billetes para comprar cosas ricas y divertidas.
                                        <br/>
                                    ¡Solo basta con arrastrar billetes a la caja!</p>
                                </div>

                            </div>
                        </Link>
                        <Link to="/games/multiplicacion" className="Link">
                            <div className="MenuJuegosContainer--cards-item">
                                <div className="MenuJuegosContainer--cards-item-imgBackground">
                                    <img src={multiplicacion} alt=""/>
                                </div>
                                <div className="MenuJuegosContainer--cards-item-description">
                                    <h2>Multiplicación</h2>
                                    <p>En este juego aprenderemos a multiplicar de una forma muy divertida con imagenes cotidianas. <br/>Ahora si, ¡comencemos a jugar!</p>
                                </div>
                            </div>
                        </Link>

                        <Link to="/games/SumasRestasMyM" className="Link">
                            <div className="MenuJuegosContainer--cards-item">
                                <div className="MenuJuegosContainer--cards-item-imgBackground">
                                    <img src={sumas} alt=""/>
                                </div>
                                <div className="MenuJuegosContainer--cards-item-description">
                                    <h2>Sumas</h2>
                                    <p>El juego de sumas se trata en agilizar la mente. 
                                       Vamos a estar viendo sumas, restas, 
                                       encontrar el mayor y el menor de un numero. 
                                       <br/>
                                       ¡Empecemos a jugar!</p>
                                </div>
                            </div>
                        </Link>

                    </div>
                </div>

            </div>
        )
    }
}