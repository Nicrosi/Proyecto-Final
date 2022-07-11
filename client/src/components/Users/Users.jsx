import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../redux/actions";
import Filter from "../Filter/Filter";
import SearchBar from "../SearchBar/SearchBar";
import { UserCard } from "../UserCard/UserCard";

export const Users = () => {
  const users = useSelector((state) => state.filteredUsers);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  console.log(users);
  return (
    <div style={{ marginTop: "48px" }}>
      <SearchBar />
      <Filter />
      <div className="row">
        {users.length > 0 ? (
          users.map((p) => {
            return (
              <div key={p.dni} className="col-sm-3">
                <UserCard
                  dni={p.dni}
                  name={p.name}
                  last_name={p.last_name}
                  picture={p.picture}
                  gender={p.gender}
                  category={p.category}
                />
              </div>
            );
          })
        ) : (
          <h1 style={{ textAlign: "center" }}>No users found</h1>
        )}
      </div>
    </div>
  );
};
