import React, {Component} from 'react';
import './MenuJuegosNavbar.scss'
import {withStyles} from '@material-ui/core/styles';
import {withRouter, Link} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import auth from '../../../ProtectedRoutes/auth'
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import BarChartRoundedIcon from '@material-ui/icons/BarChartRounded';
import SportsEsportsOutlinedIcon from '@material-ui/icons/SportsEsportsOutlined';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = (theme) => ({
    root: {
        flexGrow: 1,
    },
    appBar: {
        background: '#007BA7',
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
                            MathApp
                        </Typography>
                        <ul className="MenuGames">
                            <li>
                                <Button
                                    component={Link}
                                    to="/ranking"
                                    className="MenuNavbarButton"
                                    startIcon={<BarChartRoundedIcon/>}>
                                    Ranking
                                </Button>
                            </li>
                            <li>
                                <Button
                                    component={Link}
                                    to="/games"
                                    className="MenuNavbarButton"
                                    startIcon={<SportsEsportsOutlinedIcon/>}>
                                    Juegos
                                </Button>
                            </li>
                            <li>
                                <Button
                                    onClick={this.signOut}
                                    startIcon={<ExitToAppIcon/>}
                                    className="MenuNavbarButton">
                                   Salir
                                </Button>
                            </li>
                        </ul>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default withStyles(useStyles)(withRouter(MenuJuegosNavbar));