import React, { Component } from 'react'
import './MenuJuegos.scss';
import MenuJuegosNavbar from './MenuJuegosNavbar/MenuJuegosNavbar';
import multiplicacion from '../../assets/Images/multiplicacion.png'
import billetes from '../../assets/Images/GamesImages/Billetes/billetes.png';
import sumas from '../../assets/Images/GamesImages/Sumas/sumas.png';
import {getUser} from '../../services/authenticationServices'
import { Link } from 'react-router-dom';
import {getAllRankings} from '../../services/rankingServices';

export default class MenuJuegos extends Component {

    state ={Juega:true,
       countUser: 0,
       userPosition: 0
    };

    getUser() { 
        return getUser() 
    }

    async componentWillMount(){
        const data = await getAllRankings()
        data.map( d => {
            return d['puntaje_total']=d.puntaje_billetes + d.puntaje_multiplicacion + d.puntaje_sumas
        });

        //Obtiene total de usuarios
        this.setState({countUser: data.length});

        //Ordena los puntajes totales de mayor a menor y obtiene posicion del usuario
        data.sort(((a, b) => (a.puntaje_total < b.puntaje_total) ? 1 : -1));
        data.forEach((user,index) => {
            if (user.username.toLocaleLowerCase() === getUser().toLocaleLowerCase()){
                this.setState({userPosition: index+1});
            }
        });
    }
    

    render() {
        return (
            <div>
                <MenuJuegosNavbar/>
                <div className="MenuJuegosContainer">
                    <div className="MenuJuegosContainer--title">
                        <h1>Hola {this.getUser()}</h1>
                        <h2>¡Elige al juego que deseas jugar!</h2>
                        <h4>Tu posición en el ranking total es: {this.state.userPosition}/{this.state.countUser}</h4>
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