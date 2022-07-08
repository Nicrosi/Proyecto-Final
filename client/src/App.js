
import React from 'react';
import { Route} from 'react-router-dom';
import DetailsUser from './components/DetailsUser/DetailsUser.jsx';
import HomeAdmin from './components/HomeAdmin/HomeAdmin.jsx';
import NavBar from './components/NavBar/NavBar';
import { Users } from './components/Users/Users.jsx';


function App() {

  return (
   
    <div className="App">
      {/* <Route exact path={"/"} component={LandingPage} /> */}
      <Route path={"/"} component={NavBar} />
      <Route exact path={"/Users"} component={Users} />
      <Route exact path={"/HomeAdmin"} component={HomeAdmin}/>
      <Route exact path={"/Users/:userId"} component={DetailsUser} />
    </div>
  );
}

export default App;
