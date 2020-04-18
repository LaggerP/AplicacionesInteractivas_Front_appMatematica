import React,{Component} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Filter1Icon from '@material-ui/icons/Filter1';
import Filter2Icon from '@material-ui/icons/Filter2';
import Filter3Icon from '@material-ui/icons/Filter3';
import Grid from '@material-ui/core/Grid';

import '../Ranking.scss';

import data from './data.json'//Simulacion de usuarios

class InteractiveList extends Component{
    constructor(){
        super();
        this.state = { users: [] };
    }

    componentDidMount(){
        console.log(data);
        var sortUsersRanking = data.sort(function (a, b) {
            return ((a.ranking > b.ranking) ? -1 : ((a.ranking < b.ranking) ? 1 : 0));
        });

        this.setState({users: sortUsersRanking});
    }

    witchBadge(index){
        if (index === 1 ){
            return(
                <ListItemSecondaryAction className="bagdeIcon">
                    <Avatar style={{backgroundColor:"#D0D90F"}}> 
                        <Filter1Icon/>
                    </Avatar>
                </ListItemSecondaryAction>
        )}
        else if (index === 2){
            return(
                <ListItemSecondaryAction className="bagdeIcon">
                    <Avatar style={{backgroundColor:"#C0C0BD"}}> 
                        <Filter2Icon/>
                    </Avatar>
                </ListItemSecondaryAction>
        )}
        else if(index === 3){
            return( 
                <ListItemSecondaryAction className="bagdeIcon">
                    <Avatar style={{backgroundColor:"#AD6522"}}> 
                        <Filter3Icon/>
                    </Avatar>
                </ListItemSecondaryAction>
        )}
    }
    
    render(){
        return(
            <div>
                <Grid 
                container
                spacing={1}
                justify="center"
                item xs={6}>
                <List>
                    <ListItem>
                        <ListItemText><u><strong>Nombres</strong></u></ListItemText>
                        <ListItemSecondaryAction><u><strong>Puntos</strong></u></ListItemSecondaryAction>
                    </ListItem>
                    {this.state.users.map((user,index) =>{
                        return(
                            <ListItem key={user.id}>
                                <ListItemAvatar >
                                    <Avatar style={{background:'#'+ Math.floor(Math.random()*16777215).toString(16)}}>
                                    {user.nick_name.substr(0,2).toUpperCase()}
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={user.nick_name}>
                                </ListItemText>
                                <ListItemSecondaryAction>
                                    {user.ranking}
                                    {this.witchBadge(index+1)}
                                </ListItemSecondaryAction>
                            </ListItem>
                        )})}
                    </List>
                </Grid>
            </div>
        )
    }
}
export default (InteractiveList);
