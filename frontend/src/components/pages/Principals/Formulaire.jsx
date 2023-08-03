
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Aside from '../../fragments/Aside';
import Header from '../../fragments/Header';
import PageHeader from '../../fragments/PageHeader';
import Filters from '../../fragments/Filters'
import NumberCard from '../../widgets/NumberCard';
import NumberForm from '../Formulaire/NumberForm';
import FormChartCard from '../Formulaire/FormChartCard';

const Formulaire=()=>{
    const [numberOfProducers, setNumberOfProducers] = useState(0);
    //const[number_of_parcelle,setNumber_of_parcelle]=useState(0);
    const[superficie,setSuperficie]=useState(0);
    const [selectedZone,setSelectZone]=useState('');
    const [selectedCooperative,setSelectCooperative]=useState('');
    const [numberOfForm, setNumberOfForm]=useState(0);
    const [formsData,setformsData]=useState([]);
    
    
  
    useEffect(() => {
      // Fetch the number of producers
      fetch('http://127.0.0.1:8000/api/number-of-producer/')
        .then((response) => response.json())
        .then((data) => {
            // Assuming the API returns the number of producers as 'numberOfProducers' field
            const numberOfProducers = data[0]?.number_of_producer || 0;
            setNumberOfProducers(numberOfProducers);
            //const number_of_parcelle=data[0]?.number_of_parcelle || 0;
            //setNumber_of_parcelle(number_of_parcelle);
            const superficie=data[0]?.superficie_totale || 0;
            setSuperficie(superficie);

        })
        .catch((error) => {
          console.error('Error fetching number of producers:', error);
        });

        const fetchFormData=async () => {
            await fetch(`http://127.0.0.1:8000/api/form-fill-rate/`, {
              method: 'GET',
            })
            .then((response) => response.json())
            .then((data) => {
                setNumberOfForm(data.numberForm);
                setformsData(data.forms);
                console.log(data.forms.length);
            })
            .catch((error) => {
              console.error('Error fetching form data:', error);
            });
        }
        fetchFormData();
  
     
    
    }, []);
    const updateZone=(zone)=>{
        setSelectZone(zone);
    };
    const updateCooperative=(cooperative)=>{
        setSelectCooperative(cooperative);
    };


    
    return(
        <div>
            <div>
                <Helmet>
                    <title>Formulaire</title>
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
                                <div className='row'>
                                    <div className='col-lg-3'>
                                        <NumberCard title='Nombre de producteurs' number={numberOfProducers} color={"primary"} />
                                    </div>
                                    <div className='col-lg-3'>
                                        <NumberCard title='Superficie' number={superficie} color={"success"} />
                                    </div>
                                    <div className='col-lg-3'>
                                        <NumberForm/>
                                    </div>
                                    <div className='col-lg-3'>
                                        <Filters zone={selectedZone} cooperative={selectedCooperative} upadateZone={updateZone} updateCooperative={updateCooperative} />
                                    </div>
                                </div>
                                
                                
                            </div>
                                
                            <div className="content d-flex flex-column flex-column-fluid" id="kt_content">
                                
                                <div className="container py-8">
                                    <div className='row'>
                                      {
                                          formsData.map((form,index)=>(
                                            <div className='col-lg-6'>
                                            <FormChartCard 
                                            title={`Formulaire${index + 1}`} 
                                            labels={['remplis', 'non remplis']} 
                                            labelsData={[form.numberformRemplis, form.numberFormNonRemplis]} 
                                            productorformRemplis={form.productorformRemplis} 
                                            productorformNonRemplis={form.productorformNonRemplis} 
                                            /> 
                                        </div>
                                          )

                                        


                                          

                                          )
                                      }
                                        
                                        
                                    </div>
                                    {/* <div className='row'>
                                        <div className='col-lg-6'>
                                            
                                        </div>
                                        <div className='col-lg-6'>
                                            
                                        </div>
                                    </div> */}
                                </div>

                            </div>
                        </div>
                                
                    </div>
                </div>
            </div>
        </div>
    );



}
export default Formulaire;