import React, { Component } from 'react';
import MenuJuegosNavbar from '../../MenuJuegosNavbar/MenuJuegosNavbar'
import './Multiplicacion.scss'
import Multiplicacion from './Multiplicacion';
import { Button } from '@material-ui/core'
import Tablero from './Tablero'
import Tablero2 from './Tablero2'
import Tablero3 from './Tablero3'
import construccionJuego from './construccionJuego'
import { Link } from 'react-router-dom';
/*
const cardArray = [
            

            
    [{
        name: 'seis',
        img: 'images/6por6.png'
    },
    {
        name: 'seis',
        img: 'images/treintayseis.png'
    }
    ],
    {
        name: 'siete',
        img: 'images/cuarentaynueve.png'
    },
    {
        name: 'siete',
        img: 'images/7por7.jpg'
    },
    {
        name: 'dos',
        img: 'images/2por2.jpg'
    },
    {
        name: 'dos',
        img: 'images/cuatro.jpg'
    },
    {
        name: 'cinco',
        img: 'images/veinticinco.png'
    },
    {
        name: 'cinco',
        img: 'images/5por5.jpg'
    },
    {
        name: 'ocho',
        img: 'images/8por8.png'
    },
    {
        name: 'ocho',
        img: 'images/sesentaycuatro.png'
    },
    {
        name: 'cuatro',
        img: 'images/dieciseis.png'
    },
    {
        name: 'cuatro',
        img: 'images/4por4.jpg'
    }

]
*/

class Juego extends Component {
    constructor() {
        super();
        this.state = {
            isPlaying: true,
            actualLevel: 1,
            gamePoints: 0,
            cardArray: [],
        }
    }

    nextLevel = () => {
        this.setState({ actualLevel: this.state.actualLevel + 1 })
    }

    finalizarJuego = () => {
        this.setState({ actualLevel: this.state.actualLevel + 1 })
    }


    render() {
        const { isPlaying, actualLevel } = this.state
        if (isPlaying && actualLevel == 1) {
            //tengo que poner 3 ifs: uno si es el nivel 1, otro si es el nivel 2, otro si es nivel 3 y otro si gana el juego
            return (
                <div className="JuegoMultiplicacion">
                    <MenuJuegosNavbar />
                    <header className="Juego-header">
                        <h1 className="Juego-titulo">¡ME DIVIERTO Y MULTIPLICO! : NIVEL 1</h1>

                    </header>

                    <div className="Juego">

                        <Tablero actualLevel={this.state.actualLevel} />

                    </div>

                    <Button onClick={this.nextLevel} variant="contained" color="secondary" size="large" text-align="center" >
                        CONTINUAR SIGUIENTE NIVEL
                </Button>
                </div>
            )
        }
        if (isPlaying && actualLevel == 2) {
            return (
                <div>
                    <MenuJuegosNavbar />
                    <header className="Juego-header">
                        <h1 className="Juego-titulo">¡ME DIVIERTO Y MULTIPLICO! : NIVEL 2</h1>
                        <Tablero2 actualLevel={this.state.actualLevel} />
                    </header>

                    <Button onClick={this.nextLevel} variant="contained" color="secondary" size="large" text-align="center" >
                        CONTINUAR SIGUIENTE NIVEL
            </Button></div>
            )
        }
        if (isPlaying && actualLevel == 3) {
            return (
                <div>
                    <MenuJuegosNavbar />
                    <header className="Juego-header">
                        <h1 className="Juego-titulo">¡ME DIVIERTO Y MULTIPLICO! : NIVEL 3</h1>
                        <Tablero3 actualLevel={this.state.actualLevel} />
                    </header>

                    <Button component={Link} to="/games" variant="contained" color="secondary" size="large" text-align="center">
                        VOLVER AL MENÚ DE JUEGOS</Button>
                </div>
            )
        }
        if (isPlaying && actualLevel == 4) {
            return (
                <h1>hola</h1>
            )
        }
    }
}

export default Juego;