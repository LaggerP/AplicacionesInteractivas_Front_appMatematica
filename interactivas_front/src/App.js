import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom'
import Landing from './components/Landing/Landing';
import Ranking from './components/MenuJuegos/Ranking/Ranking';
import MenuJuegos from './components/MenuJuegos/MenuJuegos'
import StartGameBilletes from './components/MenuJuegos/MathGames/Billetes/StartGameBilletes'
import StartSumasRestasMyM from './components/MenuJuegos/MathGames/SumasRestasMyM/StartSumasRestasMyM'
import ProtectedRoute from './ProtectedRoutes/ProtectedRoute'
import Multiplicacion from './components/MenuJuegos/MathGames/Multiplicacion/Multiplicacion'
import NotFound from "./components/NotFound";


function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Landing} />
        <ProtectedRoute exact path="/ranking" component={Ranking}/>
        <ProtectedRoute exact path="/games" component={MenuJuegos} />
        <ProtectedRoute exact path="/games/multiplicacion" component={Multiplicacion} />
        <ProtectedRoute exact path="/games/billetes" component={StartGameBilletes} />
        <ProtectedRoute exact path="/games/SumasRestasMyM" component={StartSumasRestasMyM} />
        <Route path="*" component={NotFound}/>
      </Switch>

    </div>
  );
}

export default App;
