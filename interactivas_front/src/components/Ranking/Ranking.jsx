import React,{Component} from 'react';
import MenuJuegosNavbar from '../MenuJuegos/MenuJuegosNavbar/MenuJuegosNavbar';
import InteractiveList from '../Ranking/CustomComponent/InteractiveList';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import PollOutlinedIcon from '@material-ui/icons/PollOutlined';
import InsertChartOutlinedRoundedIcon from '@material-ui/icons/InsertChartOutlinedRounded';
import InsertChartOutlinedOutlinedIcon from '@material-ui/icons/InsertChartOutlinedOutlined';
import AssessmentOutlinedIcon from '@material-ui/icons/AssessmentOutlined';
import './Ranking.scss';

class Ranking extends Component{
    constructor(){
        super()
        this.state = {rankingAct : "RankingTotal"}
    }
    handleChange = (event, newValue) =>{
        console.log(`Se eligio: ${newValue}`);
        this.setState({rankingAct : newValue})
    }
    render(){
        return(
            <div>
                <MenuJuegosNavbar></MenuJuegosNavbar>
                <h1>RANKING</h1>
                <p>Estas viendo el Ranking {(this.state.rankingAct === 'RankingTotal') ? 'Total de Juegos' : `de ${this.state.rankingAct}`}</p>
                <BottomNavigation value ={this.state.rankingAct} onChange={this.handleChange}>
                    <BottomNavigationAction label="Ranking" value="RankingTotal" icon={<PollOutlinedIcon />} />
                    <BottomNavigationAction label="Monedas" value="Monedas" icon={<InsertChartOutlinedRoundedIcon />} />
                    <BottomNavigationAction label="Fracciones" value="Fracciones" icon={<InsertChartOutlinedOutlinedIcon />} />
                    <BottomNavigationAction label="Sumas" value="Sumas" icon={<AssessmentOutlinedIcon />} />
                </BottomNavigation>
                <InteractiveList></InteractiveList>
            </div>
        )
    }
}

export default (Ranking);