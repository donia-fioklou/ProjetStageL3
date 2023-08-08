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

Chart.register(CategoryScale);

const Home = () => {

    const [numberOfProducers, setNumberOfProducers] = useState(0);
    const [number_of_parcelle,setNumber_of_parcelle]=useState(0);
    const [superficie,setSuperficie]=useState(0);
    const [selectedZone,setSelectZone]=useState('');
    const [selectedCooperative,setSelectCooperative]=useState('');
    const [loading, setLoading] = useState(false)
    
    
    
  
    useEffect(() => {
      // Fetch the number of producers
      
      fetch('http://127.0.0.1:8000/api/number-of-producer/')
        .then((response) => response.json())
        .then((data) => {
            // Assuming the API returns the number of producers as 'numberOfProducers' field
            const numberOfProducers = data[0]?.number_of_producer || 0;
            setNumberOfProducers(numberOfProducers);
            const number_of_parcelle=data[0]?.number_of_parcelle || 0;
            setNumber_of_parcelle(number_of_parcelle);
            const superficie=data[0]?.superficie_totale || 0;
            setSuperficie(superficie);
            

        })
       
        .catch((error) => {
          console.error('Error fetching number of producers:', error);
        });
  
     
    
    }, []);
    const updateZone=(zone)=>{
        setSelectZone(zone);
    };
    const updateCooperative=(cooperative)=>{
        setSelectCooperative(cooperative);
    };
    const updateLoadgin=(value)=>{
        setLoading(value);
    };
   

    return (
        <div>
            <div>
                <Helmet>
                    <title>Générale</title>
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
                                        <NumberCard title='Superficie' number={superficie+ 'ha'} color={"success"} />
                                    </div>
                                    <div className='col-lg-3'>
                                        <NumberCard title='Nombre de parcelle' number={number_of_parcelle} color={"danger"}/>
                                    </div>
                                    <div className='col-lg-3'>
                                        <Filters zone={selectedZone} cooperative={selectedCooperative} upadateZone={updateZone} updateCooperative={updateCooperative} />
                                    </div>
                                </div>
                                
                                
                            </div>
                            {loading ? (
                                        <div className="content d-flex flex-column flex-column-fluid" id="kt_content">
                                            <div className="container py-8">
                                                <div><h3>Chargement...</h3></div>
                                            </div>
                                        </div>
                                        ) : ( 
                            <div className="content d-flex flex-column flex-column-fluid" id="kt_content">
                                
                                <div className="container py-8">
                                    <div className='row'>
                                        <div className='col-lg-6'>
                                            <GenderChart selectedZone={selectedZone} selectedCooperative={selectedCooperative} />
                                        </div>
                                        <div className='col-lg-6'>
                                            <ZoneChart selectedZone={selectedZone} selectedCooperative={selectedCooperative} />
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-lg-6'>
                                            <LocalisationChart selectedZone={selectedZone} selectedCooperative={selectedCooperative} />
                                        </div>
                                        <div className='col-lg-6'>
                                            <PolygoneChart selectedZone={selectedZone} selectedCooperative={selectedCooperative} />
                                        </div>
                                    </div>
                                </div>

                            </div>)
                            }
                        </div>
                                
                    </div>
                </div>
            </div>
        </div>
            
        
    );
}

export default Home;