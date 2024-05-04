import React, { useContext } from 'react';
import {Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend,} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import './chartbar.css'
import { ShopContext } from '../../Context/ShowContext';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function ChartBar({orderData}) {
  const {theme} = useContext(ShopContext)
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position:'bottom',
            labels: {
              padding: 10,
              color:theme==='dark-theme'?'#f3f3f3':''
            }
          },
        },
        scales: {
          y: {
            ticks: {
              color: theme==='dark-theme'?'#f3f3f3':'', 
              font: {
                size: 14, 
                weight: 'bold', 
                family: 'Arial', 
              }
            },
            title: {
              display: true,
              text: 'Quantity',
              color: theme === 'dark-theme' ? '#f3f3f3' : '',
              font: {
                size: 14,
                weight: 'bold',
                
              },              
            },
          max:10,

          },
          x: {
            ticks: {
              color: theme==='dark-theme'?'#f3f3f3':'', 
              font: {
                size: 14, 
                weight: 'bold', 
                family: 'Arial', 
              }
            },
            title: {
              display: true,
              text: 'products',
              font: {
                size: 14,
                weight: 'bold',
              },
              color:theme==='dark-theme'?'#f3f3f3':'',
              padding: {
                top: 20,
              },
            }
          },
        },
        
      };
      
      const labels = orderData.map((item)=>(item.productName))
      
      const data = {
        labels,
        datasets: [
          {
            label: 'quantity',
            data: orderData.map((item)=>(item.totalOrderCount)),
            backgroundColor: theme==='dark-theme'?'#f3f3f3':'hsla(23, 100%, 66%, 0.87)',
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
      <h3 className={theme==="dark-theme"?'chart-h3 dark':'chart-h3'}>Order statistics</h3>
     <Bar height={450} width={1000} options={options} data={data} />
    </div>
    </>
  )
}

export default ChartBar