import React, { useState } from "react";
import styled from "@emotion/styled";
import './Monedas.scss'
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import initialData from "../../../../assets/jsonGames/Monedas/dataBilleteStructure";
import consignasGameData from "../../../../assets/jsonGames/Monedas/monedasConsignas.json";
import Column from "./Column";
import Button from "@material-ui/core/Button";

const Container = styled("div")`
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  background-color: ${props => (props.isDraggingOver ? "#639ee2" : "rgba(238, 236, 236, 0.21)")};
`;

const Billetes = () => {
    const [starter, setStarter] = useState(initialData);
    const [gameData] = useState(consignasGameData)
    const [actualLevel, setActualLevel] = useState(0)
    const [finishGame, setFinishGame] = useState(false)
    const [userGamePoint, setUserGamePoint] = useState(0)
    const [billetesTotales, setBilletesTotales] = useState(0)

    const onDragEnd = ({ destination, source, draggableId, type }) => {
        if (!destination) return;
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

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
        setBilletesTotales (calculateTotalMoney(endTaskColumn.billeteIds, starter))
    };

    const calculateTotalMoney = (billeteDado, starter) => {
        let plataDada = []
        billeteDado.map( (billete, total) => {
            plataDada.push(starter.billetes[billete].value)
        })
        return plataDada.reduce( (a,b) => a + b);
    }

    const nextLevel = () => {
        console.log(gameData.levels[actualLevel].successAnswer,billetesTotales)
        if (gameData.levels[actualLevel].successAnswer === billetesTotales){
            // TODO: function to add points in the ranking
            // if the kid answer well will add points in the ranking
            setUserGamePoint(userGamePoint + gameData.levels[actualLevel].levelPoint)

        } else {
            // TODO: function to subtract points in the ranking
            // if the kid answer wrong will subtract points in the ranking
            setUserGamePoint(userGamePoint - 30)
        }
        if (actualLevel<gameData.levels.length-1){
            setActualLevel(actualLevel + 1 )
            setStarter(initialData)
        }
        else{
            setFinishGame(true)
        }

    }
    if (!finishGame) {
        return (
            <div>
                <h1>{gameData.descriptionGame}</h1>
                <h4>{gameData.levels[actualLevel].descriptionProblem}</h4>
                <h3>tu puntaje {userGamePoint}</h3>
                <h4>{billetesTotales}</h4>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="all-column" type="column">
                        {(provided, snapshot) => (
                            <Container
                                isDraggingOver={snapshot.isDraggingOver}
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
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
                <div className="NextLevelButton">
                    <Button onClick={nextLevel}>Siguiente nivel</Button>
                </div>
            </div>

        );
    }
    else
        return (
            <div>
                <h1>terminaste</h1>
                <h5>Tu puntaje final fue de {userGamePoint}</h5>

            </div>
        )

};

export default Billetes
