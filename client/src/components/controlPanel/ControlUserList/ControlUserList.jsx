import React from "react";
import { getAllUsers} from "../../../redux/actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ControlCardUsers from "../ControlCardUsers/ControlCardUsers";
import styles from "./ControlUserList.module.css"


export default function ControlUserList() {
  const users = useSelector((state) => state.rootReducer.users);
  console.log(users);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <div className={styles.userBox}>
      {users &&
        users.map((p) => {
          return (
              <ControlCardUsers 
                dni={p.dni}
                name={p.name}
                last_name={p.last_name}
                is_admin={p.is_admin}
                e_mail={p.e_mail}
                password={p.password}
                picture={p.picture}
                gender={p.gender}
                phone={p.phone}
                num_contact={p.num_contact}
              />
          )})}
    </div>
  );
}
