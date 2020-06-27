import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import './Billetes.scss'
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import initialData from "../../../../assets/jsonGames/Monedas/dataBilleteStructure";
import Column from "./Column";
import Button from "@material-ui/core/Button";
import RankingTable from "../../Ranking/CustomComponent/RankingTable";
import { saveLevelPoint } from '../../../../services/rankingServices'
import { getAllBilletesLevels } from '../../../../services/billetesJuegosServices'
import RankingBilletes from './RankingBilletes'


const Container = styled("div")`
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  flex-direction: row;
  background-color: ${props => (props.isDraggingOver ? "rgba(99,158,226,0.56)" : "white")};
`;

const Billetes = () => {
    const [starter, setStarter] = useState(initialData);
    const [gameData, setGameData] = useState([])
    const [allLevels, setAllLevels] = useState([])
    const [finishGame, setFinishGame] = useState(false)
    const [loadingQuestion, setLoadingQuestion] = useState(false)
    const [userGamePoint, setUserGamePoint] = useState(0)
    const [billetesTotales, setBilletesTotales] = useState(0)
    const [actualLevel, setActualLevel] = useState(1)

    useEffect(() => {
        fetchInitialData();
    }, []);

    // First get data from database. Run once. 
    async function fetchInitialData() {
        let allBilletesGameData = await getAllBilletesLevels();
        setAllLevels(allBilletesGameData.data)
        setGameData(getGameByLevel(allBilletesGameData.data))
        setActualLevel(actualLevel + 1)
        setLoadingQuestion(true) 
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

    // DnD logic
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

    // Calculate the amount of money the player selected
    const calculateTotalMoney = (billeteDado = '', starter) => {
        let plataDada = []
        billeteDado.map(billete => {
            plataDada.push(starter.billetes[billete].value)
        });
        return plataDada.reduce((a, b) => a + b);
    }

    // Send data to database and get the next level
    const nextLevel = async () => {
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

        if (actualLevel > 3) {
            setFinishGame(true)
        } else {
            setActualLevel(actualLevel + 1)
            setGameData(getGameByLevel(allLevels))
        }
    }

    if (!finishGame) {
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
        return (
            <RankingBilletes userGamePoint={userGamePoint}/>

        )
    }
};

export default Billetes
