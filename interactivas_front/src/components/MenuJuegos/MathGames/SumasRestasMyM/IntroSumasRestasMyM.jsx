import React, {Component} from 'react';
import './SumasRestasMyM.scss';
import {Button} from "@material-ui/core";

class IntroSumasRestasMyM extends Component {
    constructor() {
        super();
        this.state = {
            startGame: false,
        }
    }

    startGame = () => { this.setState({startGame: true}) }

    render() {
        return (
            <div>
                <div className="DescSumasRestasMyM">
                    <h1>Juego Sumas</h1>
                    <h2>¿Como jugar?</h2>
                    <p>En este juego se van a resolver algunas sumas, restas y resolver cual 
                       es el mayor o el menor. 
                       <br/>
                       Solo tenes que seleccionar la opcion correcta
                       debajo de cada operacion. 
                       <br/>
                       Hay 3 niveles con 15 operaciones para resolver.
                       <br/>
                       Si acertas 7 o mas operaciones matematicas podras pasar al siguiente nivel, sino tendras que volver a intentarlo.
                       <br/>
                       Por cada respuesta que se conteste bien se van a sumar 100 puntos.
                       <br/>
                       Pero por cada ejercicio fallido se descontará 30 puntos del puntaje! Ten cuidado con esto, afectará a tu ranking global!
                       <br/>
                       ¡Comenzemos a jugar!
                    </p>
                </div>
                <div className="ComenzarButton">
                    <Button onClick={this.props.startGame}>Comenzar</Button>
                </div>
            </div>
        )
    }
}

export default (IntroSumasRestasMyM);