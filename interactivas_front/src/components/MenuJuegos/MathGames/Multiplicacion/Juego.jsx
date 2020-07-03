import React, { Component } from 'react';
import MenuJuegosNavbar from '../../MenuJuegosNavbar/MenuJuegosNavbar'
import './Multiplicacion.scss'
import Multiplicacion from './Multiplicacion';
import { Button } from '@material-ui/core'
import Tablero from './Tablero'
import Tablero2 from './Tablero2'
import Tablero3 from './Tablero3'

import MyCard from './MyCard';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';

import { Link } from 'react-router-dom';
import imagePizarron from '../../../../assets/Images/pizarron.png';

import {saveLevelPoint} from '../../../../services/rankingServices';


class Juego extends Component {
    constructor() {
        super();
        this.state = {
            isPlaying: true,
            actualLevel:1,
            gamePoints: 0,
            puntaje:0,
            imagePizarron: imagePizarron,
            isLoading: false,
        }
    }

    getLevel = (actualLevelTab) => {
        console.log('Level pasado de TABLERO: '+ actualLevelTab)
        this.setState({actualLevel: actualLevelTab });
    }

   

    updateScore = async ()  =>{
        console.log('Guarda puntaje a la tabla ranking')
        let dataPoints = {
            username: localStorage.getItem('sessionName'), 
            gamePoint: this.state.puntaje 
        }
        console.log(dataPoints);
        await saveLevelPoint(dataPoints, 'multiplicacion');
    }

    finalizarJuego = () => {
        this.setState({ actualLevel: this.state.actualLevel + 1 })

    }
    componentDidMount() {
        this.setState({ isLoading: true })
    }
    
    
    getPuntaje = (puntajeTablero) => {
        console.log(puntajeTablero);
        this.setState({puntaje: puntajeTablero})
    }
    render() {
        const { isPlaying,puntaje,isFlip } = this.state
        if (isPlaying) {
            return (
                <div className="JuegoMultiplicacion">
                    <MenuJuegosNavbar />
                    <header className="Juego-header">
                        <h1 className="Juego-titulo">¡ME DIVIERTO Y APRENDO! : NIVEL {this.state.actualLevel}</h1>

                    </header>
                    <h2 className="Puntaje">PUNTOS: {this.state.puntaje}</h2>
                    <Tablero callback={this.getPuntaje} callbackLevel={this.getLevel} />
                    
                   
                </div>
            )
        }
        /*
        if (isPlaying && actualLevel === 2) {
            return (
                <div>
                    <MenuJuegosNavbar />
                    <header className="Juego-header">
                        <h1 className="Juego-titulo">¡ME DIVIERTO Y APRENDO! : NIVEL 2</h1>
                        <h2 className="Puntaje">Puntaje: {this.state.puntaje}</h2>
                        <Tablero2 actualLevel={this.state.actualLevel} puntaje={this.state.puntaje} callback={this.getPuntaje}/>
                        
                    </header>

                    <div className="ComenzarButton">
                    <Button onClick={this.nextLevel}>CONTINUAR AL SIGUIENTE NIVEL</Button>
                </div></div>
            )
        }
        if (isPlaying && actualLevel === 3) {
            return (
                <div>
                    <MenuJuegosNavbar />
                    <header className="Juego-header">
                        <h1 className="Juego-titulo">¡ME DIVIERTO Y APRENDO! : NIVEL 3</h1>
                        <h2 className="Puntaje">Puntaje: {this.state.puntaje}</h2>
                        <Tablero3 actualLevel={this.state.actualLevel} puntaje={this.state.puntaje} callback={this.getPuntaje}/>
                        
                    </header>
                    <div className="ComenzarButton">
                    <Button component={Link} to="/games">VOLVER AL MENÚ DE JUEGOS</Button>
                </div>
                    
                </div>
            )
        }
        */
    }
}

export default Juego;