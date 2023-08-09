
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Aside from '../../fragments/Aside';
import Header from '../../fragments/Header';
import PageHeader from '../../fragments/PageHeader';
import FormRapportCard from '../Formulaire/FormRapportCard';
import { NumberRapportCard } from '../Formulaire/FormRapportCard';
import ClipLoader from 'react-spinners/ClipLoader';
import { useParams } from 'react-router-dom';
const RapportFormulaire=()=>{
    const [formsData,setformsData]=useState({});
    const [loading, setLoading] = useState(false)
    const params = useParams()
    var baseUrl =`http://127.0.0.1:8000/api/form-rapport/?formId=${params.id}`;
  
    useEffect(() => {
        setLoading(true);
        fetch(`${baseUrl}`, {
            method: 'GET',
        })
        .then((response) => response.json())
        .then((data) => {
            setformsData(data);
            console.log("rapport form"+formsData);
        })
        .finally(() => {
            setLoading(false)
        })
        .catch((error) => {
            console.error('Error fetching form data:', error);
        });
    
    }, [baseUrl]);
    return(
        <div>
            <div>
                <Helmet>
                    <title> Rapport de formulaire</title>
                </Helmet>
            </div>
            <Header />
            <div className='d-flex flex-column flex-root'>
                <div className='d-flex flex-row flex-column-fluid page'>
                    <Aside />
                    <div className='d-flex flex-column flex-row-fluid wrapper' id='kt_wrapper'>
                        <PageHeader />
                        <div className="content d-flex flex-column flex-column-fluid" id="kt_content">
                            
                            {/* <div className="container py-8">
                                <div className='row'>
                                    <div className='col-lg-3'>
                                        <NumberForm/>
                                    </div>
                                    <div className='col-lg-3'>
                                        <NumberCard title='Producteur visité' number={numberOfProducers} color={"primary"} />
                                    </div>
                                    <div className='col-lg-3'>
                                        <NumberCard title='Formulaire bien remplis' number={superficie} color={"success"} />
                                    </div>
                                    
                                    <div className='col-lg-3'>
                                        <Filters zone={selectedZone} cooperative={selectedCooperative} upadateZone={updateZone} updateCooperative={updateCooperative} />
                                    </div>
                                </div>
                                
                                
                            </div> */}
                            {loading ? (
                            <div className="container py-8">
                                <div className="content d-flex flex-column flex-column-fluid" id="kt_content">
                                    <div style={{ width: '100px', margin: 'auto', display: 'block' }}>
                                        <ClipLoader color="#52bfd9" size={100}/>
                                    </div>
                                </div>
                            </div>
                            ) : ( 
                                
                                <div className="content d-flex flex-column flex-column-fluid" id="kt_content">
                                    
                                    <div className="container py-8">
                                        <div className='row'>
                                        {Object.entries(formsData).map(([key, value]) => (
                                            <div className='col-lg-6' key={key}>
                                                { value.hasOwnProperty('sum') || value.hasOwnProperty('moy')? (
                                                    <NumberRapportCard 
                                                        title={key} 
                                                        sum={value['sum']} 
                                                        moy={value['moy']} 
                                                        min={value['min']} 
                                                        max={value['max']} 
                                                    />
                                                ) : (
                                                    <FormRapportCard 
                                                        title={key} 
                                                        labels={Object.keys(value)} 
                                                        labelsData={Object.values(value)} 
                                                    />
                                                )}
                                            </div>
                                        ))}
   
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                                
                    </div>
                </div>
            </div>
        </div>
    );



}
export default RapportFormulaire;