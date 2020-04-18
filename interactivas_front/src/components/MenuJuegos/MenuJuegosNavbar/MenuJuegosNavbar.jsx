import React,{Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import {withRouter} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import auth from '../../../ProtectedRoutes/auth'
import Typography from '@material-ui/core/Typography';
import BarChartRoundedIcon from '@material-ui/icons/BarChartRounded';
import SportsEsportsOutlinedIcon from '@material-ui/icons/SportsEsportsOutlined';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import IconButton from '@material-ui/core/IconButton';

const useStyles = (theme) => ({
   root: {
      flexGrow: 1,
   },
   appBar: {
      background: '#45B39D',
      position: 'relative',
   },
   Button: {
      marginRight: theme.spacing(3),
      fontSize: "20px",
      '&:hover': {
         color: 'white'
      },
   },
   
   title: {
      flexGrow: 1,
   },
});

class MenuJuegosNavbar extends Component {

   signOut = (e) => {
      e.preventDefault();
      auth.signOut(() => this.props.history.push('/'))
   }
   showRanking = (e) => {
      e.preventDefault();
      this.props.history.push('/ranking');
   }
   showGames = (e) => {
      e.preventDefault();
      if (auth.isConnected){
         this.props.history.push('/games');
      }
   }


   render(){
      return (
         <div className={this.props.classes.root}>
            <AppBar position="static" className={this.props.classes.appBar}>
               <Toolbar>
                  <Typography variant="h6" className={this.props.classes.title}>
                     AppName
                  </Typography>
                  <IconButton onClick={this.showRanking} title="Ranking" aria-label="home" className={this.props.classes.Button} color="inherit">
                     <span className="spanNavBar" role="img" > Ranking </span>
                     <BarChartRoundedIcon/>
                  </IconButton>
                  <IconButton onClick={this.showGames} title="Juegos" aria-label="game" className={this.props.classes.Button} color="inherit">
                     <span className="spanNavBar" role="img"> Juegos </span>
                     <SportsEsportsOutlinedIcon/>
                  </IconButton>
                  <IconButton title="Cerrar sesión" className={this.props.classes.Button} role="img" aria-label="game" onClick={this.signOut} color="inherit">
                     <span className="spanNavBar" role="img"> Cerrar sesión </span>
                     <LockOutlinedIcon/>
                  </IconButton>
               </Toolbar>
            </AppBar>
         </div>
      );
   }
}

export default withStyles(useStyles)(withRouter(MenuJuegosNavbar));