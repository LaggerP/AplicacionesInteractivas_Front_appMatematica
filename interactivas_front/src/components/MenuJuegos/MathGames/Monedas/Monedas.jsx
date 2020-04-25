import React, {Component} from 'react';
import dataConsigna from '../../../../assets/jsonGames/Monedas/monedasConsignas.json'
import structureData from "../../../../assets/jsonGames/Monedas/dataCoinStructure";
import './Monedas.scss'
import Column from './Column'
import {DragDropContext} from "react-beautiful-dnd";
import MenuJuegosNavbar from "../../MenuJuegosNavbar/MenuJuegosNavbar";
import CongratulationGame from "./CongratulationGame";
import Button from "@material-ui/core/Button";

class Monedas extends Component {
    constructor() {
        super();
        this.state = {
            dataCoin: [],
            dataGameMonedas: dataConsigna,
            actualLevel: 0,
            problemNumber: 'first',
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

    nextProblem = () => {
        const indexProblem = ['first', 'second', 'third'];

        if (this.state.problemNumber === 'first')
            this.setState({problemNumber: indexProblem[1]})
        else if (this.state.problemNumber === 'second')
            this.setState({problemNumber: indexProblem[2]})
        else
            this.nextLevel(); // If I don't have any more level problems
    }

    nextLevel = () => {
        this.setState({actualLevel: this.state.actualLevel + 1})
    }

    updateGamePoints() {
        this.setState({gamePoints: this.state.gamePoints + 1})
    }

    onDragEnd = result => {
        const {destination, source, draggableId} = result;

        if (!destination) {
            return;
        }
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const start = this.state.dataCoin.columns[source.droppableId];
        const finish = this.state.dataCoin.columns[destination.droppableId];
        console.log(finish)

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

        // Moving from one list to another
        const startCoinIds = Array.from(start.coinsIds)
        startCoinIds.splice(source.index, 1)

        const newStart = {
            ...start,
            coinsIds: startCoinIds
        }

        const finishCoinIds = Array.from(finish.coinsIds)
        finishCoinIds.splice(destination.index, 0, draggableId)

        const newFinish = {
            ...finish,
            coinsIds: finishCoinIds,
        }

        const newState = {
            ...this.state.coinsIds,
            columns: {
                ...this.state.coinsIds.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish
            }
        }
        this.setState(newState);
        return;
    }

    render() {
        const {dataCoin, isLoading, dataGameMonedas, actualLevel, problemNumber} = this.state
        console.log(dataGameMonedas.levels[1].allProblems[0])
        // check if the component is loading or not
        if (!isLoading && dataGameMonedas.levels.length > actualLevel) {
            return (
                <div>
                    <MenuJuegosNavbar/>
                    <div className="GameContainer-welcome">
                        <h1>{dataGameMonedas.gameName}</h1>
                        <p>En este juego aprenderemos a hacer uso de las monedas BLA BLA BLA BLA BLA</p>
                    </div>
                    <div className="GameContainer-gameDescription">
                        <p>Esta jugando el nivel: <span>{dataGameMonedas.levels[actualLevel].level}</span></p>
                        <p>{dataGameMonedas.levels[actualLevel].descriptionProblem}</p>
                        <p>{dataGameMonedas.levels[actualLevel].allProblems[0][problemNumber].problem}</p>
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
                    <div className="NextLevelButton">
                        <Button onClick={this.nextProblem}>Siguiente nivel</Button>

                    </div>
                </div>
            )
        } else {
            return (<CongratulationGame/>)
        }
        if (isLoading) {
            return (
                <div>
                    <h1>cargando juego</h1>
                </div>
            )
        }
    }
}

export default Monedas;