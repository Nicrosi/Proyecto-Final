import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../redux/actions";
import styles from "./ProfileUser.module.css"
import PersonalInfoUser from "./PersonalInfoUser";
import CategoryScoreUser from "./CategoryScoreUser";
import { Link } from "react-router-dom";

export default function ProfileUser(props) {
    const params = Number(props.match.params.userId);
    const dispatch = useDispatch();
    const [show, setShow] = useState("personalInformation");

    useEffect(() => {
        dispatch(getUserById(params));
    }, [dispatch, params]);

    let user = useSelector((state) => state.user);

    function handleClic(e){
      setShow(e.target.name)
    };

    return (
        <React.Fragment>   
              {user && (
                <div className={styles.containerBox}>
                    <div className={styles.PanelBox}>
                        <img src={user.picture}className={styles.pictureUser} alt="..." />
                        <h1 className={styles.nameUser}>{user.name + " " + user.last_name}</h1>
                        <Link to={"/CreateUsers"}>
                          <button type="button" className="btn btn-outline-secondary btn-dark my-2" style={{ width: "150px" }}>Edit Profil</button>
                        </Link>
                    </div>
                    <div className={styles.principalBox}>
                      <div className={styles.navBar}>
                        <input type="submit" name="personalInformation" onClick={(e) => handleClic(e)} className={styles.navBarItems} value="Personal Information"/>
                          <input type="submit" name="category" onClick={(e) => handleClic(e)} className={styles.navBarItems} value="Category"/>
                      </div>
                      {show === "personalInformation" && <PersonalInfoUser user={user} />}
                      {show === "category" && <CategoryScoreUser user={user} params={params} />}                 
                    </div>
                </div>
            )}
        </React.Fragment>
    )
}
  