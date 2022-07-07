
import React from 'react';
import { Route, Routes} from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HomeAdmin from './Components/HomeAdmin/HomeAdmin';

import { getAllPlayers } from './redux/actions';
import NavBar from './Components/NavBar/NavBar';


function App() {

  return (
   
    <div className="App">

      <NavBar/>
      {/* <Route exact path={"/"} component={LandingPage} /> */}
      {/* <Route exact path={"/players"} component={Players} /> */}
      <Route exact path={"/HomeAdmin"} component={HomeAdmin}/>
      {/* <Route exact path={"/players/:playerId"} component={DetailsPlayer} /> */}
    </div>
  );
}

export default App;
