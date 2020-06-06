import React, {Component} from 'react';
import MenuJuegosNavbar from '../../MenuJuegosNavbar/MenuJuegosNavbar';
import './SumasRestasMyM.scss';
import IntroSumasRestasMyM from './IntroSumasRestasMyM';
import SumasRestasMyM from './SumasRestasMyM';

class StartSumasRestasMyM extends Component {
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
                    <IntroSumasRestasMyM startGame={this.startGame}/>
                </div>
            );
        } else {
            return (
                <div>
                    <MenuJuegosNavbar/>
                    <SumasRestasMyM/>
                </div>
            );
        }
    }
}

export default (StartSumasRestasMyM);