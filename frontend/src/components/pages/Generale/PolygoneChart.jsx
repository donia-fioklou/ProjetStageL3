import React, { useState, useEffect } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { convertJsonToExcel } from './GenderChart';
import ClipLoader from 'react-spinners/ClipLoader';
ChartJS.register(ArcElement, Tooltip, Legend);





const PolygoneChart = ({ selectedZone, selectedCooperative }) => {
  const [chart, setChart] = useState([])
  var baseUrl = `http://127.0.0.1:8000/api/polygone-stats/?zone=${selectedZone}&union=${selectedCooperative}`;
  const [remplisData,setRemplisData]=useState([]);
  const [nonRemplisData,setNonRemplisData]=useState([]);
  const [loading,setLoading]=useState(true);

  function handleDownload() {
    // Récupérer la valeur sélectionnée du filtre
    const selectedFilter = document.getElementById('polygoneFilter').value;
  
    if (selectedFilter === 'remplis') {
      convertJsonToExcel(remplisData, "Polygone_remplis");
    } else if (selectedFilter === 'nonRemplis') {
      convertJsonToExcel(nonRemplisData, "polygone_non_remplis");
    } 
  }



  useEffect(() => {
    const fetchPolygoneStats = async () => {
      await fetch(`${baseUrl}`, {
        method: 'GET',
      })
      .then((response) => response.json())
      .then((data) => {
        setChart(data[0]);
        setRemplisData(data[0].productor_with_filled_count);
        setNonRemplisData(data[0].productor_with_not_filled_count);
      })
      .finally(() => {
          setLoading(false)
      }
      );
    };
    fetchPolygoneStats()
  }, [baseUrl])


  var data = {
    labels: ['remplis', 'non remplis'],
    datasets: [{
      label: [],
      data: [chart?.filled_count, chart?.not_filled_count],
      backgroundColor: [
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
      
      ],
      borderColor: [
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        
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
    
      
    <div className="card card-custom gutter-b" style={{ height: '400px' }}>
      <div className="card-header h-auto">
          <div className="card-title py-5">
              <h3 className="card-label">Taux de remplissage des polygones(contour des parclles)</h3>
          </div>
      </div>
      <div className="card-body">
      {loading ? (
        <div className="container py-8">
            <div className="content d-flex flex-column flex-column-fluid" id="kt_content">
              <div style={{ width: '100px', margin: 'auto', display: 'block' }}>
                <ClipLoader color="#52bfd9" size={100}/>
              </div>
            </div>
        </div>
        ) : ( 
        <Pie
          data={data}
          height={400}
          options={options}
        />)}
      </div>
      <div className="card-footer">
      <div className='col'>
          <p style={{ marginRight: '20px' }}>Télécharger liste des producteurs</p>
        <div style={{ display: 'flex' }}>
            
            <select id="polygoneFilter" className="form-control" style={{ marginRight: '20px' }}>
              <option value="all">selectionner</option>
              <option value="remplis">remplis</option>
              <option value="nonRemplis">non remplis</option>
            </select>  
            <a onClick={() => handleDownload()} className="btn btn-sm btn-clean btn-icon" title="télécharger fichier">
            <span class="svg-icon svg-icon-primary svg-icon-2x">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <rect x="0" y="0" width="24" height="24"/>
                    <path d="M2,13 C2,12.5 2.5,12 3,12 C3.5,12 4,12.5 4,13 C4,13.3333333 4,15 4,18 C4,19.1045695 4.8954305,20 6,20 L18,20 C19.1045695,20 20,19.1045695 20,18 L20,13 C20,12.4477153 20.4477153,12 21,12 C21.5522847,12 22,12.4477153 22,13 L22,18 C22,20.209139 20.209139,22 18,22 L6,22 C3.790861,22 2,20.209139 2,18 C2,15 2,13.3333333 2,13 Z" fill="#000000" fill-rule="nonzero" opacity="0.3"/>
                    <rect fill="#000000" opacity="0.3" transform="translate(12.000000, 8.000000) rotate(-180.000000) translate(-12.000000, -8.000000) " x="11" y="1" width="2" height="14" rx="1"/>
                    <path d="M7.70710678,15.7071068 C7.31658249,16.0976311 6.68341751,16.0976311 6.29289322,15.7071068 C5.90236893,15.3165825 5.90236893,14.6834175 6.29289322,14.2928932 L11.2928932,9.29289322 C11.6689749,8.91681153 12.2736364,8.90091039 12.6689647,9.25670585 L17.6689647,13.7567059 C18.0794748,14.1261649 18.1127532,14.7584547 17.7432941,15.1689647 C17.3738351,15.5794748 16.7415453,15.6127532 16.3310353,15.2432941 L12.0362375,11.3779761 L7.70710678,15.7071068 Z" fill="#000000" fill-rule="nonzero" transform="translate(12.000004, 12.499999) rotate(-180.000000) translate(-12.000004, -12.499999) "/>
                </g>
              </svg>
            </span>
            </a>
        </div>
      </div>
      </div>
    </div>
   
    
  )
}

export default PolygoneChart