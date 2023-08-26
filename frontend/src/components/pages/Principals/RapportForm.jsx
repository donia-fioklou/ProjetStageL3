
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
    const [questionData,setQuestionData]=useState({});
    const [productorData,setProductorData]=useState([]);
    const [loading, setLoading] = useState(false)
    const [filterBaseQuestion,setFilterBaseQuestion]=useState('');
    const [filterBaseResponse,setFilterBaseResponse]=useState('');
    const params = useParams()
    var baseUrl =`http://127.0.0.1:8000/api/form-rapport/?formId=${params.id}`;
    
    useEffect(() => {
        setLoading(true);
        fetch(`${baseUrl}`, {
            method: 'GET',
        })
        .then((response) => response.json())
        .then((data) => {
            setQuestionData(data[0]);
            console.log(questionData)
            
        })
        .finally(() => {
            setLoading(false)
        })
        .catch((error) => {
            console.error('Error fetching form data:', error);
        });
    
    }, []);

    // const updateFilterBaseQuestion=(value)=>{
    //     setFilterBaseQuestion(value);
    // }
    // const updateFilterBaseResponse=(value)=>{
    //     setFilterBaseResponse(value);
    // }

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
                             <div className="content d-flex flex-column flex-column-fluid" id="kt_content">
                                
                             <div className="container py-8">
                                 <div className='row'>
                                     <div className='col-lg-6'>
                                         <div className='card card-custom gutter-b' style={{ height: '400px' }}>
                                             <div className='card-header'>
                                                 <div className='card-title' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                     
                                                     
                                                 </div>
                                             </div>
                                             <div className='card-body'>
                                                 <div style={{ width: '100px', margin: 'auto', display: 'block' }}>
                                                     <ClipLoader color="#52bfd9" size={100}/>
                                                 </div>  
                                             </div>
                                             <div className="card-footer">
                                                 <div className='col'>
                                                     
                                                 </div>    
                                             </div>      
                                         </div>
                                     </div>
                                     <div className='col-lg-6'>
                                         <div className='card card-custom gutter-b' style={{ height: '400px' }}>
                                             <div className='card-header'>
                                                 <div className='card-title' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                     
                                                     
                                                 </div>
                                             </div>
                                             <div className='card-body'>
                                                 <div style={{ width: '100px', margin: 'auto', display: 'block' }}>
                                                     <ClipLoader color="#52bfd9" size={100}/>
                                                 </div>  
                                             </div>
                                             <div className="card-footer">
                                                 <div className='col'>
                                                     
                                                 </div>    
                                             </div>      
                                         </div>
                                     </div>

                                 
                                 </div>
                             </div>
                         </div>
                            ) : ( 
                                
                                <div className="content d-flex flex-column flex-column-fluid" id="kt_content">
                                    
                                    <div className="container py-8">
                                        <div className='row'>
                                        {Object.entries(questionData).map(([key, value]) => (
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
                                                        paramId={params.id}
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