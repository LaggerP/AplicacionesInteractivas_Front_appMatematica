import React, { Component } from 'react'
import auth from '../../auth/auth'
import Button from '@material-ui/core/Button'

export default class Dashboard extends Component {

   signOut = (e) => {
      e.preventDefault();
      auth.signOut(() => this.props.history.push('/'))

   }
   render() {
      return (
         <div>
            <Button onClick={this.signOut} variant="contained" color="primary">Cerrar sesión</Button>
         </div>
      )
   }
}
