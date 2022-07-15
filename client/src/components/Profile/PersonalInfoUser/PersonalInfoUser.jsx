import React from "react";
import styles  from "./PersonalInfoUser.module.css"

export default function PersonalInfoUser ({user}) {
  return (
    <div className={styles.personalBox}>
    <ul className="list-group">
      <li className="list-group-item">
        <h5 className="card-text">Name: {user.name}</h5>
      </li>
      <li className="list-group-item">
        <h5 className="card-text">Last name: {user.last_name}</h5>
      </li>
      <li className="list-group-item">
        <h5 className="card-text">DNI: {user.dni}</h5>
      </li>
      <li className="list-group-item">
        <h5 className="card-text">Gender: {user.gender}</h5>
      </li>
      <li className="list-group-item">
        <h5 className="card-text">E-mail: {user.e_mail}</h5>
      </li>
      <li className="list-group-item">
        <h5 className="card-text">Phone: {user.phone}</h5>
      </li>
      <li className="list-group-item">
        <h5 className="card-text">
          Emergency contact: {user.num_contact}
        </h5>
      </li>
    </ul>
  </div>
  );
}
