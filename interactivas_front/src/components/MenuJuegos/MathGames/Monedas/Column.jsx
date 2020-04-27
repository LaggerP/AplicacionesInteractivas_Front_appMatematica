import React, {useState} from "react";
import styled from "@emotion/styled";
import Billete from "./Billete";
import { Droppable, Draggable } from "react-beautiful-dnd";
import initialData from "../../../../assets/jsonGames/Monedas/dataBilleteStructure";

const Container = styled("div")`
  margin: 10px;
  border-radius: 12px;
  border: 1px solid lightgrey;
  display: flex;
  flex-direction: column;
  width: 230px;
  background: white;
`;
const Title = styled("h3")`
  padding: 8px;
`;

const BilleteList = styled("div")`
  padding: 8px;
  flex-grow: 1;
  min-height: 200px;
  border-radius: 2px;
  transition: background-color ease 0.2s;
  background-color: ${props =>
    props.isDraggingOver ? "rgba(68, 179, 157, 0.27)" : "white"};
`;

const Column = ({ billetes, column, index }) => {
    return (
        <Draggable draggableId={column.id} index={index} type="column">
            {provided => (
                <Container
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <Title>{column.title} $</Title>
                    <Droppable droppableId={column.id} type="task">
                        {(provided, snapshot) => (
                            <BilleteList
                                isDraggingOver={snapshot.isDraggingOver}
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {billetes.map((billete, index) => (
                                    <Billete key={billete.id} billete={billete} index={index} />
                                ))}
                                {provided.placeholder}
                            </BilleteList>
                        )}
                    </Droppable>
                </Container>
            )}
        </Draggable>
    );
};

export default Column;
