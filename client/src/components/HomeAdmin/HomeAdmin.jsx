import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllUsers } from "../../redux/actions";

function HomeAdmin() {
  const users = useSelector((state) => state.users);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <div
      className="mx-auto hstack justify-content-center"
      style={{ width: "100%", minHeight: "100vh" }}
    >
      <div
        className="mx-5 hstack justify-content-around"
        style={{ width: "20%" }}
      >
        <div className="col-md-4 align-self-center vstack">
          <h3 className="text-lg-start fs-4 mx-4 my-3 text-secondary ">
            HOME ADMINISTRATOR
          </h3>

          <Link to={"/Users"}>
            <button
              type="button"
              className="btn btn-outline-secondary btn-dark my-2 mx-2 px-5 "
              style={{ width: "270px" }}
            >
              Users
            </button>
          </Link>
          <Link to={"/CreateUsers"}>
            <button
              type="button"
              className="btn btn-outline-secondary btn-dark my-2 mx-2 px-5 "
              style={{ width: "270px" }}
            >
              User registration
            </button>
          </Link>
          <Link to={"/tournament"}>
          <button
            type="button"
            className="btn btn-outline-secondary btn-dark my-2 mx-2 px-5 "
            style={{ width: "270px" }}
           
          >
            Create Tournament
          </button>
          </Link>
          <button
            type="button"
            className="btn btn-outline-secondary btn-dark my-2 mx-2 px-5 "
            style={{ width: "270px" }}
            disabled
          >
            Create Sub-Tournament
          </button>
       
          <Link to={"/sponsor"}>
            <button
              type="button"
              className="btn btn-outline-secondary btn-dark my-2 mx-2 px-5 "
              style={{ width: "270px" }}
            >
              Create New Sponsor
            </button>
          </Link>
        </div>
      </div>

      <div
        className="col-md-8 align-self-center vstack"
        style={{ width: "60%" }}
      >
        {users.map((p, i) => {
          return (
            <div className="container" key={i}>
              <div className="row">
                {p.is_admin && (
                  <div className="col-xs-3">
                    <img
                      className="rounded float-start img-thumbnail mx-2"
                      src={p.picture}
                      alt="pictureAdm"
                    />
                    <div className="shadow-lg p-3 mb-3 bg-body rounded my-4 mx-5 px-1">
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
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HomeAdmin;
