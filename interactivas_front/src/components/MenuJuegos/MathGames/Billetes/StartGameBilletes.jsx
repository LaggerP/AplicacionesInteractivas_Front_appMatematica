import React, {Component} from 'react';
import Billetes from "./Billetes";
import InstruccionesBilletes from './InstruccionesBilletes'
import MenuJuegosNavbar from "../../MenuJuegosNavbar/MenuJuegosNavbar";

class StartGameBilletes extends Component {
    constructor() {
        super();
        this.state = {
            startGame: false,
        }
    }

    startGame = () => { this.setState({startGame: true}) }

    render() {
        const {startGame} = this.state
        if (!startGame) {
            return (
                <div>
                    <MenuJuegosNavbar/>
                    <InstruccionesBilletes startGame={this.startGame}/>
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

export default StartGameBilletes;
