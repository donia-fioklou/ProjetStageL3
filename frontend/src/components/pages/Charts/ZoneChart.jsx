import React, { useState, useEffect } from 'react'
import {
  Chart as ChartJS,

  BarElement,

} from 'chart.js';

import { Bar } from 'react-chartjs-2';

ChartJS.register(
  BarElement,
);


const ZoneChart = () => {
  const [chart, setChart] = useState({})
  var baseUrl = "http://127.0.0.1:8000/api/zone-stats/";
  


  useEffect(() => {
    const fetchZoneData = async () => {
      await fetch(`${baseUrl}`, {
        method: 'GET',
      })
      .then((response) => response.json())
      .then((data) => {
        setChart(data[0]);
      });
    };
    fetchZoneData()
  }, [baseUrl])

  console.log("chart", chart);
  var data = {
    labels: Object.keys(chart),
    datasets: [{
      label: ``,
      data: Object.values(chart),
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
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
                        <h3 className="card-label">Répartition par zone des producteurs</h3>
                    </div>
                </div>
                <div className="card-body">
                <Bar
                    data={data}
                    height={400}
                    options={options}

                />
                </div>
            </div>
        </div>
    
  )
}

export default ZoneChart