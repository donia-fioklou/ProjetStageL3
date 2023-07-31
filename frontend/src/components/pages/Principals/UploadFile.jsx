
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Aside from '../../fragments/Aside';
import Header from '../../fragments/Header';
import PageHeader from '../../fragments/PageHeader';
import Filters from '../../fragments/Filters'
import GenderChart from '../Generale/GenderChart';
import ZoneChart from '../Generale/ZoneChart';
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import LocalisationChart from '../Generale/LocalisationStats';
import PolygoneChart from '../Generale/PolygoneChart';
import NumberCard from '../../widgets/NumberCard';
import HandleFileUpload from '../Generale/HandleFileUpload';

const UploadFile=()=>{
    return(
        <div>
            <div>
                <Helmet>
                    <title>Fichier</title>
                </Helmet>
            </div>
            <Header />
            <div className='d-flex flex-column flex-root'>
                <div className='d-flex flex-row flex-column-fluid page'>
                    <Aside />
                    <div className='d-flex flex-column flex-row-fluid wrapper' id='kt_wrapper'>
                        <PageHeader />
                        <div className="content d-flex flex-column flex-column-fluid" id="kt_content">
                            <div className="container py-8">
                                <div className="card card-custom">
                                <div className="card-header flex-wrap border-0 pt-6 pb-0 d-flex justify-content-between align-items-center">
                                    <div className="card-title">
                                        <h3 className="card-label">Informations du fichier</h3>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <HandleFileUpload /> 
                                    </div>
                                </div>


                                    <div className="card-body">
                                        <table className="table table-separate table-head-custom">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Nom</th>
                                                    <th>Nombre de cales</th>
                                                    <th>Actif</th>
                                                    
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th scope="row">1</th>
                                                    <td>Bateau 1</td>
                                                    <td>2</td>
                                                    <td>Oui</td>

                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div> 

                            </div>
                        </div>
                                
                    </div>
                </div>
            </div>
        </div>
    );



}
export default UploadFile;