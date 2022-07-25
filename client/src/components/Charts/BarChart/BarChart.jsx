import React from "react";
import {  Bar } from "react-chartjs-2";
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart }            from 'react-chartjs-2'


export const BarChart = ({ dataUser }) => {

  //dataUser ={organizer earnings: 30,tennis courts: 50,awards:20}
  const subTournaments = Object.keys(dataUser).filter((e) => e !== "id_score");
  const inscriptions = Object.values(dataUser);

  const state = {
    labels: subTournaments,
    datasets: [
      {
        label: 'Subtournament-Inscriptions',
        data: inscriptions,
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)'
          ],
          borderWidth: 1
        }]
      };
  return (
    <div   style={{ width:"100%", justifyContent:"center", alignSelf: "center"}}>
       <Bar
          data={state}
          options={{
            title:{
              display:true,
              text:'Bar',
              fontSize:20
            },
            legend:{
              display:true,
              position:'bottom',
              align: 'end',
                labels:{
                    font: {
                        size: 25
                    }
                }

            },
            layout:{
                padding:0,
            }
          }}
 
        />
    </div>
  );
};
