import React from 'react';
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

   },
   Button: {
      marginRight: theme.spacing(3),
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
               <Button className={classes.Button} color="inherit">Home</Button>
               <Button className={classes.Button} color="inherit">Juegos</Button>
               <Button className={classes.Button} variant="contained" color="secondary">Entrar</Button>
            </Toolbar>
         </AppBar>
      </div>
   );
}