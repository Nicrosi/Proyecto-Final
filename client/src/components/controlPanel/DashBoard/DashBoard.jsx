import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { GiMoneyStack, GiTakeMyMoney } from "react-icons/gi";
import { IoPeople, IoClipboard } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsers,
  getGestion,
  getInscriptions,
  getSubtournament,
  putGestion,
} from "../../../redux/actions";
import { BarChart } from "../../Charts/BarChart/BarChart";
import { DoughnutChart } from "../../Charts/DonutChart/DoughnutChart";
import banner from "../../../img/GestionBanner.PNG"
import Swal from "sweetalert2";



export const DashBoard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getInscriptions());
    dispatch(getAllUsers());
    dispatch(getSubtournament(1));
    dispatch(getGestion(1));
  }, [dispatch]);

  let gestion = useSelector((state) => state.rootReducer.gestion);
  let inscriptions = useSelector((state) => state.rootReducer.inscriptions);
  let users = useSelector((state) => state.rootReducer.users);
  let subtournament = useSelector((state) => state.rootReducer.filteredSubt);
  const earnings = inscriptions
    .map((item) => item.amount)
    .reduce((prev, curr) => prev + curr, 0);
  const [doughnutData, setDoughnutData] = useState(gestion);

  let netEarnings = (
    (earnings / 100) *
    doughnutData.organizer_earnings
  ).toFixed(2);

  let barData = {};

  subtournament.map((subt) => {
    const name = subt.name;
    const cantPlayers = inscriptions.filter(
      (i) => i.subtournament.id_subt === subt.id_subt
    ).length;
    barData = { ...barData, [name]: cantPlayers };
  });

  function handleOnChange(e) {
    setDoughnutData({
      ...doughnutData,
      [e.target.name]: e.target.value,
    });
  }

  function handleOnClick(e) {
    dispatch(putGestion(1, doughnutData));
    Swal.fire({
      title: 'Success',
      text: "Gestion Saved",
      icon: 'success',
      showCancelButton: false,
      showConfirmButton: true,
      confirmButtonColor: '#A7D129',
      cancelButtonColor: '#A7D129',
      confirmButtonText: ' Okey '
    })
  }

  function handleOnClickRefresh(e) {
    setDoughnutData(gestion);
  }

  let circleClasses = {
    background: "#E9EFC0",
    padding: "20px",
    borderRadius: "50%",
  };
  let iconStyles = { color: "#4E944F", fontSize: "2em" };

  return (
    <div className="container-fluid ">
      <div>
        <div className="row text-dark  align-items-center justify-content-around">
      
              <img src={banner} className=" col-sm-12  "  alt="businessImg" style={{width:"80%", height: "215px"}}/>
       
          <div className="row  justify-content-around  mb-3">
            <div className=" d-flex flex-column col-sm-3 align-items-center p-2  ">
              <span style={circleClasses}>
                <IoPeople style={iconStyles} />
              </span>
              <h3>{users.length}</h3>
              <h4>Users</h4>
            </div>
            <div className=" d-flex flex-column col-sm-3 align-items-center p-2  ">
              <span style={circleClasses}>
                <IoClipboard style={iconStyles} />
              </span>
              <h3>{inscriptions.length}</h3>
              <h4>Inscriptions</h4>
            </div>
            <div className=" d-flex flex-column col-sm-3 align-items-center p-2  ">
              <span style={circleClasses}>
                <GiMoneyStack style={iconStyles} />
              </span>
              <h3>${earnings}</h3>
              <h4>Earnings</h4>
            </div>
            <div className=" d-flex flex-column col-sm-3 align-items-center p-2 ">
              <span style={circleClasses}>
                <GiTakeMyMoney style={iconStyles} />
              </span>
              <h3>${netEarnings}</h3>
              <h4>Net Earnings</h4>
            </div>
          </div>
        </div>
        <div className="row justify-content-around ">
          <div className="col-sm-5 p-2 text-dark border rounded-4 border-dark shadow text-center">
            <h4>Inscriptions by Subtournament</h4>
            <BarChart dataUser={barData} />
          </div>
          <div className="col-sm-4 p-2 text-dark border rounded-4 border-dark shadow text-center">
            <h4>Gestion</h4>
            <DoughnutChart dataUser={doughnutData} />
          </div>
          <div className="col-sm-2  text-dark border p-4 rounded-4 border-dark shadow ">
            <h4>Gestion Menu</h4>
            <label htmlFor="organizer_earnings" className="form-label">
              Organizer
            </label>
            <input
              type="range"
              step="1"
              min="0"
              max={100 - doughnutData.tennis_courts - doughnutData.awards}
              key="organizer_earnings"
              name="organizer_earnings"
              className="custom-range"
              id="organizer_earnings"
              value={doughnutData.organizer_earnings}
              onChange={(e) => handleOnChange(e)}
            />
            <p>{doughnutData.organizer_earnings}%</p>
            <label htmlFor="tennis_courts" className="form-label">
              Tennis Courts
            </label>
            <input
              type="range"
              step="1"
              min="0"
              max={100 - doughnutData.organizer_earnings - doughnutData.awards}
              key="tennis_courts"
              name="tennis_courts"
              className="custom-range"
              id="tennis_courts"
              value={doughnutData.tennis_courts}
              onChange={(e) => handleOnChange(e)}
            />
            <p>{doughnutData.tennis_courts}%</p>
            <label htmlFor="awards" className="form-label">
              Awards
            </label>
            <input
              type="range"
              step="1"
              min="0"
              max={
                100 -
                doughnutData.organizer_earnings -
                doughnutData.tennis_courts
              }
              name="awards"
              key="awards"
              value={doughnutData.awards}
              className="custom-range"
              id="awards"
              onChange={(e) => handleOnChange(e)}
            />
            <p>{doughnutData.awards}%</p>
            <button
              type="button"
              className="btn btn-primary mx-2"
              onClick={(e) => handleOnClick(e)}
            >
              Save
            </button>
            <button
              type="button"
              className="btn btn-primary mx-2"
              onClick={(e) => handleOnClickRefresh(e)}
            >
              Refresh
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
