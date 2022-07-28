import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import DetailsUser from "./components/DetailsUser/DetailsUser.jsx";
import LandingPage from "./components/LandingPage/LandingPage.jsx";
import HomeAdmin from "./components/HomeAdmin/HomeAdmin.jsx";
import NavBar from "./components/NavBar/NavBar";
import { Inscription } from "./components/Inscription/Inscription.jsx";
import { Users } from "./components/Users/Users.jsx";
import { FormScore } from "./components/FormScore/FormScore.jsx";
import { FormSponsor } from "./components/FormSponsor/FormSponsor.jsx";
import { FormTournament } from "./components/Tournament/FormTournament/FormTournament.jsx";
import LogIn from "./components/LogIn/LogIn.jsx";
import { FormUserRegister } from "./components/FormUserRegister/FormUserRegister.jsx";
import ControlPanel from "./components/controlPanel/ControlPanel/ControlPanel.jsx";
import ProfileUser from "./components/Profile/ProfileUser/ProfileUser.jsx";
import RouteGuard from "./components/RouteGuard/RouteGuard.js";
import CreateGallery from "./components/Gallery/CreateGallery/CreateGallery.jsx";
import { loginGoogle, verifyUser } from "./redux/actions/authorization.js";
import { useDispatch } from "react-redux";
import { FormSubTournament } from "./components/SubTournament/FormSubTournament/FormSubTournament.jsx";
import TournamentsToShow from "./components/Tournament/TournamentsToShow/TournamentsToShow.jsx";
import ControlCardUsers from "./components/controlPanel/ControlCardUsers/ControlCardUsers.jsx";
import { ChatBot } from "./components/ChatBot/ChatBot.jsx";
import Brackets from "./components/Brackets/Brackets.jsx";
import { AllSubt } from "./components/Inscription/AllSubt/AllSubt.jsx";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loginGoogle());
    dispatch(verifyUser());
  }, [dispatch]);
  return (
    <div className="App">
      <Route path={"/"} component={ChatBot} />
      <Route path={"/"} component={NavBar} />
      <Switch>
        <Route path={"/bracket/:subt_id"} component={Brackets} />
        <RouteGuard exact path={"/Users"} component={Users} admin={false} />
        <RouteGuard
          exact
          path={"/HomeAdmin"}
          component={HomeAdmin}
          admin={true}
        />

        <Route exact path={"/"} component={LandingPage} />
        <Route exact path={"/Users/:userId"} component={DetailsUser} />
        <Route exact path={"/CreateScore/:userId"} component={FormScore} />
        <RouteGuard
          exact
          path={"/CreateSponsor"}
          component={FormSponsor}
          admin={true}
        />
        <RouteGuard
          exact
          path={"/CreateTournament"}
          component={FormTournament}
          admin={true}
        />
        <RouteGuard
          exact
          path={"/CreateSubtournament/:tournamentId"}
          component={FormSubTournament}
          admin={true}
        />
        <Route
          exact
          path={"/TournamentsToShow"}
          component={TournamentsToShow}
        />
        <Route
          exact
          path={"/inscription/:tournament_id"}
          component={Inscription}
        />
        <Route
          exact
          path={"/allSubt/:tournament_id"}
          component={AllSubt}
        />
        <Route exact path={"/login"} component={LogIn} />
        <RouteGuard
          Route
          path={"/cpanel"}
          component={ControlPanel}
          admin={true}
        />
        <Route path={"/edit/:userId"} component={ControlCardUsers} />
        <Route exact path={"/SignIn"} component={FormUserRegister} />
        <RouteGuard
          exact
          path={"/Profile/:userId"}
          component={ProfileUser}
          admin={false}
        />
        <Route exact path={"/Gallery"} component={CreateGallery} />
        <Route exact path={"/SignIn"} component={FormUserRegister} />
        <Route exact path={"/Profile/:userId"} component={ProfileUser} />
        <Route exact path={"/Gallery"} component={CreateGallery} />
        <Route exact path={"/cpanel"} component={ControlPanel} />
        <Route exact path={"/SignIn"} component={FormUserRegister} />
        <RouteGuard
          exact
          path={"/Profile/:userId"}
          component={ProfileUser}
          admin={false}
        />
      </Switch>
    </div>
  );
}

export default App;
