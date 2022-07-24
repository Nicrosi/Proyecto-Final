import React from "react";
import {  Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart }            from 'react-chartjs-2'


export const DoughnutChart = ({ dataUser }) => {

  //dataUser ={organizer earnings: 30,tennis courts: 50,awards:20}
  const names = Object.keys(dataUser).filter((e) => e !== "id_score");
  const percentages = Object.values(dataUser);

  const state = {
    labels: names,
    datasets: [
      {
        label: 'Earnings',
        data: percentages,
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
        ],
        hoverOffset: 4
      }]
    };
  return (
    <div   style={{ width:"80%", justifyContent:"center", alignSelf: "center", marginLeft:"10%"}}>
       <Doughnut
          data={state}
          options={{
            title:{
              display:true,
              text:'Doughnut',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right',
              align: 'center',
              position:'center',
              labels:{
                font: {
                    size: 25
                }
            }
            }
          }}
 
        />
    </div>
  );
};
