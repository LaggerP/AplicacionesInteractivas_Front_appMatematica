import React, {Component} from 'react'
import {withRouter} from "react-router-dom";
import './LandingHeader.scss'
import Fab from "@material-ui/core/Fab";
import auth from "../../../ProtectedRoutes/auth";
import SportsEsportsRoundedIcon from '@material-ui/icons/SportsEsportsRounded';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nickName: '',
            loading: false,
        }
    }

    handleChange = name => event => this.setState({[name]: event.target.value})

    login = (e) => {
        e.preventDefault();
        const userData = {nickName: this.state.nickName}
        console.log(userData)
        console.log(localStorage.getItem('sessionName'));
        if (userData.nickName !== '') {
            this.setState({loading: true})
            localStorage.setItem('sessionName',userData.nickName); // Se guarda en localStorage el nombre.
            setTimeout(
                () => auth.authenticate(() => this.props.history.push({pathname:'/games', state:{nick:userData.nickName}}))
                , 2000);
        }
    };

    render() {
        return (
            <div className="header" id="home">
                <div className="header-body">
                    <form onSubmit={this.login}>
                        <div className="header-body--input">
                            <input type="text"
                                   className="header-body--input-nickName"
                                   maxLength="10"
                                   placeholder="Ingresá tu nickname para jugar"
                                   name="nickName"
                                   onChange={this.handleChange('nickName')}
                                   required
                            />
                            <Fab type="submit" className="fabButton">
                                <SportsEsportsRoundedIcon/>
                            </Fab>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default withRouter(Header)