import React, { Component } from 'react'
import auth from '../../auth/auth'
import Button from '@material-ui/core/Button'

export default class Dashboard extends Component {

   signout = (e) => {
      e.preventDefault();
      auth.signout(() => this.props.history.push('/'))

   }
   render() {
      return (
         <div>
            <Button onClick={this.signout} variant="contained" color="primary">Cerrar sesión</Button>
         </div>
      )
   }
}
