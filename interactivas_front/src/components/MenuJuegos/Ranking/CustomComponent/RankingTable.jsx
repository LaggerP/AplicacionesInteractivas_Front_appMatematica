import React,{Component} from 'react';
import './RankingTable.scss'
import { Container } from '@material-ui/core'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TrofeoOro from '../../../../assets/Images/RankingTrofeos/oro.png'
import TrofeoPlata from '../../../../assets/Images/RankingTrofeos/plata.png'
import TrofeoBronce from '../../../../assets/Images/RankingTrofeos/bronce.png'
import CountUp from 'react-countup';

import '../Ranking.scss';

import {getAllRankings} from '../../../../services/rankingServices'

import data from '../../../../assets/jsonGeneral/data.json'//Simulacion de usuarios


class InteractiveList extends Component{
    constructor(){
        super();
        this.state = { users: [] };
    }

    componentDidMount(){
        this.getAllRankingData();
        var sortUsersRanking = data.sort((a, b) => b.ranking - a.ranking);
        this.setState({users: sortUsersRanking});
    }

    async getAllRankingData(){
        const data = await getAllRankings()
        console.log(data)
    }

    witchBadge(index){
        if (index === 0 ){
            return(
                <img src={TrofeoOro} alt=""/>
            )}
        else if (index === 1){
            return(
                <img src={TrofeoPlata} alt=""/>
            )}
        else if(index === 2){
            return(
                <img src={TrofeoBronce} alt=""/>
            )}
    }

    render(){
        return(
            <div className="rankingTable">
                <Container maxWidth="md" maxHe>
                    <Paper className="root">
                        <Table className="table">
                            <TableHead className="tableHead">
                                <TableRow>
                                    <TableCell className="tableCell">Posición</TableCell>
                                    <TableCell  className="tableCell">Nickname</TableCell>
                                    <TableCell numeric className="tableCell">Puntaje</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.users.map((user, index) => {
                                    return (
                                        <TableRow key={user.id}>
                                            <TableCell component="th" scope="row" className="TableCell">
                                                {(index<=2) ? this.witchBadge(index) : index+1}
                                            </TableCell>
                                            <TableCell numeric className="tableCell">{user.nick_name}</TableCell>
                                            <TableCell numeric className="tableCell">
                                                <CountUp
                                                    end={user.ranking}
                                                    duration={3}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </Paper>
                </Container>
            </div>
        )
    }
}
export default (InteractiveList);