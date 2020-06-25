import React, {Component} from 'react';
import './SumasRestasMyM.scss';
import {Button} from "@material-ui/core";
import UserTextField from "./CustomComponent/UserTextField";
import UserCheckBoxField from "./CustomComponent/UserCheckBoxField";
import UserDialog from './CustomComponent/UserDialog';
import CountUp from 'react-countup';
import {saveLevelPoint} from '../../../../services/rankingServices';

class SumasRestasMyM extends Component {

    // States del juego
    state ={Juega:true,
            Finish: false,
            isFinishing:false,
            Var1:this.randomInt(1,10), 
            Var2:this.randomInt(1,10), 
            oper:'Suma',
            Min:1,
            Max:15,
            Result: '',
            level : 1,
            nextLevel:false,
            perdido:false, 
            countQues:15,
            puntaje: 0,
            levelPuntaje: 0,
            countCorrects: 0
        };
    
    // Funcion para generar un numero random entre dos numeros
    randomInt(min, max) {
        return min + (Math.floor((max - min) * Math.random()));
    }

    //Actualiza los estados para volver a intentar jugar
    volverIntentar = ()=> {
        this.setState({
            perdido:false,
            Juega: true,
            nextLevel: false,
            puntaje: this.state.levelPuntaje,
            countCorrects: 0
        });
    }

    // Obtiene el resultado de la respuesta y lo guarde en el estado Result
    getResult = (ResultOperation) =>{
        this.setState({Result: ResultOperation});
    }

     //Termina el juego
     finishGame = () =>{
        // Aca guarda el RESULTADO FINAL a la tabla de ranking
        this.updateScore();
        this.setState({Finish: true});
    }

    // Actualiza la tabla ranking
    updateScore = async () => {
        let dataPoints = {
            username: localStorage.getItem('sessionName'), 
            gamePoint: this.state.puntaje 
        }
        await saveLevelPoint(dataPoints, 'sumas');
    }

    // Valida si se gano o se perdio el nivel
    winLostLevel = () =>{
        if(this.state.countQues === 1 && this.state.countCorrects >= 7){
            this.setState({
                Juega: false,
                perdido: false,
                nextLevel: true,
                levelPuntaje: this.state.puntaje
            });            
        }
        else if(this.state.countQues === 1 && this.state.countCorrects < 7){
            this.setState({
                countCorrects: 0,
                countQues: 15,
                Juega: true,
                perdido: true,
                nextLevel: false,
            });
        }
    }

    // Valida que operacion es y hace la operacion correspondiente
    correctResult(var1,var2,oper){
        switch(oper){
            case 'Suma':
                return var1 + var2;
            case 'Resta':
                if(var1 > var2){
                    return var1 - var2;
                }
                else{
                    return var2 - var1;
                }
            case 'MyM':
                if(var1 > var2){
                    return 'SI';
                }
                else{
                    return 'NO';
                }
            default:
                return;
        }
    }

    // Verifica si es correcta la respuesta y actualiza los estados
    isCorrect = ()=>{
        const operaciones = ['Suma', 'Resta', 'MyM'];
        var operacion = operaciones[Math.floor(Math.random()*operaciones.length)];
        var result = this.state.Result;

        while (operacion === 'MyM' & operacion === this.state.oper){
            operacion = operaciones[Math.floor(Math.random()*operaciones.length)];
        }

        if(this.state.oper === 'Suma' || this.state.oper === 'Resta'){
            result = parseInt(this.state.Result);
        }

        // Valida respuesta
        if (this.correctResult(this.state.Var1,this.state.Var2,this.state.oper) === result){

            this.setState({
                oper:operacion,
                Var1: this.randomInt(this.state.Min,this.state.Max),
                Var2: this.randomInt(this.state.Min,this.state.Max),
                countCorrects: this.state.countCorrects + 1,
                countQues: this.state.countQues - 1,
                puntaje: this.state.puntaje + 100,
                Result:''
            });
        }
        else{

            this.setState({
                oper:operacion,
                Var1: this.randomInt(this.state.Min,this.state.Max),
                Var2: this.randomInt(this.state.Min,this.state.Max),
                puntaje: this.state.puntaje - 30,
                countQues: this.state.countQues - 1,
                Result:''
            });
        }
        this.winLostLevel();
    }

    // Valida que boton mostrar segundo el estado del juego
    ConfirmLevelScore = ()=> {
        if (!this.state.isFinishing){
            return(
                <div className="ComenzarButton">
                    <Button onClick={this.getNextLevel} disabled={!this.state.nextLevel}>Siguiente nivel</Button>
                </div>
            )
        }
        else{
            if(this.state.Finish){
                return(
                    <div className="ObtenerPuntajeFinal">
                        <Button onClick={this.volverJugar}>Volver a jugar</Button>
                        <Button onClick={this.salirJuego}>Salir</Button>
                    </div>
                )
            }
            else{
                return(
                    <div className="ObtenerPuntajeFinal">
                        <Button onClick={this.finishGame} disabled={!this.state.nextLevel}>Obtener puntaje final</Button>
                    </div>
                )
            }
        }
    }

    // Cambia los estados para pasar al siguiente nivel.
    getNextLevel = () =>{
        if (this.state.level + 1 === 3){
            this.setState({
                isFinishing: true,
                Juega: true,
                nextLevel: false,
                level: this.state.level + 1,
                puntaje: this.state.puntaje,
                countQues: 15,
                countCorrects: 0,
                Min:this.state.Max,
                Max:this.state.Max + 60,
                Var1:this.randomInt(this.state.Min,this.state.Max),
                Var2:this.randomInt(this.state.Min,this.state.Max)
            });
        }
        else{
            this.setState({
                Juega: true,
                nextLevel: false,
                level: this.state.level + 1,
                puntaje: this.state.puntaje,
                countQues: 15,
                countCorrects: 0,
                Min:this.state.Max,
                Max:this.state.Max + 60,
                Var1:this.randomInt(this.state.Min,this.state.Max),
                Var2:this.randomInt(this.state.Min,this.state.Max)
            });
        }
        // Guarda el puntaje a la tabla de rankings del nivel que paso.
        this.updateScore();
    }
    // Elementos de retorno segun situacion de juego
    Operation = (var1,var2,oper) => {

        if(this.state.Finish){
            return (
                    <div className='JuegoTerminado'>
                        <h2>Terminaste el juego!<br/>Felicitaciones!</h2>
                        <h3>Puntaje total obtenido: </h3>
                        <CountUp
                        className='CountUpNumber'
                        end={this.state.puntaje}
                        duration={3}/>
                    </div>
                    );
        }
        else{
            if(this.state.Juega){
                
                if(this.state.perdido){
                    return <UserDialog Close={this.volverIntentar} Open={this.state.perdido}></UserDialog>
                }
                else{
                    switch(oper){
                        case 'Suma':
                            return (
                                <div className='Operacion'>
                                    <h1>{var1} + {var2} = ?</h1>
                                    <UserTextField valueRes={this.state.Result} callback={this.getResult}></UserTextField>
                                    <Button type="submit" disabled={!this.state.Result} onClick={this.isCorrect}>OK</Button>
                                </div>
                            );
                        case 'Resta':
                            if(var1 < var2){
                                return (
                                    <div className='Operacion'>
                                        <h1>{var2} - {var1} = ?</h1>
                                        <UserTextField valueRes={this.state.Result} callback={this.getResult}></UserTextField>
                                        <Button disabled={!this.state.Result} onClick={this.isCorrect}>OK</Button>
                                    </div>
                                );
                            }else{
                                return (
                                    <div className='Operacion'>
                                        <h1>{var1} - {var2} = ?</h1>
                                        <UserTextField valueRes={this.state.Result} callback={this.getResult}></UserTextField>
                                        <Button disabled={!this.state.Result} onClick={this.isCorrect}>OK</Button>
                                    </div>
                                );
                            }
                        case 'MyM':
                            return (
                                <div className='OperacionMyM'>
                                    <h1>¿{var1} es mayor que {var2}?</h1>
                                    <UserCheckBoxField callback={this.getResult}/>
                                    <Button disabled={!this.state.Result} onClick={this.isCorrect}>OK</Button>
                                </div>
                            );
                        default:
                            return ;
                    }
                }
            }
            else{
                if(this.state.level < 3){
                    return (
                        <div className='Ganador'>
                            <h2>¡Ganaste!<br/><br/>Ahora vamos con un nivel mas dificil</h2>
                        </div>
                    );
                }
                else{
                    return (
                        <div className='Ganador'>
                            <h2>¡Ganaste!<br/><br/>Terminaste el ultimo nivel</h2>
                        </div>
                    );
                }
                
            }
        }
    }

    render() {        
        return (
            <div>
                <div className="DescSumasRestasMyM">
                    <h1>Juego Sumas</h1>
                    <h2 hidden={!this.state.Juega}>¡Es hora de comenzar!
                        <br/>
                        Nivel {this.state.level}
                    </h2>
                    <h4 hidden={!this.state.Juega}>¿Cual es el resultado de la siguiente operacion?</h4>
                    {this.Operation(this.state.Var1,this.state.Var2,this.state.oper)}
                        {!this.state.Juega ? 
                        <div className='DescPuntajes' hidden={this.state.Finish}>
                        <h3>Contestaste {this.state.countCorrects} respuestas correctas</h3>
                        <h3>Hiciste un puntaje de {this.state.puntaje} puntos</h3>
                        </div>
                        :
                        <div className='DescPuntajes' hidden={this.state.Finish}>
                        <h5>Tu puntaje es {this.state.puntaje}</h5>
                        <h5>Contestaste {this.state.countCorrects} respuestas correctas
                        <br/> Quedan {this.state.countQues} operaciones</h5>
                        </div>
                        }
                </div>
                {this.ConfirmLevelScore()}
            </div>
        )
    }
}

export default (SumasRestasMyM);