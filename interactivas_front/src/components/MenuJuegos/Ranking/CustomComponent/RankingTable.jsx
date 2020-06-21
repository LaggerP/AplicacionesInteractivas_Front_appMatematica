import React,{Component} from 'react';
import '../Ranking.scss';
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
import {getAllRankings} from '../../../../services/rankingServices'

class InteractiveList extends Component{
    constructor(props){
        super(props);
        this.state = { users: [] };
    }

    async componentWillMount(){
        const data = await this.getAllRankingData();
        var sortUsersRanking = data.sort((a, b) => b.puntaje_total - a.puntaje_total);
        this.setState({users: sortUsersRanking});
    }

    async componentDidUpdate(previousProps) {
        if (previousProps.RankingGame !== this.props.RankingGame) {
            await this.rankingDataByGame(this.props.RankingGame).then(dataRanking =>{
                this.setState({users: dataRanking});
            })
        }
    }

    async getAllRankingData(){
        const data = await getAllRankings()
        data.map( d => {
            return d['puntaje_total']=d.puntaje_billetes + d.puntaje_multiplicacion + d.puntaje_sumas
        })
       return data
    }

    async rankingDataByGame(game){
        const data = await getAllRankings()
        const userData = [];
        data.map( user => {
            switch (game){
                case 'RankingTotal':
                    userData.push({id: user.id, username:user.username, puntaje_total: user.puntaje_billetes + user.puntaje_multiplicacion + user.puntaje_sumas})
                    break;
                case 'Sumas':
                    userData.push({id: user.id, username:user.username, puntaje_total: user.puntaje_sumas})
                    break
                case 'Multiplicaciones':
                    userData.push({id: user.id, username:user.username, puntaje_total: user.puntaje_multiplicacion})
                    break
                case 'Billetes':
                    userData.push({id: user.id, username:user.username, puntaje_total: user.puntaje_billetes})
                    break
                default:
                    break;
            }            
            return userData;
        })
        return userData.sort((a, b) => b.puntaje_total - a.puntaje_total);
    }

    witchBadge(index){
        if (index === 0 ){
            return(
                <img id="trofeo" src={TrofeoOro} alt=""/>
            )}
        else if (index === 1){
            return(
                <img id="trofeo" src={TrofeoPlata} alt=""/>
            )}
        else if(index === 2){
            return(
                <img id="trofeo" src={TrofeoBronce} alt=""/>
            )}
    }

    render(){
        return(
            <div className="rankingTable">
                <Container maxWidth="md">
                    <Paper className="root">
                        <Table className="table">
                            <TableHead className="tableHead">
                                <TableRow>
                                    <TableCell className="tableCell">Posición</TableCell>
                                    <TableCell className="tableCell">Nickname</TableCell>
                                    <TableCell className="tableCell">Puntaje</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.users.map((user, index) => {
                                    return (
                                        <TableRow key={user.id}>
                                            <TableCell component="th" scope="row" className="TableCell">
                                                {(index<=2) ? this.witchBadge(index) : index+1}
                                            </TableCell>
                                            <TableCell className="tableCell">{user.username}</TableCell>
                                            <TableCell className="tableCell">
                                                <CountUp
                                                    end={user.puntaje_total}
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