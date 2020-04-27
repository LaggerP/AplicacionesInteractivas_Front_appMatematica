import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './LandingNavbar.scss'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import HomeIcon from '@material-ui/icons/Home';
import GamesIcon from '@material-ui/icons/Games';

const useStyles = makeStyles((theme) => ({
   root: {
      flexGrow: 1,
   },
   appBar: {
      background: '#007BA7',
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
                  <li>
                     <Button
                         href="#home"
                         className="LandingNavbarButton"
                         startIcon={<HomeIcon/>}>
                        <span>Home</span>
                     </Button>
                  </li>
                  <li>
                     <Button
                         href="#games"
                         className="LandingNavbarButton"
                         startIcon={<GamesIcon/>}>
                        <span>Juegos</span>
                     </Button>
                  </li>
               </ul>
            </Toolbar>
         </AppBar>
      </div>
   );
}