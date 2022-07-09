import React from "react";
import { Route } from "react-router-dom";
import DetailsPlayer from "./components/DetailsPLayer/DetailsPlayer.jsx";
import HomeAdmin from "./components/HomeAdmin/HomeAdmin.jsx";
import LandingPage from "./components/LandingPage/LandingPage.jsx";
import NavBar from "./components/NavBar/NavBar";
import { Players } from "./components/Players/Players.jsx";

function App() {
  return (
    <div className="App">
      <Route path={"/"} component={NavBar} />
      <Route exact path={"/"} component={LandingPage} />
      <Route exact path={"/players"} component={Players} />
      <Route exact path={"/HomeAdmin"} component={HomeAdmin} />
      <Route exact path={"/players/:playerId"} component={DetailsPlayer} />
    </div>
  );
}

export default App;
