import React from 'react';
import {Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend,} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import './chartbar.css'
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function ChartBar({orderData}) {
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position:'bottom',
          },
        },
        scales: {
          y: {
            title: {
              display: true,
              text: 'Quantity',
              font: {
                size: 14,
                weight: 'bold'
              }
            }
          },
          x: {
            title: {
              display: true,
              text: 'products',
              font: {
                size: 14,
                weight: 'bold'
              },
            }
          }
        }
      };
      
      const labels = orderData.map((item)=>(item.productName))
      
      const data = {
        labels,
        datasets: [
          {
            label: 'quantity',
            data: orderData.map((item)=>(item.totalOrderCount)),
            backgroundColor: 'hsla(23, 100%, 66%, 0.87)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 0,
            borderRadius:0,
            hoverBackgroundColor:'rgba(255, 126, 40, 0.979)'
          },
        ],
       
      };
      
  return (
    <>
    <div className='chart-bar'>
      <h3 className='chart-h3'>Order statistics</h3>
     <Bar height={450} width={1000} options={options} data={data} />
    </div>
    </>
  )
}

export default ChartBar