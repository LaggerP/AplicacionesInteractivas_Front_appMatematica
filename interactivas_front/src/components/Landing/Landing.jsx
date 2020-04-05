import React, { Component } from 'react'
import Header from './LandingHeader/LandingHeader'
import Body from './LandingBody/LandingBody'

export class Landing extends Component {
   render() {
      return (
         <div>
            <Header></Header>
            <Body></Body>
         </div>
      )
   }
}

export default Landing
