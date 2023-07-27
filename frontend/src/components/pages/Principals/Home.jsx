import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Aside from '../../fragments/Aside';
import Header from '../../fragments/Header';
import PageHeader from '../../fragments/PageHeader';
import ProducerCard from '../../fragments/ProducerCard'
import Filters from '../../fragments/Filters'
import GenderChart from '../Charts/GenderChart';
import ZoneChart from '../Charts/ZoneChart';
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import LocalisationChart from '../Charts/LocalisationStats';
import PolygoneChart from '../Charts/PolygoneChart';

Chart.register(CategoryScale);

const Home = () => {

    const [numberOfProducers, setNumberOfProducers] = useState(0);
    const [selectedZone,setSelectZone]=useState('');
    const [selectedCooperative,setSelectCooperative]=useState('');
    
    
    
  
    useEffect(() => {
      // Fetch the number of producers
      fetch('http://127.0.0.1:8000/api/number-of-producer/')
        .then((response) => response.json())
        .then((data) => {
          // Assuming the API returns the number of producers as 'numberOfProducers' field
          const numberOfProducers = data[0]?.number_of_producer || 0;
          setNumberOfProducers(numberOfProducers);
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
   

    return (
        <div>
            <div>
                <Helmet>
                    <title>Accueil</title>
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
                            <div>
                                <div className="d-flex">
                                    <div className="p-2">
                                    <ProducerCard numberOfProducers={numberOfProducers} />
                                    </div>
                                    <div className="p-2">
                                    <Filters zone={selectedZone} cooperative={selectedCooperative} upadateZone={updateZone} updateCooperative={updateCooperative}  />
                                    </div>


                                    
                                </div>
                                {/* Ici, vous pouvez ajouter le reste de votre dashboard */}
                                </div>
                                <div>
                            <div className="content d-flex flex-column flex-column-fluid" id="kt_content">
                                <div className="subheader py-2 py-lg-4 subheader-transparent" id="kt_subheader">
                                    <div className="container d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap">
                                        <div className="d-flex align-items-center flex-wrap mr-2">
                                            {/* <h5 className="text-dark font-weight-bold mt-2 mb-2 mr-5">Charts</h5> */}
                                            <div className="subheader-separator subheader-separator-ver mt-2 mb-2 mr-5 bg-gray-200"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex flex-column-fluid">
                                    <div className="container">
                                        <div className="row">
                                            <GenderChart selectedZone={selectedZone} selectedCooperative={selectedCooperative} />
                                            <ZoneChart selectedCooperative={selectedCooperative} />
                                            <LocalisationChart selectedZone={selectedZone} selectedCooperative={selectedCooperative} />
                                            
                                        </div>
                                        <div className="row">
                                            <PolygoneChart selectedZone={selectedZone} selectedCooperative={selectedCooperative}/>
                                        </div>
                                    </div>
                                </div>
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

export default Home;
