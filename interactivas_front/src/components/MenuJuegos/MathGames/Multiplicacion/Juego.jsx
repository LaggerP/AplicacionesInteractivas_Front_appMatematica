import React, { Component } from 'react';
import MenuJuegosNavbar from '../../MenuJuegosNavbar/MenuJuegosNavbar'
import './Multiplicacion.scss'
import Tablero from './Tablero'
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
        const { isPlaying,puntaje, actualLevel } = this.state
        if (isPlaying) {
            return (
                <div className="JuegoMultiplicacion">
                    <MenuJuegosNavbar />
                    <header className="Juego-header">
                        {actualLevel<=3 ? 
                        <h1 className="Juego-titulo">¡ME DIVIERTO Y APRENDO! : NIVEL {actualLevel}</h1> 
                        
                        :
                        <h1 className="Juego-titulo">¡ME DIVIERTO Y APRENDO! : JUEGO FINALIZADO</h1>
                        }
                    </header>
                    <h2 className="Puntaje">PUNTOS: {puntaje}</h2>
                    <Tablero callback={this.getPuntaje} callbackLevel={this.getLevel} />
                    
                   
                </div>
            )
        }
    }
}

export default Juego;