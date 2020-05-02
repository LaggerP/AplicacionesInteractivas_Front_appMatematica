import React, {Component} from 'react'
import {withRouter} from "react-router-dom";
import './LandingHeader.scss'
import './../../../animate.css'
import auth from "../../../ProtectedRoutes/auth";
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
            nickName: '',
            password: '',
            loading: false,
            isRegister: true,
            isLoading: false,
        }
    }

    handleChange = name => event => this.setState({[name]: event.target.value})

    login = (e) => {
        e.preventDefault();
        this.setState({isLoading: true})
        const userData = {nickName: this.state.nickName, password: this.state.password}
        console.log(userData)
        if (userData.nickName !== '' && userData.password !== '') {
            this.setState({loading: true})
            localStorage.setItem('sessionName', userData.nickName); // Se guarda en localStorage el nombre.
            setTimeout(
                () => auth.authenticate(() => this.props.history.push({
                    pathname: '/games',
                    state: {nick: userData.nickName}
                }))
                , 2000);
        }
    };

    register = (e) => {
        e.preventDefault();
        this.setState({loading: true})
        const userData = {nickName: this.state.nickName, password: this.state.password}
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
                                           name="nickName"
                                           onChange={this.handleChange('nickName')}
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
                                           name="nickName"
                                           onChange={this.handleChange('nickName')}
                                           required
                                    />
                                </div>

                                <div className="header-body--inputs-divInput">
                                    <input type="password"
                                           className="header-body--inputs-divInput-input animated zoomIn"
                                           maxLength="10"
                                           placeholder="Tu contraseña"
                                           name="nickName"
                                           onChange={this.handleChange('nickName')}
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