
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Aside from '../../fragments/Aside';
import Header from '../../fragments/Header';
import PageHeader from '../../fragments/PageHeader';
import HandleFileUpload from '../Generale/HandleFileUpload';
import ClipLoader from 'react-spinners/ClipLoader';
const UploadFile=()=>{
    const [productorData, setProductorData]=useState([]);
    const [loading, setLoading] = useState(false)
    useEffect(()=>{
        setLoading(true)
        fetch('http://127.0.0.1:8000/api/render-data/')
        .then((response) => response.json())
        .then((data) => {
            setProductorData(data);
        })
        .finally(() => {
            setLoading(false)
          })
        .catch((error) => {
            console.error('Error fetching number of producers:', error);
          });

    },[]

    );
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
                                        {loading ? (
                                                <div style={{ width: '100px', margin: 'auto', display: 'block' }}>
                                                    <ClipLoader color="#52bfd9" size={100}/>
                                                </div>
                                        ) : (
                                        <table className="table table-separate table-head-custom">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>code</th>
                                                    <th>Nom prénom</th>
                                                    <th>sexe</th>
                                                    <th>contact</th>
                                                    <th>village</th>
                                                    
                                                </tr>

                                            </thead>
                                            <tbody>
                                            {productorData.map((productor,index) => (
                                            <tr key={productor.code}>
                                                <td>{index +1}</td>
                                                <td>{productor.code}</td>
                                                <td>{productor.nomPrenom}</td>
                                                <td>{productor.sexe}</td>
                                                <td>{productor.contact}</td>
                                                <td>{productor.village}</td>
                                                
                                            </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                        
                                        )}
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