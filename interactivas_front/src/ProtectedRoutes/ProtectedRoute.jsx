import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import auth from './auth'

const ProtectedRoute = ({ component: Component, ...rest }) => {
   
   /**
    * Lógica:
    * 
    * Este componente se va a encargar de detectar si el usuario está o no conectado
    * Consulta mediante la funcion ProtectedRoutes.isConnected() y según en valor que le retorne,
    * redirecciona al componente dashboard o te lleva al componente login para que
    * inicies sesión
    * 
    */

   return (

      <Route
         {...rest}
         render={props => {
            if (auth.isConnected()) {
               return <Component {...props} />
            } else {
               return <Redirect
                  to={{
                     pathname: '/login',
                     state: {
                        from: props.location
                     }
                  }}
               />
            }
         }
         }
      />
   )
};

export default ProtectedRoute