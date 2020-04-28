import React, {Component} from 'react';
import Billetes from "./Billetes";
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
                    <InstruccionesMonedas startGame={this.startGame}/>
                </div>
            );
        } else {
            return (
                <div>
                    <MenuJuegosNavbar/>
                    <Billetes/>
                </div>
            );
        }

    }
}

export default StartGameMonedas;
