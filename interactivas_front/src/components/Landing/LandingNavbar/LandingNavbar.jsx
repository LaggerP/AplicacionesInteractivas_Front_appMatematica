import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './LandingNavbar.scss'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
   root: {
      flexGrow: 1,
   },
   appBar: {
      background: '#45B39D',
      position: 'fixed',
   },
   Button: {
      marginRight: theme.spacing(3),
      '&:hover': {
         backgroundColor: '#4a47a3',
         color: 'white'
      },
   },

   title: {
      flexGrow: 1,
   },
}));

export default function LandingNavbar() {
   const classes = useStyles();

   return (
      <div className={classes.root}>
         <AppBar position="static" className={classes.appBar}>
            <Toolbar>

               <Typography variant="h6" className={classes.title}>
                  Virtu
               </Typography>
               <ul className="MenuUl">
                  <li><a href="#home"><span role="img" aria-label="home">🏠</span>Home</a></li>
                  <li><a href="#games"><span role="img" aria-label="game">🎮</span>Juegos</a></li>
               </ul>
            </Toolbar>
         </AppBar>
      </div>
   );
}