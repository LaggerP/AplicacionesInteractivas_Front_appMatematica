import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import Card from './Card/Card'
import './LandingBody.scss'

export default class LandingBody extends Component {
   render() {
      return (
         <div className="BodyContainer">
               <Grid className="GridContainer"
                  container
                  direction="row"
                  align="center">
                  <Grid item xs={12} sm={4}>
                     <Card title="Titulo 1"></Card>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                     <Card title="Titulo 2"></Card>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                     <Card title="Titulo 3"></Card>
                  </Grid>
               </Grid>
         </div>
      )
   }
}
