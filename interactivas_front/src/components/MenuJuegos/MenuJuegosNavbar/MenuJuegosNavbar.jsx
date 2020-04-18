import React, { Component } from 'react';
import './MenuJuegosNavbar.scss'
import { withStyles } from '@material-ui/core/styles';
import { withRouter, Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import auth from '../../../ProtectedRoutes/auth'
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";

const useStyles = (theme) => ({
   root: {
      flexGrow: 1,
   },
   appBar: {
      background: '#45B39D',
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

   render() {
      return (
         <div className={this.props.classes.root}>
            <AppBar position="static" className={this.props.classes.appBar}>
               <Toolbar>
                  <Typography variant="h6" className={this.props.classes.title}>
                     Virtu
                  </Typography>
                  <ul className="MenuGames">
                     <li>
                        <Link to="/ranking" className="link">
                           <span
                              className="menuIcon"
                              role="img"
                              aria-label="ranking">📊
                           </span>
                           <span
                              className="menuText">
                              Ranking
                           </span>
                        </Link>
                     </li>
                     <li>
                        <Link
                            to="/games"
                            className="link">
                           <span
                               className="menuIcon"
                               role="img"
                               aria-label="game">🕹️</span>
                           <span
                               className="menuText">Juegos</span>
                        </Link>
                     </li>

                     <Button onClick={this.signOut}
                             color="secondary"
                             variant="contained"
                             className="buttonExit">
                        <span className="buttonExit--span" role="img" aria-label="logout">🚪Salir</span>
                     </Button>

                  </ul>

               </Toolbar>
            </AppBar>
         </div>
      );
   }
}

export default withStyles(useStyles)(withRouter(MenuJuegosNavbar));