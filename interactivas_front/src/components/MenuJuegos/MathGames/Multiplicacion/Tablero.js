import React, { Component } from 'react'
//import './Tablero.css'

import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import imagePizarron from '../../../../assets/Images/pizarron.png';
import dospordos from '../../../../assets/Images/2por2.jpg';
import cuatro from '../../../../assets/Images/cuatro.jpg';
import seisporseis from '../../../../assets/Images/6por6.png';
import treintayseis from '../../../../assets/Images/treintayseis.png';
import sieteporsiete from '../../../../assets/Images/7por7.jpg';
import cuarentaynueve from '../../../../assets/Images/cuarentaynueve.png';
import cuatroporcuatro from '../../../../assets/Images/4por4.jpg';
//import veinticinco from '../../../../assets/Images/veinticinco.png';
import dieciseis from '../../../../assets/Images/dieciseis.png';
//import cuarentaynueve from '../../../../assets/Images/cuarentaynueve.png';

import MuiAlert from '@material-ui/lab/Alert';
import { Divider } from '@material-ui/core';


import MyCard from './MyCard';

/*let cardArray = [



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

const cardArray = [

    {
        name: 'dos',
        pizarron: imagePizarron,
        img: dospordos
    },
    {
        name: 'dos',
        pizarron: imagePizarron,
        img: cuatro
    },
    {
        name: 'cuatro',
        pizarron: imagePizarron,
        img: dieciseis
    },
    {
        name: 'cuatro',
        pizarron: imagePizarron,
        img: cuatroporcuatro
    },



]




var cardArrayChosen = [];
var cardArrayWon = [];
const cardArrayInicial = [];
const cardArrayAux = [];


export default class Tablero extends Component {
    constructor(props) {
        super(props);
        this.state = {
            puntaje: 0,
            cardArray: cardArray,
            cardArrayChosen: cardArrayChosen,
            cardArrayWon: cardArrayWon,
            cardArrayInicial: cardArray,
            cardArrayAux: cardArrayAux,
            imagePizarron: imagePizarron,
            isLoading: false,
            isFlip: cardArrayInicial.map((element) => false),
            gano:false,
            errorCarta:false,
            adivina:false,
        };
    }

    componentDidMount() {
        this.state.cardArrayInicial.sort(() => 0.5 - Math.random())
        this.setState({ isLoading: true })

    }

    cargarArray() {
        for (let i = 0; i < cardArray.length; i++) {
            cardArrayInicial.push(<img src={imagePizarron} alt="multiplicacion" className="card-class" />)

        }
    }
   
    funcionClick = (selectedBoard, index) => {
        
        if (this.state.isFlip) {
            this.setState({ isFlip: false })
        } else {
            this.setState({ isFlip: true })
        }


        // cardArrayChosen.push('hola')
        cardArrayAux.push(cardArrayInicial[selectedBoard]);
        cardArrayInicial.splice(selectedBoard, 0, cardArray[selectedBoard].img);
        cardArrayChosen.push(cardArray[selectedBoard].name);
        if (cardArrayChosen.length === 2) {
            this.sonIguales(cardArrayChosen);
            cardArrayChosen.length = 0;
        }


    }

    sonIguales = (cartasElegidas) => {
        if (cartasElegidas[0] === cartasElegidas[1]) { //adivino la carta, las paso en negro. las agrego al array de cartas ganadas
            cardArrayWon.push(cartasElegidas[0]);
            cardArrayWon.push(cartasElegidas[1]);
            this.setState({adivina: true});
            this.setState({puntaje: this.state.puntaje+50}, () => {
                this.props.callback(this.state.puntaje)
            });


            if ((cardArrayWon.length) == (cardArray.length)) {
                this.setState({gano: true});
            }
        }
        else {
            this.setState({errorCarta: true});
            this.setState({puntaje: this.state.puntaje-15}, () => {
                this.props.callback(this.state.puntaje)
            });
        }

    }
    

    render() {
        const { isLoading, cardArrayInicial, isFlip, flipped } = this.state
        if (isLoading) {
            return (
                <Grid
                    xs={12}
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    


                    {
                        cardArrayInicial.map((card, i) => (
                            <Grid container item xs={6} md={4}>


                                <Card
                                    key={i}
                                    data-index={i}
                                    onClick={this.funcionClick.bind(this, i)}
                                >
                                    <MyCard index={i} back={card.img} front={card.pizarron} status={isFlip} />
                                </Card>
                            </Grid>
                        ))
                    }
                    {this.state.gano && <Alert variant="filled" severity="success" onClick={() => this.setState({gano:false})}>¡GANASTE EL PRIMER NIVEL!</Alert>}
                    {this.state.errorCarta && <Alert variant="filled" severity="warning" onClick={() => this.setState({errorCarta:false})}>Continúa intentándolo</Alert>}
                    {this.state.adivina && <Alert variant="filled" severity="success" onClick={() => this.setState({adivina:false})}>Encontraste una coincidencia</Alert>}
                </Grid>
                
            )
        } else {
            return (
                <h1>Estoy cargando capo</h1>
            )
        }

    }
}