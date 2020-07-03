import React, { Component } from 'react'
import MenuJuegosNavbar from '../../MenuJuegosNavbar/MenuJuegosNavbar'
import './Multiplicacion.scss'
import pizzaron from '../../../../assets/Images/pizarron.png';
import { Avatar } from '@material-ui/core';
import { Button } from '@material-ui/core'
//import { ButtonBase } from '@material-ui/core';
//import { IconButton } from '@material-ui/core';
import piz from '../../../../assets/Images/pizarron.png';
import m2x2 from '../../../../assets/Images/2por2.jpg';
import n4 from '../../../../assets/Images/cuatro.jpg';
import Juego from './Juego';


class Multiplicacion extends Component {
    constructor() {
        super();
        this.state = {
            isPlaying: false,
            actualLevel: 0,
            gamePoints: 0,
        }
    }

    nextLevel = () => {
        this.setState({ actualLevel: this.state.actualLevel + 1 })
    }
    render() {
        const { isPlaying, actualLevel } = this.state

        if (!isPlaying && actualLevel === 0) {

            return (
                console.log("cargo las instrucciones y el inicio"),
                <div className="JuegoMultiplicacion">
                    <MenuJuegosNavbar />
                    <header className="Juego-header">
                        <h1 className="Juego-titulo">¡ME DIVIERTO Y APRENDO!</h1>
                    </header>
                    <div className="Multiplicacion-game">
                        <p>
                            En este juego, vamos a practicar las tablas de multiplicar de una manera diferente: a través de un juego de memoria.
                            <br />
                            Al comenzar el juego, vas a encontrarte con cartas boca abajo: del otro lado, las cartas tendrán un resultado, o una multiplicación.
                        </p>
                        <br />
                        <div className="pizarronDiv">

                            <img src={piz} alt="pizarron" className="pizarron"/> 
                            <img src={piz} alt="pizarron" className="pizarron"/>
                        </div>
                        <p>Toca una tarjeta para darla vuelta, y memorizarla, y luego, toca otra carta para encontrar su pareja.
                            <br /> 
                            <img src={m2x2} alt="multiplicacion" className="img-class" /> <img src={n4} alt="numero" className="img-class" />
                            <br /> 
                            Si encontrás la tarjeta ganadora, las cartas desaparecerán. Caso contrario, ambas tarjetas se darán vuelta nuevamente y tendrás otra oportunidad.
                            <br /> 
                            El objetivo del juego es encontrar todas las parejas.
                </p>
                         <div className="ComenzarButton">
                    <Button onClick={this.nextLevel}>Comenzar</Button>
                </div>
                    </div>
                </div>

            )
        }

        else {
            return (
                <Juego />
            )
        }
    }

}

export default Multiplicacion;

