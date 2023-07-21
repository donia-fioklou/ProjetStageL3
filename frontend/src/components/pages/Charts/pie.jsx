import React, { useState, useEffect } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';


import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);



const PieChart = () => {
  const [chart, setChart] = useState([])
  var baseUrl = "http://192.168.1.142:8000/api/gender-stats/";
  //var proxyUrl = "https://cors-anywhere.herokuapp.com/";
  //var apiKey = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";



  useEffect(() => {
    const fetchGenderStats = async () => {
      await fetch(`${baseUrl}`, {
        method: 'GET',
        // headers: {
        //   'Content-Type': 'application/json',
        //   //'x-access-token': `${apiKey}`,
        //   'Access-Control-Allow-Origin': "*"
        // }
      })
      .then((response) => response.json())
      .then((data) => {
        // Assuming the API returns the number of producers as 'numberOfProducers' field
        
        setChart(data[0]);
      });
    };
    fetchGenderStats()
  }, [baseUrl])

  console.log("chart", chart);
  var data = {
    labels: ['Femme', 'Homme'],
    datasets: [{
      label: [],
      data: [chart?.F, chart?.M],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
      
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        
      ],
      borderWidth: 1
    }]
  };

  var options = {
    maintainAspectRatio: false,
    scales: {
    },
    legend: {
      labels: {
        fontSize: 25,
      },
    },
  }

  return (
    <div className="col-lg-4">
            <div className="card card-custom gutter-b">
                <div className="card-header h-auto">
                    <div className="card-title py-5">
                        <h3 className="card-label">Donut Chart</h3>
                    </div>
                </div>
                <div className="card-body">
                <Pie
                  data={data}
                  height={400}
                  options={options}

                />
                </div>
            </div>
        </div>
    
      
    
  )
}

export default PieChart