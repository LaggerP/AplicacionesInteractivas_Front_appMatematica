import React, { Component } from 'react'
import LandingHeader from './LandingHeader/LandingHeader'
import LandingBody from './LandingBody/LandingBody'
import {isConnected} from '../../services/authenticationServices'
import LandingNavbar from "./LandingNavbar/LandingNavbar";

export class Landing extends Component {

   // redirect to dashboard if the user is logged
   componentDidMount() {
      if (isConnected()) this.props.history.push('/games');
   }

   render() {
      return (
         <div>
            <LandingNavbar />
            <LandingHeader />

            <LandingBody />
         </div>
      )
   }
}

export default Landing