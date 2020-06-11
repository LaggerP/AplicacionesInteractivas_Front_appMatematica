import './Carta.css'
import React, { Component } from 'react';



export default class Carta extends Component {

    render() {

        return (
            <div className="carta" onClick={this.seleccionarCarta}>

            </div>
        )
    }
}