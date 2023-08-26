import PieChart from "../Charts/Pie";
import { convertJsonToExcel } from '../Generale/GenderChart';
import React, { useState } from 'react'

const FormRapportCard = ({ title, labels, labelsData,paramId}) => { 
    const [responseSelected, setResponseSelected] = useState('');
    const [productorData, setProductorData] = useState([]);
    function handleDownload() {
        // Récupérer la valeur sélectionnée du filtre
       
        convertJsonToExcel(productorData,`producteur${responseSelected}`);
      }
    
      function handleResponseChange(event) {
        event.preventDefault();
        fetch(`http://127.0.0.1:8000/api/form-rapport/?formId=${paramId}&filterBaseQuestion=${title}&filterBaseResponse=${event.target.value}`, {
            method: 'GET',
        })
        .then((response) => response.json())
        .then((data) => {
            
            setProductorData(data[1]);
        })
        .catch((error) => {
            console.error('Error fetching form data:', error);
        });
        // Récupérer la valeur sélectionnée du filtre
        // updateFilterBaseQuestion(title)
        // updateFilterBaseResponse(event.target.value);
        setResponseSelected(event.target.value);
       
      }


    
    return (
        <div className='card card-custom gutter-b' style={{ height: '400px' }}>
            <div className='card-header'>
                <div className='card-title'>            
                        <h3 className='card-label'>{title}</h3>
                </div>
            </div>
            <div className='card-body'>
                <PieChart labels={labels} labelsData={labelsData} />
            </div>
            <div className="card-footer">
      <div className='col'>
          <p style={{ marginRight: '20px' }}>Télécharger liste des producteurs</p>
        <div style={{ display: 'flex' }}>
          <select id="responseLibelle" className="form-control" style={{ marginRight: '20px' }} onChange={handleResponseChange}>
            <option value="all">sélèctionner</option>
            {labels.map((option, index) => (
            <option key={index} value={option}>
                {option}
            </option>
            ))}
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
    );
}


const NumberRapportCard=({title,sum,moy,max,min})=>{
    return(
        <div className='card card-custom gutter-b' style={{ height: '400px' }}>
            <div className='card-header'>
                <div className='card-title'>            
                        <h3 className='card-label'>{title}</h3>
                </div>
            </div>
            <div className='card-body' >
            <div class="card-spacer bg-white card-rounded flex-grow-1">
                            <div class="row m-0">
                                <div class="col  py-6 mr-4">
                                    <div class="font-size-sm text-muted font-weight-bold mb-2">
                                            Somme
                                    </div>
                                    <div class="font-size-h4 font-weight-bolder">
                                        <a  class="menu-link ">
                                            {sum}
                                        </a>
                                    </div>
                                </div>
                                <div class="col  py-6">
                                    <div class="font-size-sm text-muted font-weight-bold mb-2 text-right">
                                        Moyenne 
                                    </div>
                                    <div class="font-size-h4 font-weight-bolder text-right">
                                         <a  class="menu-link ">
                                         {moy}
                                        </a>    
                                    </div>
                                </div>
                            </div>
                            
                            <div class="row m-0">
                                <div class="col  py-6 mr-4">
                                    <div class="font-size-sm text-muted font-weight-bold">
                                        Maximum  
                                    </div>
                                    <div class="font-size-h4 font-weight-bolder">
                                        {max}
                                    </div>
                                </div>
                                <div class="col  py-6">
                                    <div class="font-size-sm text-muted font-weight-bold text-right">
                                        Minimum
                                    </div>
                                    <div class="font-size-h4 font-weight-bolder text-right">
                                        <a  class="menu-link ">
                                            {min}                                                                               
                                        </a>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                
                {/* <table className='table'>
                    <tbody>
                        <tr>
                            <td>Somme : {sum}</td>
                            <td>Moyenne : {moy} </td>
                            
                        </tr>
                        <tr>
                            <td>Minimum : {min}</td>
                            
                            <td>Maximum : {max}</td>
                            
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                        </tr>
                        
                    </tbody>
                </table> */}
                
            </div>
            
        </div>

    );


}
export default FormRapportCard;
export  {NumberRapportCard};