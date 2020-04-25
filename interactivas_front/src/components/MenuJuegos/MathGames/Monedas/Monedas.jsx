import React, {Component} from 'react';
import dataConsigna from '../../../../assets/jsonGames/monedas.json'
import './Monedas.scss'
import Column from './Column'
import {DragDropContext} from "react-beautiful-dnd";
import MenuJuegosNavbar from "../../MenuJuegosNavbar/MenuJuegosNavbar";

const structureData = {
    coins: {
        'coin-2': {id: 'coin-2', content: 'soy una moneda de 2', value: 2},
        'coin-5': {id: 'coin-5', content: 'soy una moneda de 5', value: 5},
        'coin-10': {id: 'coin-10', content: 'soy una moneda de 10', value: 10},
        'coin-50': {id: 'coin-50', content: 'soy una moneda de 50', value: 50},
        'coin-100': {id: 'coin-100', content: 'soy una moneda de 100', value: 100},
        'coin-200': {id: 'coin-200', content: 'soy una moneda de 200', value: 200},
        'coin-500': {id: 'coin-500', content: 'soy una moneda de 500', value: 500},
        'coin-1000': {id: 'coin-1000', content: 'soy una moneda de 1000', value: 1000}
    },
    columns: {
        'monedero': {
            id: 'monedero',
            title: 'Tu monedero',
            coinsIds: ['coin-2', 'coin-5', 'coin-10', 'coin-50', 'coin-100', 'coin-200', 'coin-500', 'coin-1000']
        },
        'cajaRegistradora': {
            id: 'caja',
            title: 'La caja',
            coinsIds: ['coin-2']
        }
    },
    columnOrder: ['monedero', 'cajaRegistradora']
}

class Monedas extends Component {
    constructor() {
        super();
        this.state = {
            dataCoin: [],
            dataGameMonedas: dataConsigna,
            gamePoints: 0,
            isLoading: true,
            error: false,
        }
    }

    componentDidMount() {
        this.setState({
            dataCoin: structureData, // data set from structureData json
            isLoading: false
        })
    }

    updateGamePoints() {
        this.setState({gamePoints: this.state.gamePoints + 1})
    }

    onDragEnd = result => {
        const {destination, source, draggableId} = result;
        if (!destination) return;
        if (destination.droppableId === source.droppableId &&
            destination.index === source.index) return;

        const start = this.state.dataCoin.columns[source.droppableId];
        const finish = this.state.dataCoin.columns[destination.droppableId];
        console.log(start)

        // case if the DnD happens in the same column
        if (start === finish) {
            const newCoinIds = Array.from(start.coinsIds);
            newCoinIds.splice(source.index, 1);
            newCoinIds.splice(destination.index, 0, draggableId);

            // coindIds has the new reordered column
            const newColumn = {
                ...start,
                coinsIds: newCoinIds,
            };

            // coindIds is reordered
            const newState = {
                ...this.state.dataCoin,
                columns: {
                    ...this.state.dataCoin.columns,
                    [newColumn.id]: newColumn,
                }
            };

            this.setState({dataCoin: newState});
            return
        }

        // case if the DnD happens between columns
        const startCoinIds = Array.from(start.coinsIds);
        startCoinIds.splice(source.index, 1);
        const newStar = {
            ...start, coinsIds: startCoinIds
        };

        const finishCoinIds = Array.from(finish.coinsIds);
        finishCoinIds.splice(destination.index, 0, draggableId);
        const newFinish = {
            ...finish, coinsIds: finishCoinIds
        };

        const newState = {
            ...this.state.dataCoin,
            columns: {
                ...this.state.dataCoin.columns,
                [newStar.id]: newStar,
                [newFinish.id]: newFinish,
            },
        }

        this.setState({dataCoin: newState});
        return
    }

    render() {
        const {dataCoin, isLoading, dataGameMonedas} = this.state

        // check if the component is loading or not
        if (!isLoading) {
            return (
                <div>
                <MenuJuegosNavbar/>
                    <div className="GameContainer-info">
                        <h1>{dataGameMonedas.gameName}</h1>
                        <p>En este juego aprenderemos a hacer uso de las monedas BLA BLA BLA BLA BLA</p>
                    </div>
                <div className="GameContainer">
                    <DragDropContext onDragEnd={this.onDragEnd}>
                        <div className="MonedasContainer">
                            {
                                dataCoin.columnOrder.map((columnId) => {
                                    let column = dataCoin.columns[columnId];
                                    let coins = column.coinsIds.map(coinId => dataCoin.coins[coinId]);
                                    // <Column/> = spaces where we can drag and drop different items
                                    return (
                                        <Column key={column.id} column={column} coins={coins}/>
                                    )
                                })
                            }
                        </div>
                    </DragDropContext>
                </div>
                </div>
            )
        } else {
            return (
                <div>
                    <h1>cargando juego</h1>
                </div>
            )
        }
    }
}

export default Monedas;