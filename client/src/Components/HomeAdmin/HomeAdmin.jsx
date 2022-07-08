<<<<<<< HEAD
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllPlayers } from "../../redux/actions";
import Card from "react-bootstrap/Card";
import { Row, Col } from "react-bootstrap";

function HomeAdmin() {
  const players = useSelector((state) => state.players);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPlayers());
  }, [dispatch]);
=======
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllUsers } from '../../redux/actions';


function HomeAdmin() {

  const users = useSelector((state) => state.users)

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers())
  }, [dispatch])
>>>>>>> 10c522f9e31b4a6a1c95fc50e7c8afd32399d546

  return (
    <div className="App">
      <h3 className="text-lg-start fs-4 mx-4 my-3 text-secondary ">HOME ADMINISTRATOR</h3>

      <button type="button" className="btn btn-outline-secondary  my-2 mx-4">
        <Link to={"/Players"}>Players</Link>
      </button>
      <button type="button" className="btn btn-outline-primary my-2 mx-2">
        Create Tournament
      </button>
      <button type="button" className="btn btn-outline-primary my-2 mx-2">
        Create Sub-Tournament
      </button>

<<<<<<< HEAD
      {players.map((p) => {
        return (
          <div className="container my-4">
            <div className="row">
              {p.is_admin && (
                <div className="col-xs-3">
                  <img
                    className="rounded float-start img-thumbnail mx-2"
                    src={"https://picsum.photos/200"}
                    alt="pictureAdm"
                  />
                  <div class="shadow-lg p-3 mb-3 bg-body rounded my-4 mx-5 px-1">
                    <h3 key={p.dni} className="card-title text-green mb-3">
                      {" "}
                      Name:{p.name}
                    </h3>
                    <h3 className="card-subtitle mb-3 text-muted mx-2">
                      {" "}
                      Last Name:{p.last_name}
                    </h3>
                    <h3 className="card-subtitle mb-2 text-muted mx-3">
                      e_mail: {p.e_mail}
                    </h3>
                    <h3 className="card-subtitle mb-2 text-muted mx-auto">
                      Phone: {p.phone}
                    </h3>
                  </div>
=======
      <button><Link to={'/Users'}>Users</Link></button>
      <button>Create Tournament</button>
      <button>Create Sub-Tournament</button>
      {
        users.map((p) => {
          return (
            <div>
              {p.is_admin &&
                <div>
                  <img src={p.picture} alt="pictureAdm"/>
                  <h3 key={p.dni}> {p.name}</h3>
                  <h3>{p.last_name}</h3>
                  <h3>{p.e_mail}</h3>
                  <h3>{p.phone}</h3>
>>>>>>> 10c522f9e31b4a6a1c95fc50e7c8afd32399d546
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default HomeAdmin;
