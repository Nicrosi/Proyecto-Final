import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../redux/actions";
import { Row, Col } from "react-bootstrap";
import Filter from "../Filter/Filter";
import { UserCard } from "../UserCard/UserCard";
import Navigator from "../Navigator/Navigator";

export const Users = () => {
  const [currentPage, setCurrentPage] = useState(0);
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
            users.slice(11 * currentPage, 11 * currentPage + 11).map((p) => {
              return (
                <Col lg={4} md={6} sm={12} key={p.dni}>
                  <UserCard
                    key={p.dni}
                    dni={p.dni}
                    name={p.name}
                    last_name={p.last_name}
                    picture={p.picture}
                    gender={p.gender}
                    category={p.category}
                  />
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
