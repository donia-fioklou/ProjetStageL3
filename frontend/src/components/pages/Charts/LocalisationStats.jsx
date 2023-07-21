import React, { useState, useEffect } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';


import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);



const LocalisationChart = () => {
  const [chart, setChart] = useState([])
  var baseUrl = "http://127.0.0.1:8000/api/localisation-stats/";
  //var proxyUrl = "https://cors-anywhere.herokuapp.com/";
  //var apiKey = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";



  useEffect(() => {
    const fetchLocalisationStats = async () => {
      await fetch(`${baseUrl}`, {
        method: 'GET',
      })
      .then((response) => response.json())
      .then((data) => {
        setChart(data[0]);
      });
    };
    fetchLocalisationStats()
  }, [baseUrl])

  console.log("chart", chart);
  var data = {
    labels: ['remplis', 'non remplis'],
    datasets: [{
      label: [],
      data: [chart?.filled_count, chart?.not_filled_count],
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
                        <h3 className="card-label">Taux de remplissage des localisations</h3>
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

export default LocalisationChart