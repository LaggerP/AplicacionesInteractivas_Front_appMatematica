import React, { Component } from 'react'
import Header from './LandingHeader/LandingHeader'
import Body from './LandingBody/LandingBody'
import auth from "../../ProtectedRoutes/auth";
import Navbar from "./LandingNavbar/LandingNavbar";

export class Landing extends Component {

    // redirect to dashboard if the user is logged
    componentDidMount() { if (auth.isConnected()) this.props.history.push('/games'); }

    render() {
      return (
         <div>
             <Navbar></Navbar>
             <Header></Header>
            <Body></Body>
         </div>
      )
   }
}

export default Landing
