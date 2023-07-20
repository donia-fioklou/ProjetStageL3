import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Aside from '../../fragments/Aside';
import Header from '../../fragments/Header';
import PageHeader from '../../fragments/PageHeader';
import ProducerCard from '../../fragments/ProducerCard'
import Filters from '../../fragments/Filters'
import Donut from '../Charts/donut';
import Pie from '../Charts/pie';
const Home = () => {
    //let url = "assets/media/svg/shapes/abstract-4.svg"
    //let url = "assets/media/svg/patterns/taieri.svg"

    //const [data, setData] = useState([])
    //const navigate = useNavigate()
    const primary = '#6993FF';
    const success = '#1BC5BD';
    const info = '#8950FC';
    const warning = '#FFA800';
    const danger = '#F64E60';

    const [numberOfProducers, setNumberOfProducers] = useState(0);
    const [zones, setZones] = useState([]);
    const [cooperatives, setCooperatives] = useState([]);
    const [genderCounts, setGenderCounts] = useState([]);
  
    useEffect(() => {
      // Fetch the number of producers
      fetch('http://192.168.1.106:8000/api/number-of-producer/')
        .then((response) => response.json())
        .then((data) => {
          // Assuming the API returns the number of producers as 'numberOfProducers' field
          const numberOfProducers = data[0]?.number_of_producer || 0;
          setNumberOfProducers(numberOfProducers);
        })
        .catch((error) => {
          console.error('Error fetching number of producers:', error);
        });
  
      // Fetch the list of zones
      fetch('http://192.168.1.106:8000/api/filter-zone/')
        .then((response) => response.json())
        .then((data) => {
          // Assuming the API returns an array of zones as 'zones' field
          setZones(data);
          console.log(data);
        })
        .catch((error) => {
          console.error('Error fetching zones:', error);
        });
  
      // Fetch the list of cooperatives
        fetch('http://192.168.1.106:8000/api/filter-cooperative/')
            .then((response) => response.json())
            .then((data) => {
            // Assuming the API returns an array of cooperatives as 'cooperatives' field
            setCooperatives(data);
            console.log(data);
            })
            .catch((error) => {
            console.error('Error fetching cooperatives:', error);
            });
    // Fetch the gender counts
    fetch('http://192.168.1.106:8000/api/gender-stats/')
      .then((response) => response.json())
      .then((data) => {
        // Assuming the API returns the gender counts as an object with 'F' and 'M' fields
        setGenderCounts(data[0]);
      })
      .catch((error) => {
        console.error('Error fetching gender counts:', error);
      });
        
    }, []);
   
    const donutOptions = {
        series: [44, 55, 41, 17, 15],
        chart: {
            width: 380,
            type: 'donut',
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }],
        colors: [primary, success, warning, danger, info]
    };
 const pieOptions = {
        series: [genderCounts.M, genderCounts.F],
        chart: {
            width: 380,
            type: 'pie',
        },
        labels: ['M', 'F'],
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }],
        colors: [primary, success]
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
                                    <Filters zones={zones} cooperatives={cooperatives} />
                                    </div>
                                </div>
                                {/* Ici, vous pouvez ajouter le reste de votre dashboard */}
                                </div>
                                <div>
                            <div className="content d-flex flex-column flex-column-fluid" id="kt_content">
                                <div className="subheader py-2 py-lg-4 subheader-transparent" id="kt_subheader">
                                    <div className="container d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap">
                                        <div className="d-flex align-items-center flex-wrap mr-2">
                                            <h5 className="text-dark font-weight-bold mt-2 mb-2 mr-5">Charts</h5>
                                            <div className="subheader-separator subheader-separator-ver mt-2 mb-2 mr-5 bg-gray-200"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex flex-column-fluid">
                                    <div className="container">
                                        <div className="row">
                                            <Pie opt={pieOptions} id={"pie"} title={"graph"} />
                                            <Donut opt={donutOptions} id={"donut"} />
                                            
                                        </div>
                                        <div className="row">
                                            
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

/*
data.map(activite => <div className="col-lg-4" key={activite.id}>
                                            <div className="card card-custom wave wave-animate-slow wave-success mb-8 mb-lg-0">
                                                <div className="card-body">
                                                    <div className="d-flex align-items-center p-5">
                                                        <div className="d-flex flex-column">
                                                            <a onClick={() => go(activite.id)} className="text-dark text-hover-primary font-weight-bold font-size-h4 mb-3">{activite.bateau.nom}</a>
                                                            <div className="text-dark-75" >Nombre de cales: {activite.bateau.nbCales}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        ) */