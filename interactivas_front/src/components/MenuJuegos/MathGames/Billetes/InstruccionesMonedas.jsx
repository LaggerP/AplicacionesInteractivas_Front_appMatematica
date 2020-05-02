import React from 'react';
import './Billetes.scss'
import Grid from '@material-ui/core/Grid';
import gifGame from '../../../../assets/Images/GamesImages/Billetes/comojugar.gif'
import {Button} from "@material-ui/core";

const InstruccionesMonedas = (props) => {
    return (
        <div>
            <Grid container className="GridContainer" >
                <Grid container
                      spacing={0}
                      direction="column"
                      alignItems="center"
                      justify="center" xs={12} className="GridContainer--img">
                    <h1>¡Jugar es muy simple!</h1>
                    <img src={gifGame} alt=""/>
                </Grid>
                <Grid xs={12} className="GridContainer--description">

                    <p>Para jugar, tenes que arrastrar los billetes desde <span>'Tu billetera💰'</span>  a  <span> 'La caja 🛒'</span></p>
                    <p>No te preocupes si te equivocas! El cajero te devolverá la plata hasta que decidas pasar al siguiente nivel 😉</p>
                    <p>Por cada ejercicio fallido se descontará 30 puntos del puntaje! Ten cuidado con esto, afectará a tu ranking global!</p>


                </Grid>
            </Grid>
            <div className="NextLevelButton">
                <Button onClick={props.startGame}>Comenzar</Button>
            </div>

        </div>
    );
};

export default InstruccionesMonedas;
