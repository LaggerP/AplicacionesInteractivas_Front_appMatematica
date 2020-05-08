import React, {Component} from 'react';
import './SumasRestasMyM.scss';
import {Button} from "@material-ui/core";
import UserTextField from "./CustomComponent/UserTextField";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import UserCheckBoxField from "./CustomComponent/UserCheckBoxField";
import UserDialog from './CustomComponent/UserDialog';

class SumasRestasMyM extends Component {

    state ={Juega:true,
            Var1:this.randomInt(1,10), 
            Var2:this.randomInt(1,10), 
            oper:'Suma', 
            MinMax:[1,10], 
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
        return min + Math.floor((max - min) * Math.random());
    }

    volverIntentar = ()=> {
        this.setState({perdido:false});
        this.setState({Juega: true});
        this.setState({nextLevel: false});
    }

    // Obtiene el resultado de la respuesta y lo guarde en el estado Result
    getResult = (Result) =>{
        this.setState({Result:Result})
    }

    // Valida si es Suma, Resta, MayorMenor y hace la operacion correspondiente
    correctResult(var1,var2,oper){
        switch(oper){
            case 'Suma':
                console.log(var1 + var2);
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
                return console.log('No existen operaciones');
        }
    }

    // Verifica si es correcta la respuesta y actualiza los estados
    isCorrect = ()=>{
        const operaciones = ['Suma', 'Resta', 'MyM'];
        var operacion = operaciones[Math.floor(Math.random()*operaciones.length)];

        var result = this.state.Result

        if(this.state.oper === 'Suma' || this.state.oper === 'Resta'){
            result = parseInt(this.state.Result);
        }
        // Valida respuesta
        if (this.correctResult(this.state.Var1,this.state.Var2,this.state.oper) === result){
            console.log('ES CORRECTO');

            this.setState({oper:operacion});
            this.setState({Var1: this.randomInt(this.state.MinMax[0],this.state.MinMax[1])});
            this.setState({Var2: this.randomInt(this.state.MinMax[0],this.state.MinMax[1])});

            this.setState({countCorrects: this.state.countCorrects + 1});
            this.setState({countQues: this.state.countQues - 1});
            this.setState({puntaje: this.state.puntaje + 100});

            this.setState({Result:''});
        }
        else{
            console.log('ES INCORRECTO');

            this.setState({oper:operacion});
            this.setState({Var1: this.randomInt(this.state.MinMax[0],this.state.MinMax[1])});
            this.setState({Var2: this.randomInt(this.state.MinMax[0],this.state.MinMax[1])});

            this.setState({puntaje: this.state.puntaje - 30});
            this.setState({countQues: this.state.countQues - 1});

            this.setState({Result:''});
        }
        // Valida si gano el nivel
        if(this.state.countQues <= 1 && this.state.countCorrects >= 7){
            console.log('Gano');
            this.setState({Juega: false});
            this.setState({perdido: false});
            this.setState({nextLevel: true});
            
        }
        // Valida si perdio el nivel
        else if(this.state.countQues === 0 && this.state.countCorrects < 7){
            console.log('Perdio');
            this.setState({countCorrects: 0});
            this.setState({countQues: 15});
            this.setState({Juega: true});
            this.setState({perdido: true});
            this.setState({nextLevel: false});
        }
    }
    // Cambia los estados para pasar al siguiente nivel.
    getNextLevel = () =>{
        this.setState({Juega: true});
        this.setState({level: this.state.level + 1});
        this.setState({puntaje: this.state.puntaje});
        this.setState({countQues: 15});
        this.setState({countCorrects: 0});
        this.setState({MinMax:[this.state.MinMax[1],this.state.MinMax[1]+60]});
        this.setState({Var1:this.randomInt(this.state.MinMax[0],this.state.MinMax[1])});
        this.setState({Var2:this.randomInt(this.state.MinMax[0],this.state.MinMax[1])});
        console.log('Pasa al siguiente nivel');
    }
    // Elementos de retorno segun situacion de juego
    Operation = (var1,var2,oper) => {

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
                                <Button disabled={!this.state.Result} onClick={this.isCorrect}>OK</Button>
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
                            <div className='Operacion'>
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
            return (
                <div className='Operacion'>
                    <h2>¡Ganaste!<br/>Ahora vamos con un nivel mas dificil</h2>
                </div>
            );
        }
    }
    render() {        
        return (
            <div>
                <div className="DescSumasRestasMyM">
                    <h1>Juego Sumas</h1>
                    <h2>¡Es hora de comenzar!
                        <br/>
                        Nivel {this.state.level}
                    </h2>
                    <h4>¿Cual es el resultado de la siguiente operacion?</h4>
                    {this.Operation(this.state.Var1,this.state.Var2,this.state.oper)}
                    <div>
                        <h5>Tu puntaje es {this.state.puntaje}</h5>
                        <h5>Contestaste {this.state.countCorrects} respuestas correctas 
                            <br/>
                            Quedan {this.state.countQues} operaciones</h5>
                    </div>
                </div>
                <div className="ComenzarButton">
                    <Button onClick={this.getNextLevel} disabled={!this.state.nextLevel}>Siguiente nivel</Button>
                </div>
            </div>
        )
    }
}

export default (SumasRestasMyM);