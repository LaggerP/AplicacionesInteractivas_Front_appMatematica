import React, {Component} from 'react';
import MenuJuegosNavbar from '../MenuJuegosNavbar/MenuJuegosNavbar';
import InteractiveList from './CustomComponent/InteractiveList';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import PollOutlinedIcon from '@material-ui/icons/PollOutlined';
import InsertChartOutlinedRoundedIcon from '@material-ui/icons/InsertChartOutlinedRounded';
import InsertChartOutlinedOutlinedIcon from '@material-ui/icons/InsertChartOutlinedOutlined';
import AssessmentOutlinedIcon from '@material-ui/icons/AssessmentOutlined';
import './Ranking.scss';

class Ranking extends Component {
    constructor() {
        super()
        this.state = {rankingAct: "RankingTotal"}
    }

    handleChange = (event, newValue) => {
        this.setState({rankingAct: newValue})
    }

    render() {
        const {rankingAct} = this.state
        return (
            <div>
                <MenuJuegosNavbar/>
                <div className="rankingContainer">
                    <div className="rankingContainer--title">
                        <h1>RANKING</h1>
                        <p>
                            Estas viendo el
                            Ranking {(rankingAct === 'RankingTotal') ? 'Total de Juegos' : `de ${rankingAct}`}
                        </p>
                    </div>
                    <div className="rankingContainer--results">
                        <BottomNavigation value={rankingAct} onChange={this.handleChange}>
                            <BottomNavigationAction
                                label="Ranking"
                                value="RankingTotal"
                                icon={<PollOutlinedIcon/>}
                            />
                            <BottomNavigationAction
                                label="Monedas"
                                value="Monedas"
                                icon={<InsertChartOutlinedRoundedIcon/>}
                            />
                            <BottomNavigationAction
                                label="Fracciones"
                                value="Fracciones"
                                icon={<InsertChartOutlinedOutlinedIcon/>}
                            />
                            <BottomNavigationAction
                                label="Sumas"
                                value="Sumas"
                                icon={<AssessmentOutlinedIcon/>}
                            />
                        </BottomNavigation>
                        <InteractiveList/>
                    </div>


                </div>

            </div>
        )
    }
}

export default (Ranking);