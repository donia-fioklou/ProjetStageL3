import React, { useState, useEffect } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import ClipLoader from 'react-spinners/ClipLoader';

ChartJS.register(ArcElement, Tooltip, Legend);


export const convertJsonToExcel = (json, file) => {
    // Créez un nouveau classeur
    const workbook = XLSX.utils.book_new();
  
    // Convertir le JSON en une feuille de calcul
    //la fonction json_to_sheet prend un tableau d'objets JSON converti en une matrice de valeurs et de clés
    const worksheet = XLSX.utils.json_to_sheet(json);
  
    // Ajouter la feuille de calcul au classeur
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  
    // Convertir le classeur en un fichier binaire
    const excelBuffer = XLSX.write(workbook, { type: 'array' });
  
    // Créer un objet Blob avec le fichier binaire
    const data = new Blob([excelBuffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
  
    // Utiliser file-saver pour télécharger le fichier
    saveAs(data, `${file}.xlsx`);
  };


const GenderChart = ({ selectedZone, selectedCooperative }) => {
  const [chart, setChart] = useState([])
  const [FemData,setFemData]=useState([])
  const [MascData,setMascData]=useState([])
  const [loading ,setLoading]=useState(true)
  var baseUrl = `http://127.0.0.1:8000/api/gender-stats/?zone=${selectedZone}&union=${selectedCooperative}`;
  
  

  function handleDownload() {
    
    // Récupérer la valeur sélectionnée du filtre
    const selectedFilter = document.getElementById('genderFilter').value;
  
    if (selectedFilter === 'homme') {
      convertJsonToExcel(MascData, "producteur_homme");
    } else if (selectedFilter === 'femme') {
      convertJsonToExcel(FemData, "producteur_femme");
    } 
  }


  useEffect(() => {
    
    const fetchGenderStats = async () => {
      await fetch(`${baseUrl}`, {
        method: 'GET',
      })
      .then((response) => response.json())
      .then((data) => {
        setChart(data[0]);
        setFemData(data[0].productor_fem)
        setMascData(data[0].productor_masc)
        console.log(data[0]);
      })
      .finally(() => {
          setLoading(false)
      }
      );
    };
    fetchGenderStats()
  }, [baseUrl])


  var data = {
    labels: ['Femme', 'Homme'],
    datasets: [{
      label: [],
      data: [chart?.F, chart?.M],
      backgroundColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
      
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
    
    
    <div class="card card-custom gutter-b" style={{ height: '400px' }}>
      <div class="card-header">
        <div class="card-title">
        <h3 class="card-label">
        Répartition par sexe des producteurs 
        </h3>
        </div>
      </div>
      <div class="card-body">
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
            
            <select id="genderFilter" className="form-control" style={{ marginRight: '20px' }}>
              <option value="all">sélèctionner</option>
              <option value="homme">Homme</option>
              <option value="femme">Femme</option>
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

export default GenderChart