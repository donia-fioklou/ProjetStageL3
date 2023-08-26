
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Aside from '../../fragments/Aside';
import Header from '../../fragments/Header';
import PageHeader from '../../fragments/PageHeader';
import ClipLoader from 'react-spinners/ClipLoader';
// import 'frontend/public/assets/css/scoreStyle.css';

const AnalyseBio=()=>{
    const [productorData, setProductorData]=useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [filteredProductorData, setFilteredProductorData] = useState([]);

    // const handleSearch = () => {
    //     setLoading(true);
    //     fetch(`http://127.0.0.1:8000/api/analyse-bio/?searchKey=${search}`)
    //         .then((response) => response.json())
    //         .then((data) => {
    //             setProductorData(data);
    //             setFilteredProductorData(data); // Reset filtered data to include all results
    //         })
    //         .finally(() => {
    //             setLoading(false);
    //         })
    //         .catch((error) => {
    //             console.error('Error fetching data:', error);
    //         });
    // };

    useEffect(() => {
        setLoading(true);
        fetch(`http://127.0.0.1:8000/api/analyse-bio/`)
            .then((response) => response.json())
            .then((data) => {
                setProductorData(data);
                setFilteredProductorData(data); // Initialize filtered data with all results
            })
            .finally(() => {
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const filteredProducers = productorData.filter((producer) =>
    producer.NomPrenom.toLowerCase().includes(search.toLowerCase())
    );

    function getStatusColorClass(score) {
        if ( score < 32) {
            return <span class="label label-lg font-weight-bold label-success label-inline "style={{ width: '80px' }}> Faible </span>;
        } else if (score >= 32 && score < 48) {
            return <span class="label label-lg font-weight-bold label-warning label-inline"style={{ width: '80px' }}> Moyen </span>;
        } else if (score >= 48 ) {
            return <span class="label label-lg font-weight-bold label-danger label-inline"style={{ width: '80px' }}> Elevé </span>;
        }
    }
    //     // Update filtered data based on the search query
    //     const filteredData = productorData.filter((productor) =>
    //         productor.NomPrenom.toLowerCase().includes(search.toLowerCase())
    //     );
    //     setFilteredProductorData(filteredData);
    // }, [search, productorData]);
    return(
        <div>
            <div>
                <Helmet>
                    <title>Analyse Biologique</title>
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
                                        <div className="card-title" >
                                            <p>
                                                <h3 className="card-label">Tableau montrant la possibilté d'être Bio ou le risque d'être non-bio </h3>
                                                <ul >
                                                    <li>avec un pourcentage faible possibilité d'être BIO</li>
                                                    <li>avec un pourcentage élevé risque d'être NON-BIO</li>
                                                </ul>
                                            </p>    
                                                    
                                             
                                        </div>
                                        <div class="input-group mb-3">
                                            <input type="text" id="searchInput" value={search} onChange={(e) => setSearch(e.target.value)} class="form-control" placeholder="Rechercher..." aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                                            <div class="input-group-append">
                                                <button class="btn btn-outline-secondary"  type="button">Rechercher</button>
                                            </div>
                                        </div>
                                    </div>
                                    

                                    <div className="card-body">
                                        {loading ? (
                                                <div style={{ width: '100px', margin: 'auto', display: 'block' }}>
                                                    <ClipLoader color="#52bfd9" size={100}/>
                                                </div>
                                        ) : (
                                        <table className="table table-separate table-head-custom" >
                                            <caption>Niveau de risque pour être non-bio</caption>
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Nom et prénom</th>
                                                    <th>sexe</th>
                                                    <th>contact</th>
                                                    <th>village</th>
                                                    <th>Zone</th>
                                                    <th>Score Bio</th>
                                                    <th>Niveau de Risque</th>
                                                    
                                                </tr>

                                            </thead>
                                            <tbody>
                                            {filteredProducers.map((productor,index) => (
                                            <tr key={productor.CodeSurface}>
                                                <td>{index +1}</td>
                                                <td>{productor.NomPrenom}</td>
                                                <td>{productor.Sexe}</td>
                                                <td>{productor.Contact}</td>
                                                <td>{productor.Village}</td>
                                                <td>{productor.Zone}</td>
                                                <td>{productor.totalScoreBio+'%'}</td>
                                                <td className={getStatusColorClass(productor.totalScoreBio)}>{getStatusColorClass(productor.totalScoreBio)}</td>

                                                
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
export default AnalyseBio;