import React from 'react';
import Coin from "./Coin";
import './Monedas.scss'
import {Droppable} from "react-beautiful-dnd";

const Column = (props) => {
    return (
        <div className="ColumnContainer">
            <div className="ColumnContainer-title">{props.column.title}</div>
            <Droppable droppableId={props.column.id}>
                {provided => (
                    <div
                        ref={provided.innerRef}
                        className="ColumnContainer-coins"
                        {...provided.droppableProps}
                    >
                        {props.coins.map(
                            (coin, index) =>
                                <Coin
                                    key={coin !== undefined && coin.id}
                                    coin={coin}
                                    index={index}/>
                        )}
                        {provided.placeholder}
                    </div>
                )}

            </Droppable>


        </div>
    );
};

export default Column;
