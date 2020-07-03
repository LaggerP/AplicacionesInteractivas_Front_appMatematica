import React, { Component } from 'react'
import './Tablero.css'
import './Multiplicacion.scss'
import MyCard from './MyCard';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import imagePizarron from '../../../../assets/Images/pizarron.png';
import Snackbar from '@material-ui/core/Snackbar';
import { Link } from 'react-router-dom';
import { getAllMultiLevels } from '../../../../services/multiJuegosServices';
import { saveLevelPoint } from '../../../../services/rankingServices';
import RankingTable from "../../Ranking/CustomComponent/RankingTable";


export default class Tablero extends Component {
    constructor(props) {
        super(props);
        this.state = {
            puntaje: 0,
            cardArrayChosen: [],
            cardArrayWon: [],
            cardArrayInicial: [],
            cardArrayAux: [],
            imagePizarron: imagePizarron,
            isLoading: true,
            isFlip: [],
            gano: false,
            errorCarta: false,
            adivina: false,

            //new
            gameData: [],
            cardArray: [],
            actualLevel: 1,

        };
    }

    async componentDidMount() {
        this.state.cardArrayInicial.sort(() => 0.5 - Math.random())
        const dataGame = await getAllMultiLevels();
        const gameByLevel = await this.getGameByLevel(dataGame.data);
        this.setState({
            isLoading: false,
            gameData: dataGame.data, // posee todas las cards 
            cardArrayInicial: gameByLevel, // posee las cards asociadas a un level
            isFlip: this.state.cardArrayInicial.map((element) => false)
        })
    }

    getGameByLevel(games) {
        let gamesData = []
        console.log(this.state.actualLevel)
        games.map(game => {
            if (game.level === this.state.actualLevel)
                gamesData.push(game)
        })
        return gamesData;
    }


    funcionClick = (selectedBoard, index) => {

        if (this.state.isFlip) {
            this.setState({ isFlip: false })
        } else {
            this.setState({ isFlip: true })
        }

        this.state.cardArrayChosen.push(this.state.cardArrayInicial[selectedBoard].name);
        if (this.state.cardArrayChosen.length === 2) {
            this.sonIguales(this.state.cardArrayChosen);
            this.state.cardArrayChosen.length = 0;
        }

    }

    sonIguales = (cartasElegidas) => {
        if (cartasElegidas[0] === cartasElegidas[1]) {
            this.state.cardArrayWon.push(cartasElegidas[0]);
            this.state.cardArrayWon.push(cartasElegidas[1]);
            this.setState({ adivina: true });
            //SE LLAMA A UN ALERT SUCCESS
            this.setState({ puntaje: this.state.puntaje + 50 }, () => {
                this.props.callback(this.state.puntaje)
            });


            if ((this.state.cardArrayWon.length) === (this.state.cardArrayInicial.length)) {
                this.setState({ gano: true });
                //SE LLAMA A UN ALERT SUCCESS
            }
        }
        else {
            this.setState({ errorCarta: true });
            //SE LLAMA A UN ALERT warning
            this.setState({ puntaje: this.state.puntaje - 15 }, () => {
                this.props.callback(this.state.puntaje)
            });
        }
    }

    nextLevel = async () => {

        this.setState({ actualLevel: this.state.actualLevel + 1 }, () => {
            this.props.callbackLevel(this.state.actualLevel);

        });
        await this.updateScore();
        const gameByLevel = await this.getGameByLevel(this.state.gameData);
        this.setState({
            cardArrayInicial: gameByLevel, // posee las cards asociadas a un level
            cardArrayChosen: [],
            cardArrayWon: [],
        })
    }

    showAlert = () => {
        if (this.state.gano) {
            return (
                <Snackbar open={this.state.gano} autoHideDuration={1000} onClose={() => this.setState({ gano: false })}>
                    <Alert elevation={6} style={{ width: '100%' }} variant="filled" severity="success">
                        ¡GANASTE EL NIVEL {this.state.actualLevel}!
                    </Alert>
                </Snackbar>
            )
        }
        else if (this.state.errorCarta) {
            return (
                <Snackbar open={this.state.errorCarta} autoHideDuration={1000} onClose={() => this.setState({ errorCarta: false })}>
                    <Alert elevation={6} style={{ width: '100%' }} variant="filled" severity="warning">
                        Continúa intentándolo
                    </Alert>
                </Snackbar>
            )

        }
        else if (this.state.adivina) {
            return (
                <Snackbar open={this.state.adivina} autoHideDuration={1000} onClose={() => this.setState({ adivina: false })}>
                    <Alert elevation={6} style={{ width: '100%' }} variant="filled" severity="success">
                        Encontraste una coincidencia
                    </Alert>
                </Snackbar>
            )
        }
    }

    async updateScore() {
        console.log('Guarda puntaje a la tabla ranking')
        let dataPoints = {
            username: localStorage.getItem('sessionName'),
            gamePoint: this.state.puntaje
        }
        console.log(dataPoints);
        await saveLevelPoint(dataPoints, 'multiplicacion');
    }

    render() {
        const { isLoading, cardArrayInicial, isFlip, puntaje, actualLevel } = this.state
        if (!isLoading && this.state.actualLevel <= 3) {
            return (
                <div className="TablerContainer">
                 {
                            cardArrayInicial.map((card, i) => (
                                <div className="TablerContainer--column">
                                <Card
                                        key={i}
                                        data-index={i}
                                        onClick={this.funcionClick.bind(this, i)}

                                    >
                                        <MyCard index={i} back={card.img} front={imagePizarron} status={isFlip} />
                                    </Card>
                              </div>
                            ))
                        }
                        {this.showAlert()}
                        <div className="ComenzarButton">
                            <Button onClick={this.nextLevel} >CONTINUAR AL SIGUIENTE NIVEL</Button>
                        </div>
                </div>
            )
        } else {
            if (actualLevel > 3) {
                return (
                    <div>
                        <h1>TERMINASTE EL JUEGO</h1>
                        <h1>Tu puntaje final fue de: {puntaje}</h1>
                        <RankingTable/>
                        <div className="ComenzarButton">
                            <Button component={Link} to="/games">VOLVER AL MENÚ DE JUEGOS</Button>
                        </div>
                    </div>
                )
            }
            else {
                return (
                    <div>
                        <h1>Cargando...</h1>
                    </div>
                )
            }
        }

    }
}