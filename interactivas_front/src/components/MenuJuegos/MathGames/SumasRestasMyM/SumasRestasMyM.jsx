import React, {Component} from 'react';
import './SumasRestasMyM.scss';
import {Button} from "@material-ui/core";
import UserTextField from "./CustomComponent/UserTextField";
import UserCheckBoxField from "./CustomComponent/UserCheckBoxField";
import UserDialog from './CustomComponent/UserDialog';
import CountUp from 'react-countup';

class SumasRestasMyM extends Component {

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
            countCorrects: 0
        };
    
    // Funcion para generar un numero random entre dos numeros
    randomInt(min, max) {
        return min + (Math.floor((max - min) * Math.random()));
    }

    volverIntentar = ()=> {
        this.setState({perdido:false});
        this.setState({Juega: true});
        this.setState({nextLevel: false});
    }

    // Obtiene el resultado de la respuesta y lo guarde en el estado Result
    getResult = (Result) =>{
        this.setState({Result:Result});
    }

    // Valida si es Suma, Resta, MayorMenor y hace la operacion correspondiente
    correctResult(var1,var2,oper){
        switch(oper){
            case 'Suma':
                console.log(var1 + var2);
                return var1 + var2;
            case 'Resta':
                if(var1 > var2){
                    console.log(var1 - var2);
                    return var1 - var2;
                }
                else{
                    console.log(var2 - var1);
                    return var2 - var1;
                }
            case 'MyM':
                console.log(var1 > var2 ? 'ES MAYOR': 'NO ES MAYOR');
                if(var1 > var2){
                    return 'SI';
                }
                else{
                    return 'NO';
                }
            default:
                return console.log('No existen operaciones');
        }
    }

    // Verifica si es correcta la respuesta y actualiza los estados
    isCorrect = ()=>{
        const operaciones = ['Suma', 'Resta', 'MyM'];
        var operacion = operaciones[Math.floor(Math.random()*operaciones.length)];
        while (operacion === 'MyM' & operacion === this.state.oper){
            operacion = operaciones[Math.floor(Math.random()*operaciones.length)];
        }

        var result = this.state.Result

        if(this.state.oper === 'Suma' || this.state.oper === 'Resta'){
            result = parseInt(this.state.Result);
        }
        // Valida respuesta
        if (this.correctResult(this.state.Var1,this.state.Var2,this.state.oper) === result){
            console.log('ES CORRECTO');

            this.setState({oper:operacion});
            this.setState({Var1: this.randomInt(this.state.Min,this.state.Max)});
            this.setState({Var2: this.randomInt(this.state.Min,this.state.Max)});

            this.setState({countCorrects: this.state.countCorrects + 1});
            this.setState({countQues: this.state.countQues - 1});
            this.setState({puntaje: this.state.puntaje + 100});

            this.setState({Result:''});
        }
        else{
            console.log('ES INCORRECTO');

            this.setState({oper:operacion});
            this.setState({Var1: this.randomInt(this.state.Min,this.state.Max)});
            this.setState({Var2: this.randomInt(this.state.Min,this.state.Max)});

            this.setState({puntaje: this.state.puntaje - 30});
            this.setState({countQues: this.state.countQues - 1});

            this.setState({Result:''});
        }
        // Valida si gano el nivel
        if(this.state.countQues === 1 && this.state.countCorrects >= 7){
            console.log('Gano');
            this.setState({Juega: false});
            this.setState({perdido: false});
            this.setState({nextLevel: true});
            
        }
        // Valida si perdio el nivel
        else if(this.state.countQues === 1 && this.state.countCorrects < 7){
            console.log('Perdio');
            this.setState({countCorrects: 0});
            this.setState({countQues: 15});
            this.setState({Juega: true});
            this.setState({perdido: true});
            this.setState({nextLevel: false});
        }
    }

    //Termina el juego
    finishGame = () =>{
        console.log('TERMINO, OBTENER RESULTADOS.')
        this.setState({Finish: true});
    }

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
            this.setState({isFinishing: true});
            console.log('Completa nivel y termina el juego');
            this.setState({Juega: true});
            this.setState({nextLevel: false});
            this.setState({level: this.state.level + 1});
            this.setState({puntaje: this.state.puntaje});
            this.setState({countQues: 15});
            this.setState({countCorrects: 0});
            this.setState({Min:this.state.Max});
            this.setState({Max:this.state.Max + 60});
            this.setState({Var1:this.randomInt(this.state.Min,this.state.Max)});
            this.setState({Var2:this.randomInt(this.state.Min,this.state.Max)});
        }
        else{
            this.setState({Juega: true});
            this.setState({nextLevel: false});
            this.setState({level: this.state.level + 1});
            this.setState({puntaje: this.state.puntaje});
            this.setState({countQues: 15});
            this.setState({countCorrects: 0});
            this.setState({Min:this.state.Max});
            this.setState({Max:this.state.Max + 60});
            this.setState({Var1:this.randomInt(this.state.Min,this.state.Max)});
            this.setState({Var2:this.randomInt(this.state.Min,this.state.Max)});
            console.log('Pasa al siguiente nivel');
        }
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
                            return console.log('Operacion no soportada');
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