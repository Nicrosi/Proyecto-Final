import React from "react";
import {  Radar } from "react-chartjs-2";
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart }            from 'react-chartjs-2'


export const RadarChart = ({ dataUser }) => {
  const names = Object.keys(dataUser).filter((e) => e !== "id_score");
  const scores = Object.values(dataUser).slice(1, dataUser.length);
    console.log(names + "    " + scores)
  const state = {
    labels: names,
    datasets: [
      {
        label: 'User',
        data: scores,
        fill: true,
    backgroundColor: 'rgba(167, 209, 41, 0.2)',
    borderColor: 'rgb(97, 111, 57)',
    pointBackgroundColor: 'rgb(62, 67, 46)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgb(255, 99, 132)'
        
      },
    ],
  };
  return (
    <div   style={{ width:"40vw"}}>
       <Radar
          data={state}
          options={{
            title:{
              display:true,
              text:'Radar',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
 
        />
    </div>
  );
};
