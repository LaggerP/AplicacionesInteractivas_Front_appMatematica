import React, {useState} from "react";
import styled from "@emotion/styled";
import Billete from "./Billete";

import { Droppable, Draggable } from "react-beautiful-dnd";

const Container = styled("div")`
  margin: 10px;
  border-radius: 12px;
  border: 1px solid lightgrey;
  display: flex;
  flex-direction: column;
  width: 400px;
  background: white;
`;

const Title = styled("h2")`
  padding: 15px 0 0 20px;
  margin: 0;
`;

const BilleteList = styled("div")`
  padding: 8px;
  flex-grow: 1;
  min-height: 200px;
  border-radius: 2px;
  transition: background-color ease 0.2s;
  background-color: ${props =>
    props.isDraggingOver ? "rgba(0,123,167,0.39)" : "rgba(234,234,234,0.14)"};
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

                    <Title>{column.title}</Title>
                    <hr/>
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
