import React from 'react';
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

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
   LoginButton: {
      backgroundColor: '#F50057',
      marginRight: theme.spacing(3),
      color: 'white',
      '&:hover': {
         backgroundColor: '#4a47a3',
      },
      
   },

   title: {
      flexGrow: 1,
   },
}));

export default function ButtonAppBar() {
   const classes = useStyles();

   return (
      <div className={classes.root}>
         <AppBar position="static" className={classes.appBar}>
            <Toolbar>

               <Typography variant="h6" className={classes.title}>
                  AppName
               </Typography>

               <Button className={classes.Button} color="inherit">
                  <span role="img" aria-label="home">🏠Home</span>

               </Button>
               <Button className={classes.Button} color="inherit">
                  <span role="img" aria-label="game">🎮Juegoss</span>
               </Button>
               <Button
                  component={Link}
                  to="/login"
                  className={classes.LoginButton}
                  variant="contained">
                  <span role="img" aria-label="key">🔑Ingresar</span>
               </Button>
            </Toolbar>
         </AppBar>
      </div>
   );
}