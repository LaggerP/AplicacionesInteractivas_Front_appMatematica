import React, {Component} from 'react'
import { withRouter } from "react-router-dom";
import './LandingHeader.scss'
import './../../../animate.css'
import auth from "../../../ProtectedRoutes/auth";
import apiService from "../../../services/apiServices"
import {css} from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";

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
            loading: false,
            isRegister: true,
            isLoading: false,
        }
    }

    handleChange = name => event => this.setState({[name]: event.target.value})

    // TODO: login form
    login = async (e) => {
        e.preventDefault();
        this.setState({isLoading: true})
        const userData = {username: this.state.username, password: this.state.password}
        const responseLogin = await apiService.login(userData)
    
    }

    // TODO: register form
    register = async (e) => {
        e.preventDefault();
        this.setState({loading: true})
        const userData = {username: this.state.username, password: this.state.password}
        const responseRegister = await apiService.register(userData)
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

                                    {!this.state.loading ? <span>JUGAR</span>
                                        :
                                        <ClipLoader
                                            css={override}
                                            size={150}
                                            color={"#123abc"}
                                            loading={this.state.loading}
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
                                    {!this.state.loading ? <span>REGISTRARSE</span>
                                        :
                                        <ClipLoader
                                            css={override}
                                            size={150}
                                            color={"#123abc"}
                                            loading={this.state.loading}
                                        />}
                                </button>

                            </div>
                        </form>
                    }
                </div>
            </div>
        )
    }
}

export default withRouter(Header)