import { Route } from 'react-router-dom';
import './App.css';
import { Players } from './components/Players/Players';


function App() {
  return (
    <div className="App">
      {/* <Route exact path={"/"} component={LandingPage} /> */}
      <Route exact path={"/players"} component={Players} />
      {/* <Route exact path={"/admin"} component={Admin}/>
      <Route exact path={"/players/:playerId"} component={PlayerDetails} /> */}
    </div>
  );
}

export default App;
