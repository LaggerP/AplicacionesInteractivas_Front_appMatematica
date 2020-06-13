import React, {useState, useEffect} from "react";
import styled from "@emotion/styled";
import './Billetes.scss'
import {DragDropContext, Droppable} from "react-beautiful-dnd";
import initialData from "../../../../assets/jsonGames/Monedas/dataBilleteStructure";
import consignasGameData from "../../../../assets/jsonGames/Monedas/monedasConsignas.json";
import Column from "./Column";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import RankingTable from "../../Ranking/CustomComponent/RankingTable";
import {saveLevelPoint} from '../../../../services/rankingServices'


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
    const [gameData] = useState(consignasGameData)
    const [actualLevel, setActualLevel] = useState(0)
    const [finishGame, setFinishGame] = useState(false)
    const [loadingQuestion, setLoadingQuestion] = useState(false)
    const [userGamePoint, setUserGamePoint] = useState(0)
    const [billetesTotales, setBilletesTotales] = useState(0)

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoadingQuestion(true)
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    const onDragEnd = ({destination, source, draggableId, type}) => {
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
        if (gameData.levels[actualLevel].successAnswer === billetesTotales) {
            // TODO: function to add points in the ranking
            // if the kid answer well - add points in the ranking
            setUserGamePoint(userGamePoint + gameData.levels[actualLevel].levelPoint)
            let dataPoints = {
                gamePoint: userGamePoint + gameData.levels[actualLevel].levelPoint,
                username: localStorage.getItem('sessionName')
            } 
            await saveLevelPoint(dataPoints, 'billetes')

        } else {
            // TODO: function to subtract points in the ranking
            // if the kid answer wrong - subtract points in the ranking
            setUserGamePoint(userGamePoint - 30)

            let dataPoints = {
                gamePoint: userGamePoint - 30,
                username: localStorage.getItem('sessionName')
            } 
            await saveLevelPoint(dataPoints, 'billetes')
        }
        if (actualLevel < gameData.levels.length - 1) {
            setActualLevel(actualLevel + 1)
            setStarter(initialData)
        } else {
            setFinishGame(true)
        }
    }

    if (!finishGame) {
        return (
            <div className="BilletesContainer">
                <h1>{gameData.descriptionGame}</h1>
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
                                            <p>{gameData.levels[actualLevel].descriptionProblem}</p>
                                            <p id="rankingValue">Tu posición el el ranking: {userGamePoint}/100</p>
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
                        <RankingTable/>
                        <br/>
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
                            <RankingTable/>
                            <br/>
                            <Button component={Link} to="/games">Volver</Button>
                    </RankingContainer>
                </div>
            )
        }
    }
};

export default Billetes
