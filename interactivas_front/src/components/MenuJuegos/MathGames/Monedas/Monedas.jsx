import React, {Component} from 'react';
import data from '../../../../assets/jsonGames/monedas.json'
import './Monedas.scss'
import Column from './Column'
import {DragDropContext} from "react-beautiful-dnd";

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
            title: 'Monedero',
            coinsIds: ['coin-2', 'coin-5', 'coin-10', 'coin-50', 'coin-100', 'coin-200', 'coin-500', 'coin-1000']
        },
        'cajaRegistradora': {
            id: 'caja',
            title: 'caja',
            coinsIds: ['coin-2', 'coin-5', 'coin-10', 'coin-50', 'coin-100', 'coin-200', 'coin-500', 'coin-1000']
        }
    },
    columnOrder: ['monedero']
}

class Monedas extends Component {
    constructor() {
        super();
        this.state = {
            dataCoin: structureData,
            dataGameMonedas: [],
            gamePoints: 0,
        }
    }

    componentDidMount() {
        this.setState({dataGameMonedas: data}) // data set from json
    }

    updateGamePoints() {
        this.setState({gamePoints: this.state.gamePoints + 1})
    }

    onDragEnd = result => {
        const {destination, source, draggableId} = result;

        if(!destination)
            return;
        if (destination.droppableId === source.droppableId && destination.index === source.index)
            return;

        const column = this.state.dataCoin.columns[source.droppableId];
        const newCoinIds = Array.from(column.coinsIds);
        newCoinIds.splice(source.index, 1);
        newCoinIds.splice(destination.index, 0, draggableId);

        const newColumn = {
            ...column,
            coinsIds: newCoinIds,
        };

        const newState = {
            ...this.state.dataCoin,
            columns: {
                ...this.state.dataCoin.columns,
                [newColumn.id]: newColumn,

            }
        };

        this.setState((newState))
    }

    render() {
        return (
            <DragDropContext
                onDragEnd={this.onDragEnd}
            >
                {
                    this.state.dataCoin.columnOrder.map((columnId) => {
                        const column = structureData.columns[columnId];
                        const coins = column.coinsIds.map(coinId => this.state.dataCoin.coins[coinId]);
                        // <Column/> = spaces where we can drag and drop different items
                        return (
                            <div>
                                <Column key={column.id} column={column} coins={coins}/>
                            </div>
                        )

                    })
                }
            </DragDropContext>
        )

    }
}

export default Monedas;