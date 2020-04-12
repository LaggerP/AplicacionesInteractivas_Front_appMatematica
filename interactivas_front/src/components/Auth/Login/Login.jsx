import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button'
import auth from '../../../ProtectedRoutes/auth'
import './Login.scss'
import {css} from "@emotion/core";
import PacmanLoader from "react-spinners/PacmanLoader";

const override = css`
  margin: 0 auto;
  text-align: center;
  width: 14%;
  margin-top: 140px;
`;

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            loading: false,
        };
    }

    /*
    * atributo 'name' viene de la referencia al atributo que se pasa por parametro en el input
    * */
    handleChange = name => event => this.setState({[name]: event.target.value})

    login = (e) => {
        e.preventDefault();
        const userData = {email: this.state.email, password: this.state.password}
        console.log(userData)
        if (userData.email !== '' || userData.password !== '') {
            this.setState({loading: true})
            setTimeout(
                () => auth.authenticate(() => this.props.history.push('/games'))
                , 5000);
        }
    };

    render() {
        return (
            <div className="loginContainer">
                <div className="loginContainer-box">
                    <div className="loginContainer-box--header">
                        <h1>Ingrese sus datos</h1>
                    </div>
                    {!this.state.loading ?
                        <form onSubmit={this.login}>
                            <div className="loginContainer-box--form">
                                <form action="">
                                    <div className="loginContainer-box--form--email">
                                        <div>
                                            <label>E-mail:</label>
                                        </div>
                                        <div>
                                            <input
                                                type="email"
                                                id="emailInput"
                                                placeholder="tu@email.com"
                                                name="email"
                                                onChange={this.handleChange('email')}
                                                autoFocus
                                                required/>
                                        </div>
                                    </div>
                                    <div className="loginContainer-box--form--password">
                                        <div>
                                            <label>Contraseña:</label>
                                        </div>
                                        <div>
                                            <input
                                                type="password"
                                                id="passwordInput"
                                                placeholder="Contraseña"
                                                name="password"
                                                onChange={this.handleChange('password')}
                                                required/>
                                        </div>
                                    </div>
                                    <div className="loginContainer-box--form--button">
                                        <Button type="submit" variant="contained">Ingresar </Button>
                                    </div>
                                </form>
                            </div>
                        </form>
                        :
                        <PacmanLoader
                            css={override}
                            size={30}
                            color={"#45B39D"}
                            loading={this.state.loading}
                        />
                    }

                </div>
                {
                    /*
                       Cuando se tiene Material-UI se puede navegar entre componentes de la siguiente forma:
                       <Button component={Link} to="/">Volver</Button>
                       Cuando no se usa Material-UI hay que hacerlo de la siguiente forma:
                       <Link to="/" className="link"><button >Volver</button></Link>
                    */
                }
                <Button component={Link} to="/">Volver</Button>
                <Link to="/" className="link">
                    <button>Volver</button>
                </Link>

                <div>
            </div>
        )
    }
}
