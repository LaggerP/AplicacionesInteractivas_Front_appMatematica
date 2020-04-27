import React, {Component} from 'react';
import Monedas from "./Monedas";
import InstruccionesMonedas from './InstruccionesMonedas'
import {Button} from "@material-ui/core";
import MenuJuegosNavbar from "../../MenuJuegosNavbar/MenuJuegosNavbar";

class StartGameMonedas extends Component {
    constructor() {
        super();
        this.state = {
            startGame: false,
        }
    }

    startGame = () => {
        this.setState({startGame: true})

    }

    render() {
        const {startGame} = this.state
        if (!startGame) {
            return (
                <div>
                    <MenuJuegosNavbar/>
                    <InstruccionesMonedas/>
                    <Button onClick={this.startGame}>Comenzar</Button>
                </div>
            );
        } else {
            return (
                <div>
                    <MenuJuegosNavbar/>
                    <Monedas/>
                </div>
            );
        }

    }
}

export default StartGameMonedas;
