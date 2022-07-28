import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../redux/actions";
import { Row, Col } from "react-bootstrap";
import Filter from "../Filter/Filter";
import { UserCard } from "../UserCard/UserCard";
import Navigator from "../Navigator/Navigator";
import DetailsUser from "../DetailsUser/DetailsUser";

export const Users = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [dataModal, setDataModal] = useState({});
  const users = useSelector((state) => state.rootReducer.filteredUsers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <div
      style={{ paddingTop: "56px", minHeight: "100vh" }}
      className="d-flex flex-sm-column flex-column flex-lg-row flex-md-row"
    >
      <Filter setCurrentPage={setCurrentPage} />
      <div style={{ width: "100%" }}>
        <Row className="g-3 mx-3 mt-2">
          {users.length > 0 ? (
            users.slice(12 * currentPage, 12 * currentPage + 12).map((user) => {
              return (
                <Col lg={4} md={6} sm={12} key={user.dni}>
                  <UserCard
                    user={user}
                    setDataModal={setDataModal}
                  />
                                  <div
                  className="modal fade"
                  id="staticBackdrop"
                  data-bs-backdrop="static"
                  data-bs-keyboard="false"
                  tabIndex="-1"
                  aria-labelledby="staticBackdropLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-centered modal-xl">
                    <div
                      className="modal-content"
                      style={{ backgroundColor: "rgb(43, 43, 44)" }}
                    >
                      <div className="modal-header">
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      (
                      <div>
                      <DetailsUser dataModal={dataModal} />
                      </div>
                      )
                    </div>
                  </div>
                </div>
                </Col>
                
              );
            })
          ) : (
            <h1 style={{ textAlign: "center" }}>No users found</h1>
          )}
        </Row>
        <Navigator currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </div>
    </div>
  );
};
