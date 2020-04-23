import React from 'react';
import './Monedas.scss'
import {Draggable} from "react-beautiful-dnd";

const Coin = (props) => {
    return (
        <Draggable draggableId={props.coin.id} index={props.index}>
            {provided => (
                <div
                    ref={provided.innerRef}
                    className="CoinContainer"
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <span className="CoinContainer-value">
                        ${props.coin.value}
                    </span>
                </div>
            )}

        </Draggable>

    );
};

export default Coin;
