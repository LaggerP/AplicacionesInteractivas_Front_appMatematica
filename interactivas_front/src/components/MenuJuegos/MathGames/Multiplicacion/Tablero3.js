import React, { Component } from 'react'
import './Tablero.css'

import Card from '@material-ui/core/Card';

import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';

import imagePizarron from '../../../../assets/Images/pizarron.png';
import dospordos from '../../../../assets/Images/2por2.jpg';
import cuatro from '../../../../assets/Images/cuatro.jpg';
import seisporseis from '../../../../assets/Images/6por6.png';
import treintayseis from '../../../../assets/Images/treintayseis.png';
import sieteporsiete from '../../../../assets/Images/7por7.jpg';
import cuarentaynueve from '../../../../assets/Images/cuarentaynueve.png';
import veinticinco from '../../../../assets/Images/veinticinco.png';
import cincoporcinco from '../../../../assets/Images/5por5.jpg';
//import veinticinco from '../../../../assets/Images/veinticinco.png';
//import cuarentaynueve from '../../../../assets/Images/cuarentaynueve.png';


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
        name: 'seis',
        pizarron: imagePizarron,
        img: seisporseis
    },
    {
        name: 'seis',
        pizarron: imagePizarron,
        img: treintayseis
    },
    {
        name: 'siete',
        pizarron: imagePizarron,
        img: cuarentaynueve
    },
    {
        name: 'siete',
        pizarron: imagePizarron,
        img: sieteporsiete
    },
    {
        name: 'cinco',
        pizarron: imagePizarron,
        img: veinticinco
    },
    {
        name: 'cinco',
        pizarron: imagePizarron,
        img: cincoporcinco
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
            puntaje: this.props.puntaje,
            cardArray: cardArray,
            cardArrayChosen: cardArrayChosen,
            cardArrayWon: cardArrayWon,
            cardArrayInicial: cardArray,
            cardArrayAux: cardArrayAux,
            imagePizarron: imagePizarron,
            isLoading: false,
            isFlip: cardArrayInicial.map((element) => false)
        };
    }

    componentDidMount() {
        // this.cargarArray();
        this.funcionAlerta();
        this.state.cardArrayInicial.sort(() => 0.5 - Math.random())
        this.setState({ isLoading: true })

    }

    cargarArray() {
        for (let i = 0; i < cardArray.length; i++) {
            cardArrayInicial.push(<img src={imagePizarron} alt="multiplicacion" className="card-class" />)

        }
    }
    funcionAlerta() {
        return (< Alert variant="outlined" severity="success" >
            This is a success alert — check it out!
        </Alert >)
    }
    funcionClick = (selectedBoard, index) => {
        console.log(`soy el pizarron ${selectedBoard}`)
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
            
            alert('Encontraste una coincidencia');
            this.setState({puntaje: this.state.puntaje+50}, () => {
                
                this.props.callback(this.state.puntaje)
            });
            this.funcionAlerta();
            //return (<Alert severity="success">This is a success message!</Alert>)//

            if ((cardArrayWon.length) == (cardArray.length)) {

                
                alert('¡Ganaste el tercer nivel! Felicidades')
            }
        }
        else {
            
            alert('Continúa intentándolo');
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
                </Grid>
            )
        } else {
            return (
                <h1>Cargando...</h1>
            )
        }

    }
}