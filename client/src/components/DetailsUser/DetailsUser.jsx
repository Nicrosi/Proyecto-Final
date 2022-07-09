import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../redux/actions";

const DetailsUser = (props) => {
  const params = props.match.params.userId;
  const dispatch = useDispatch();
  console.log(params);

  useEffect(() => {
    dispatch(
      //insertar aqui una action que traiga el detalle a mostrar desde el back --> action(params)
      //crear la action
      getAllUsers() //provisorio
    );
  }, [dispatch]);

  // crear estado user: {} en el initialState luego de que el back estÃ© creado
  // y crear reducer que modifique user del initialState
  let user = useSelector((state) => state.users); //luego cambiar por state.user
  user = user[params]; //provisorio


  return (
    <React.Fragment>
 {user && (
            <div className="mb-3 mt-5 mx-auto hstack justify-content-center" style={{width: "85%"}}>
              <div className="hstack justify-content-around"  style={{width: "100%"}}>
                <div className="col-md-4 vstack " style={{width: "40%"}}>
                <img src={user.picture} className="mx-auto rounded-circle" style={{width: "250px"}} alt="..." />
                            <h1 className="text-center">{user.name + " " + user.last_name}</h1> 
                </div>
                <div className="col-md-8" style={{width: "55%"}}>
                    <div className="accordion" id="accordionExample">
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingOne">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        Personal Information
                        </button>
                      </h2>
                      <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                        <div >
                    <ul className="list-group">
                      <li className="list-group-item"><h5 className="card-text">E-mail: {user.e_mail}</h5></li>
                      <li className="list-group-item"><h5 className="card-text">Gender: {user.gender}</h5></li>
                      <li className="list-group-item"><h5 className="card-text">Phone: {user.phone}</h5></li>
                      <li className="list-group-item"> <h5 className="card-text">Emergency contact: {user.num_contact}</h5></li>
                    </ul>
                    </div>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingTwo">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                          Category
                        </button>
                      </h2>
                      <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                        <div className="mx-auto" style={{width: "50%"}}>
                      <div className="card mx-auto" style={{width: "200px"}}>
                        <div className="card-body text-center">
                          {/* <h1 className="card-title">{user.category.type.toUpperCase()}</h1> */}
                          <button>Modify</button>
                        </div>
                      </div>
                    </div>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingThree">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                        Score
                        </button>
                      </h2>
                      <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                        <div >
                    {/* <ul className="list-group">
                      <li className="list-group-item"><h5>Previous Tournaments: {user.score.previous_tournaments}</h5></li>
                      <li className="list-group-item"><h5>Hit knowledge: {user.score.hit_knowledge}</h5></li>
                      <li className="list-group-item"><h5>Other strokes: {user.score.other_strokes}</h5></li>
                      <li className="list-group-item"><h5>Special hits: {user.score.special_hits}</h5></li>
                      <li className="list-group-item"><h5>Kick serve control: {user.score.kick_serve_control}</h5></li>
                      <li className="list-group-item"><h5>Game strategy: {user.score.game_strategy}</h5></li>
                    </ul> */}
                    </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
            </div>
            </div>

      )}
    </React.Fragment>
  );
};

export default DetailsUser;