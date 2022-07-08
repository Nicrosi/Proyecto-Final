
import React from 'react';
import { Route} from 'react-router-dom';
import DetailsPlayer from './Components/DetailsPLayer/DetailsPlayer';
import HomeAdmin from './Components/HomeAdmin/HomeAdmin.jsx';
import NavBar from './Components/NavBar/NavBar';
import { Players } from './Components/Players/Players.jsx';


function App() {

  return (
   
    <div className="App">
      {/* <Route exact path={"/"} component={LandingPage} /> */}
      <Route path={"/"} component={NavBar} />
      <Route exact path={"/players"} component={Players} />
      <Route exact path={"/HomeAdmin"} component={HomeAdmin}/>
      <Route exact path={"/players/:playerId"} component={DetailsPlayer} />
    </div>
  );
}

export default App;
