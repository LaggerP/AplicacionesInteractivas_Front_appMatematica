import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import './Billetes.scss'
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import initialData from "../../../../assets/jsonGames/Monedas/dataBilleteStructure";
import consignasGameData from "../../../../assets/jsonGames/Monedas/monedasConsignas.json";
import Column from "./Column";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import RankingTable from "../../Ranking/CustomComponent/RankingTable";
import { saveLevelPoint } from '../../../../services/rankingServices'

import { getAllBilletesLevels } from '../../../../services/billetesJuegosServices'
import { act } from "react-dom/test-utils";


const Container = styled("div")`
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  flex-direction: row;
  background-color: ${props => (props.isDraggingOver ? "rgba(99,158,226,0.56)" : "white")};
`;

const RankingContainer = styled("div")`
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  flex-direction: column;
`;

const Billetes = () => {
    const [starter, setStarter] = useState(initialData);
    const [gameData, setGameData] = useState([])
    const [allLevels, setAllLevels] = React.useState([])
    const [finishGame, setFinishGame] = useState(false)
    const [loadingQuestion, setLoadingQuestion] = useState(false)
    const [userGamePoint, setUserGamePoint] = useState(0)
    const [billetesTotales, setBilletesTotales] = useState(0)
    let actualLevel = 1 
    
    useEffect(() => {
        fetchInitialData();
        setLoadingQuestion(true)
    },[]);

    async function fetchInitialData() {
        let allBilletesGameData =  await getAllBilletesLevels();
        setAllLevels(allBilletesGameData.data)
        const gameByLevel = await getGameByLevel(allBilletesGameData.data)
        setGameData(gameByLevel)
       
    };

    // Filter all games by lvl and return one of them
    const getGameByLevel = (games => {
        let gamesData = []
        games.map(game => {
            if (game.level === actualLevel)
                gamesData.push(game)
        })
        return gamesData[Math.floor(Math.random() * gamesData.length)];
    });

    const onDragEnd = ({ destination, source, draggableId, type }) => {
        if (!destination) return;
        if (destination.droppableId === source.droppableId &&
            destination.index === source.index) return;

        const start = starter.columns[source.droppableId];
        const end = starter.columns[destination.droppableId];

        if (type === "column") {
            const newOrder = [...starter.columnOrder];
            newOrder.splice(source.index, 1);
            newOrder.splice(destination.index, 0, draggableId);

            setStarter({
                ...starter,
                columnOrder: newOrder
            });
            return;
        }

        if (start === end) {
            const column = starter.columns[source.droppableId];
            const billeteIds = [...column.billeteIds];
            billeteIds.splice(source.index, 1);
            billeteIds.splice(destination.index, 0, draggableId);
            const newColumn = {
                ...column,
                billeteIds
            };
            setStarter({
                ...starter,
                columns: {
                    ...starter.columns,
                    [column.id]: newColumn
                }
            });
            return;
        }

        const startbilletesIds = [...start.billeteIds];
        const endbilletesIds = [...end.billeteIds];

        startbilletesIds.splice(source.index, 1);
        endbilletesIds.splice(destination.index, 0, draggableId);

        const newStartColumn = {
            ...start,
            billeteIds: startbilletesIds
        };
        const endTaskColumn = {
            ...end,
            billeteIds: endbilletesIds
        };

        setStarter({
            ...starter,
            columns: {
                ...starter.columns,
                [start.id]: newStartColumn,
                [end.id]: endTaskColumn
            }
        });
        setBilletesTotales(calculateTotalMoney(endTaskColumn.billeteIds, starter))
    };

    const calculateTotalMoney = (billeteDado = '', starter) => {
        let plataDada = []
        billeteDado.map(billete => {
            plataDada.push(starter.billetes[billete].value)
        });
        return plataDada.reduce((a, b) => a + b);
    }

    const nextLevel = async () => {
        if (actualLevel <= 3) {
            console.log("nivel actual ", actualLevel)
            const gameByLevel = await getGameByLevel(allLevels)
            setGameData(gameByLevel)
            if (gameData.success_answer === billetesTotales) {
                setUserGamePoint(userGamePoint + gameData.level_point)
                let dataPoints = {
                    gamePoint: userGamePoint + gameData.level_point,
                    username: localStorage.getItem('sessionName')
                }
                await saveLevelPoint(dataPoints, 'billetes')
    
            } else {
                setUserGamePoint(userGamePoint - 30)
                let dataPoints = {
                    gamePoint: userGamePoint - 30,
                    username: localStorage.getItem('sessionName')
                }
                await saveLevelPoint(dataPoints, 'billetes')
            }

            actualLevel++
            console.log("nivel actualizado ", actualLevel)

        }
        else {
            setFinishGame(true)
        }
    }

    if (!finishGame) {
        console.log(allLevels)
        console.log(gameData)
        return (
            <div className="BilletesContainer">
                <h1>Completa los siguientes ejercicios haciendo uso de los billetes</h1>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="all-column" type="column">
                        {(provided, snapshot) => (
                            <Container
                                isDraggingOver={snapshot.isDraggingOver}
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                <div className="BilletesConsigna">
                                    {!loadingQuestion ? <p>Cargando consigna...</p>
                                        :
                                        <div>
                                            <h1>Consigna:</h1>
                                                <p>{gameData.description}</p>
                                                <p id="rankingValue">Tu puntaje actual: {userGamePoint}</p>
                                        </div>
                                    }
                                </div>

                                {starter.columnOrder.map((columnId, index) => {
                                    const column = starter.columns[columnId];
                                    const billetes = column.billeteIds.map(billetesId => starter.billetes[billetesId]);

                                    return (
                                        <Column
                                            index={index}
                                            key={column.id}
                                            column={column}
                                            billetes={billetes}
                                        />
                                    );
                                })}
                                {provided.placeholder}
                            </Container>
                        )}

                    </Droppable>
                </DragDropContext>
                {
                    billetesTotales > 0 ?
                        <div className="NextLevelButton">
                            <Button onClick={nextLevel}>Siguiente nivel</Button>
                        </div>
                        :
                        <div className="NextLevelButtonWarning">
                            <span>Arrastre al menos un billete para continuar</span>
                        </div>
                }
            </div>
        );
    } else {
        if (userGamePoint < 0) {
            return (
                <div>
                    <RankingContainer>
                        <h1>¡La proxima te ira mejor!</h1>
                        <h1>No te preocupes, podes volver a jugar cuando quieras</h1>
                        <h1>Tu puntaje final fue de {userGamePoint}</h1>
                        <RankingTable />
                        <br />
                        <Button component={Link} to="/games">Volver</Button>
                    </RankingContainer>
                </div>
            )
        } else {
            return (
                <div>
                    <RankingContainer>
                        <h1>¡Terminaste!</h1>
                        <h1>Tu puntaje final fue de {userGamePoint}</h1>
                        <RankingTable />
                        <br />
                        <Button component={Link} to="/games">Volver</Button>
                    </RankingContainer>
                </div>
            )
        }
    }
};

export default Billetes
