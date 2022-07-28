import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { postInscription, getPLayersOnSubt } from "../../../redux/actions";
import { Link } from "react-router-dom";
import Stripecheckout from "react-stripe-checkout";
import Card from "react-bootstrap/Card";
import styles from "./SubtCard.module.css";
import {
  getBracket,
  getInscriptions,
  getPLayersOnSubt,
  postInscription,
} from "../../../redux/actions";
import axios from "axios";

export default function SubtCard({
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
  const makePayment = (token) => {
    const body = {
      token,
      user,
      product,
    };
    dispatch(postInscription(body));
  };
  const handleClick = async () => {
    try {
      await axios.post(`http://localhost:3001/rounds/firstround/${id_subt}`);
      window.open(`http://localhost:3000/bracket/${id_subt}`, "_self")
    } catch (error) {
      console.log(error);
    }
  };

  const isPayed = () => {
    const userInscrip = inscriptions.find(
      (inscrip) => inscrip.id_user === auth.currentUser.id_user
    );
    if (userInscrip && userInscrip.is_payed) {
      return true;
    } else return false;
  };
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
            {auth.loggedIn && auth.currentUser.is_admin === false ? (
              <>
                {isPayed() ? (
                <>
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
                  <button style={{ backgroundColor: "#82a222" }} disabled>
                    Is payed
                  </button>
                )}
              </>
                ) : (
                  <Stripecheckout
                    stripeKey="pk_test_51LLBogC5JnQCZsvqgXxqWC00Ui3tQXiMSljwFGFv28WhZ69g54hmBGjb9XKE1mjZTsipyzW49f7CQ8G1qS6lWL9H00MY1ocH5Z"
                    token={makePayment}
                    name={`Buy ${product.name}`}
                    amount={product.price * 100}
                    email={product.email}
                  >
                    <button
                      className="btn"
                      style={{ backgroundColor: "#A7D129" }}
                    >
                      Register
                    </button>
                  </Stripecheckout>
                )}
              </>
            ) : inscriptions.length === numb_players ? (
              <>
                {!initialized ? (
                  <button
                    style={{ backgroundColor: "#A7D129" }}
                    onClick={handleClick}
                  >
                    {/* <Link
                      style={{ fontWeight: "bold", color: "#10242b" }}
                      to={`/bracket/${id_subt}`}
                    > */}
                      Create Brackets
                    {/* </Link> */}
                  </button>
                ) : (
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
                )}
              </>
            ) : (
              <button style={{ backgroundColor: "#82a222" }} disabled>
                Not enough players
              </button>
            )}
          </div>
        </Card.Footer>
      </Card>
    </React.Fragment>
  );
}
