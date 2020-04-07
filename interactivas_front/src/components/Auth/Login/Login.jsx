import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import auth from '../../../ProtectedRoutes/auth'

export default class Login extends Component {

   login = (e) => {
      e.preventDefault();
      auth.authenticate(() => this.props.history.push('/dashboard'))
   };

   render() {
      return (
         <div>
            <h1>Hola soy un login</h1>
            {
               /*
                  Cuando se tiene Material-UI se puede navegar entre componentes de la siguiente forma:
                  <Button component={Link} to="/">Volver</Button>
                  Cuando no se usa Material-UI hay que hacerlo de la siguiente forma:
                  <Link to="/" className="link"><button >Volver</button></Link>
               */
            }
            <Button component={Link} to="/">Volver</Button>
            <Link to="/" className="link"><button >Volver</button></Link>

            <div>
               <Button onClick={this.login} variant="contained" color="primary">Go dashboard</Button>
            </div>
         </div>
      )
   }
}
