import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { postInscription, getPLayersOnSubt } from "../../../redux/actions";
import { Link } from "react-router-dom";
import Stripecheckout from "react-stripe-checkout";
import Card from "react-bootstrap/Card";
import styles from "../SubtCard/SubtCard.module.css";
import {
  getInscriptions,
  getPLayersOnSubt,
  postInscription,
} from "../../../redux/actions";
import axios from "axios";

export default function AllSubtCard({
  id_subt,
  name,
  price,
  id_tournament,
  id_user,
  email,
  subt_gender,
  subt_category,
  match_type,
  el_type,
  numb_players,
  inscriptions,
  initialized,
}) {
  const user = id_user;
  const auth = useSelector((state) => state.auth);
  const Allinscriptions = useSelector(
    (state) => state.rootReducer.inscriptions
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPLayersOnSubt(Number(id_subt)));
    dispatch(getInscriptions());
  }, [dispatch, id_subt]);
  // eslint-disable-next-line no-unused-vars
  const [product, setProduct] = useState({
    name: name,
    price: price,
    email: email,
    gender: subt_gender,
    category: subt_category,
    id_tournament: id_tournament,
    id_subt: id_subt,
  });


  return (
    <React.Fragment>
      <Card className={`${styles.cardBox} bg-dark`} key={id_subt}>
        <Card.Header className={styles.headerBox}>
          <h5 className={styles.title}>{product.name}</h5>
        </Card.Header>
        <Card.Body className={styles.bodyBox}>
          <div className="col">
            <div className={styles.matchType}>Match Type: {match_type}</div>
            <div className={styles.EliminationType}>
              Elimination Type: {el_type}
            </div>
            <div className={styles.category_gender}>
              <div>Category: {product.category.type}</div>
              <div>Gender: {product.gender}</div>
            </div>
          </div>
          <div className={styles.price}>
            <h1 className={styles.priceNumber}>US$ {product.price}</h1>
          </div>
        </Card.Body>
        <Card.Footer>
          <div className="d-flex justify-content-end">
            
                {initialized ? (
                  <Link
                    style={{ fontWeight: "bold", color: "#10242b" }}
                    to={`/bracket/${id_subt}`}
                  >
                    <button
                      className="btn"
                      style={{ backgroundColor: "#A7D129" }}
                    >
                      View
                    </button>
                  </Link>
                ) : (
                    <button className="btn" style={{ backgroundColor: "#82a222" }} disabled>
                    Not initialized
                  </button>
                )}
           
          </div>
        </Card.Footer>
      </Card>
    </React.Fragment>
  );
}
