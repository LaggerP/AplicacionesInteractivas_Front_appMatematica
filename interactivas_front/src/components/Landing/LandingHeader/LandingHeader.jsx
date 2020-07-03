import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import './LandingHeader.scss'
import './../../../animate.css'
import { register, login } from "../../../services/authenticationServices"
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

const override = css`
    width: 40px;
    height: 40px;
    display: inline-block;
    border-radius: 100%;
    border-width: 2px;
    border-style: solid;
    border-image: initial;
    border-color: #007BA7 #007BA7 transparent;
    animation: 0.75s linear 0s infinite normal both running animation-s8tf20;
    background: transparent !important;
`;

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isRegister: true,
            isAlert: false,
            alertMessage: '',
            alertType: '',
            isLoading: false,
        }
    }

    handleChange = name => event => this.setState({[name]: event.target.value})

    login = async (e) => {
        e.preventDefault();
        this.setState({isLoading: true})
        const userData = {username: this.state.username, password: this.state.password}
        const responseLogin = await login(userData);
        if (responseLogin.status === 200){
            this.setState({
                isLoading: false,
                alertMessage: responseLogin.data.message,
                alertType:'success',
                isAlert: true,
            });
            setTimeout(() => this.props.history.push({pathname: '/games',}), 2000);
        }
        else{
            this.setState({
                isLoading: false,
                alertMessage: responseLogin.data.message,
                alertType:'error',
                isAlert: true,
            });
            this.cleanInput();
        }
    }

    register = async (e) => {
        e.preventDefault();
        this.setState({isLoading: true});
        const userData = {username: this.state.username, password: this.state.password}
        const responseRegister = await register(userData);
        if (responseRegister.status === 200){
            this.setState({
                isLoading: false,
                alertMessage: responseRegister.data.message,
                alertType:'success',
                isAlert: true,
            });
            this.changeForm();
            this.cleanInput();
        }
        else{
            this.setState({
                isLoading: false,
                alertMessage: responseRegister.data.message,
                alertType:'error',
                isAlert: true,
            });
            this.cleanInput();
        }
    }

    cleanInput = () => {
        this.setState({username: ''});
        this.setState({password: ''});
    }

    showAlert = (message,type) => {
        return (
            <Snackbar open={this.state.isAlert} autoHideDuration={2000} onClose={this.closeAlert}>
                <Alert style={{width:'100%'}} elevation={6} variant='filled' onClose={this.closeAlert} severity={type}>
                    {message}
                </Alert>
            </Snackbar>
        )
    }

    closeAlert = (event, reason) => {
        this.setState({isAlert: false});
    }

    changeForm = () => {
        this.state.isRegister ? this.setState({isRegister: false}) : this.setState({isRegister: true})
    }

    render() {
        return (
            <div className="header" id="home">
                <div className="header-body">
                    {this.state.isRegister ?
                        <form onSubmit={this.login} autoComplete="off">
                            <div className="header-body--inputs ">
                                <h1 className="header-body--inputs-title">Empiece a jugar</h1>
                                <div className="header-body--inputs-divInput ">
                                    <input type="text"
                                           className="header-body--inputs-divInput-input animated zoomIn"
                                           maxLength="10"
                                           value={this.state.username}
                                           placeholder="Tu nickname"
                                           name="username"
                                           onChange={this.handleChange('username')}
                                           required
                                    />
                                </div>

                                <div className="header-body--inputs-divInput ">
                                    <input type="password"
                                           className="header-body--inputs-divInput-input animated zoomIn"
                                           maxLength="10"
                                           value={this.state.password}
                                           placeholder="Tu contraseña"
                                           name="password"
                                           onChange={this.handleChange('password')}
                                           required
                                    />
                                    <div className="divViewSpan animated zoomIn">
                                        <span className="formViewSpan" onClick={this.changeForm}>No tengo cuenta</span>

                                    </div>
                                </div>
                                <button type="submit" className="formSubmitButton animated zoomIn">

                                    {!this.state.isLoading ? <span>JUGAR</span>
                                        :
                                        <ClipLoader
                                            css={override}
                                            size={150}
                                            color={"#123abc"}
                                            loading={this.state.isLoading}
                                        />}
                                </button>

                            </div>
                        </form>
                        :
                        <form onSubmit={this.register} autoComplete="off">
                            <div className="header-body--inputs">
                                <h1 className="header-body--inputs-title">Registrarse</h1>
                                <div className="header-body--inputs-divInput">
                                    <input type="text"
                                           className="header-body--inputs-divInput-input animated zoomIn"
                                           maxLength="10"
                                           value={this.state.username}
                                           placeholder="Tu nickname"
                                           name="username"
                                           onChange={this.handleChange('username')}
                                           required
                                    />
                                </div>

                                <div className="header-body--inputs-divInput">
                                    <input type="password"
                                           className="header-body--inputs-divInput-input animated zoomIn"
                                           maxLength="10"
                                           value={this.state.password}
                                           placeholder="Tu contraseña"
                                           name="password"
                                           onChange={this.handleChange('password')}
                                           required
                                    />
                                    <div className="divViewSpan animated zoomIn">
                                        <span className="formViewSpan"
                                              onClick={this.changeForm}>Ya tengo una cuenta</span>

                                    </div>
                                </div>
                                <button type="submit" className="formSubmitButton animated zoomIn">
                                    {!this.state.isLoading ? <span>REGISTRARSE</span>
                                        :
                                        <ClipLoader
                                            css={override}
                                            size={150}
                                            color={"#123abc"}
                                            loading={this.state.isLoading}
                                        />}
                                </button>

                            </div>
                        </form>
                    }
                    {this.showAlert(this.state.alertMessage,this.state.alertType)}
                </div>
            </div>
        )
    }
}

export default withRouter(Header)