import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getSubtournament } from "../../redux/actions/index.js";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import SwiperCore, { Pagination } from "swiper/core";

// import { Row, Col } from "react-bootstrap";
import SubtCard from "./SubtCard/SubtCard.jsx";
import styles from "./Inscription.module.css";
import arrowLeft from "../../img/left-arrow.png";
import arrowRight from "../../img/right-arrow.png";
import Swal from "sweetalert2";


SwiperCore.use([Pagination]);

export const Inscription = () => {
  const subt = useSelector((state) => state.rootReducer.filteredSubt);
  const user = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();
  const { tournament_id } = useParams();
  const history = useHistory();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getSubtournament(tournament_id));
    if (!user.id_category && auth.currentUser.is_admin === false) {
      Swal.fire({
        title: 'Success',
        text: `The user ${user.name} has no score to categorize`,
        icon: 'success',
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonColor: '#A7D129',
        cancelButtonColor: '#A7D129',
        confirmButtonText: ' Okey '
      }).then((result) => {
        history.push("/HomeAdmin");
      })
    }
  }, [
    auth.currentUser.is_admin,
    dispatch,
    history,
    tournament_id,
    user.id_category,
    user.name,
  ]);

  const swiperRef = useRef(null);
  const goNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };
  const goPrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  return (
    <>
      <div className={styles.containerBox}>
        <div className={styles.textBox}>        
          <h1 className={styles.title}>Hello, {user.name}!</h1>
          <div className={styles.subtitle}>
            {auth.loggedIn && auth.currentUser.is_admin === false ? (
              <>
                <h5 className={styles.subtitle}>
                  These are the tournaments according to your category and gender.
                </h5>
                <h5 className={styles.subtitle}>
                  Which subtournaments do you want to register for?
                </h5>
              </>
            ) : (
              <>
                <h5 className={styles.subtitleAdmin}>
                  These are all the subtournaments created.
                </h5>
              </>
            )}

          </div>
        </div>
        <div className={styles.principalBox}>
          {/* <div className={styles.parent}> */}
          <Swiper
            ref={swiperRef}
            grabCursor={true}
            className="mySwiper"
            spaceBetween={10}
            // loop={true}
            pagination={{
              dynamicBullets: true,
              clickable: true,
              type: "bullets",
              color: "#A7D129",
            }}
            breakpoints={{
              1024: {
                slidesPerView: 3,
                width: 950,
              },
              768: {
                slidesPerView: 2,
                width: 950,
              },
              640: {
                slidesPerView: 1,
                width: 950,
              },
            }}
          >
            {subt.length > 0 ? (
              subt.map((p) => {
                let option;
                auth.loggedIn && auth.currentUser.is_admin === false
                  ? (option =
                    user.gender === p.gender &&
                    user.id_category === p.category.id_category)
                  : (option = user);
                  console.log(option)
                return option ? (
                  <SwiperSlide key={p.id_subt}>
                    <SubtCard
                      name={p.name}
                      id_tournament={tournament_id}
                      price={p.price}
                      subt_gender={p.gender}
                      subt_category={p.category}
                      id_user={user.id_user}
                      email={user.e_mail}
                      id_subt={p.id_subt}
                      el_type={p.elimination_type}
                      match_type={p.match_type}
                      numb_players={p.numb_players}
                      inscriptions={p.inscriptions}
                      initialized={p.initialized}
                    />
                  </SwiperSlide>
                ) : null;
              })
            ) : (
              <h1 style={{ textAlign: "center" }}>No subtournament found</h1>
            )}
          </Swiper>
          {
            subt.length !== 1 && (
              <>
              <img
                src={arrowLeft}
                alt="buttonLeft"
                className={styles.buttonLeft}
                type="button"
                onClick={goPrev}
              />
              <img
                src={arrowRight}
                alt="buttonRight"
                className={styles.buttonRight}
                type="button"
                onClick={goNext}
              />
            </>
            )
          }

        </div>
        {/* <div className={{ width: "100%" }}>
    <Row className="g-3 mx-3 mt-2">
     {subt.length > 0 ? (
            subt.map((p) => {
              let option;
              auth.loggedIn && auth.currentUser.is_admin === false ? option = user.gender === p.gender && user.id_category === p.category.id_category : option = user
              return (
               option ?
                <Col lg={3} key={p.id_subt}>
                  <SubtCard
                    key={p.id_subt}
                    name={p.name}
                    id_tournament={tournament_id}
                    price={p.price}
                    subt_gender = {p.gender}
                    subt_category = {p.category}
                    id_user={user.id_user}
                    email={user.e_mail}
                    id_subt={p.id_subt}
                    el_type={p.elimination_type}
                    match_type={p.match_type}
                    numb_players={p.numb_players}
                  />
                </Col>:null
              );
            })
          ) : (
            <h1 style={{ textAlign: "center" }}>No sub tournament found</h1>
          )}
          </Row>
          </div> */}
      </div>
    </>
  );
};
