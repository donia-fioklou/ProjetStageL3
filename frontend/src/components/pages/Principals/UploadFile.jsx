
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Aside from '../../fragments/Aside';
import Header from '../../fragments/Header';
import PageHeader from '../../fragments/PageHeader';
import ClipLoader from 'react-spinners/ClipLoader';
const UploadFile=()=>{
    const [productorData, setProductorData]=useState([]);
    const [loading, setLoading] = useState(false)
    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        const allowedExtensions = /(\.xlsx|\.xls)$/i; // Regular expression to match Excel file extensions
        if (!allowedExtensions.exec(file.name)) {
            alert('Type de fichier invalide. Veuillez sélectionner un fichier Excel.');
            return;
        }
        const url = 'http://127.0.0.1:8000/api/upload-excel/';
        const formData = new FormData();
        formData.append('filePath', file);

        try {
            setLoading(true); // Enable loader
            const response = await fetch(url, {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            console.log(data);
            if (response.status === 201){
                
                alert("fichier chargé avec succès");
                FetchFileData();
                console.log(data);
            }
            setLoading(false); // Disable loader
        } catch (error) {
            setLoading(false); // Disable loader
            console.error(error);
        }
    };

    const FetchFileData= async ()=>{
        const url='http://127.0.0.1:8000/api/check-df-info/';
        try{
            const response = await fetch(url, {
            method: 'GET',
            });
            const data = await response.json();
            setProductorData(data);
        }
        catch(error){
            setLoading(false); // Disable loader
            console.error(error);
        }
        
    }
    
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
                                        {/* <HandleFileUpload />  */}
                                        <div className="content d-flex flex-column flex-column-fluid" id="kt_content">
                                            <div className="custom-file">
                                                <input type="file" className="custom-file-input " id="customFile" onChange={handleFileUpload} />
                                                <label className="custom-file-label" htmlFor="customFile">
                                                    Nouveau fichier
                                                </label>
                                            </div>
                                        </div> 
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
                                            <tr key={index+1}>
                                                <td>{index +1}</td>
                                                <td>{productor.code}</td>
                                                <td>{productor.NomPrenom}</td>
                                                <td>{productor.Sexe}</td>
                                                <td>{productor.Contact}</td>
                                                <td>{productor.Village}</td>
                                                
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