import React from "react";
import { Route } from "react-router-dom";
import DetailsUser from "./components/DetailsUser/DetailsUser.jsx";
import LandingPage from "./components/LandingPage/LandingPage.jsx";
import HomeAdmin from "./components/HomeAdmin/HomeAdmin.jsx";
import NavBar from "./components/NavBar/NavBar";
import { Users } from "./components/Users/Users.jsx";
import { FormScore } from "./components/FormScore/FormScore.jsx";
import { FormSponsor } from "./components/FormSponsor/FormSponsor.jsx";
import { FormUser } from "./components/FormUser/FormUser.jsx";
import { FormTournament } from "./components/Tournament/FormTournament.jsx";
import  LogIn  from "./components/LogIn/LogIn.jsx";
import {FormUserRegister} from "./components/FormUser copy/FormUserRegister.jsx"
import ControlPanel from "./controlPanel/ControlPanel.jsx";

function App() {
  return (
    <div className="App">
      <Route path={"/"} component={NavBar} />
      <Route exact path={"/Users"} component={Users} />
      <Route exact path={"/HomeAdmin"} component={HomeAdmin} />
      <Route exact path={"/"} component={LandingPage} />
      <Route exact path={"/Users/:userId"} component={DetailsUser} />
      <Route exact path={"/CreateScore/:userId"} component={FormScore} />
      <Route exact path={"/sponsor"} component={FormSponsor}/>
      <Route exact path={"/CreateUsers"} component={FormUser}/>
      <Route exact path={"/tournament"} component={FormTournament} />
      <Route exact path={"/login"} component={LogIn} />
      <Route exact path={"/cpanel"} component={ControlPanel}/>
      <Route exact path={"/SignIn"} component={FormUserRegister}/>
    </div>
  );
}

export default App;
