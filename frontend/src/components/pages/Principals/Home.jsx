import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Aside from '../../fragments/Aside';
import Header from '../../fragments/Header';
import PageHeader from '../../fragments/PageHeader';

const Home = () => {
    //let url = "assets/media/svg/shapes/abstract-4.svg"
    let url = "assets/media/svg/patterns/taieri.svg"

    const [data, setData] = useState([])
    //const navigate = useNavigate()

    useEffect(() => {

        const fetchData = async () => {
            try {

            } catch (err) {
                console.log(err);
            }
        };

        fetchData()
    }, []);

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
                            <div className="subheader py-5 py-lg-10 gutter-b subheader-transparent" id="kt_subheader" style={{ backgroundPosition: 'right', backgroundSize: '100%', backgroundRepeat: 'no-repeat', backgroundImage: 'url(' + url + ')' }}>
                                <div className="container d-flex flex-column">
                                    <div className="d-flex align-items-sm-end flex-column flex-sm-row mb-5">
                                        <h2 className="d-flex align-items-center text-white mr-5 mb-0">&nbsp;</h2>
                                    </div>
                                    <div className="d-flex align-items-md-center mb-2 flex-column flex-md-row">
                                        <div className=" rounded p-4 d-flex flex-grow-1 flex-sm-grow-0">
                                            <h2>&nbsp;</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="container py-8">
                                <h2>Stats</h2>
                                <br />
                                <div className="row">
                                    {
                                        <div className="col-lg-4">
                                            <div className="card card-custom wave wave-animate-slow wave-success mb-8 mb-lg-0">
                                                <div className="card-body">
                                                    <div className="d-flex align-items-center p-5">
                                                        <div className="d-flex flex-column">
                                                            <a className="text-dark text-hover-primary font-weight-bold font-size-h4 mb-3">Nombre d'utilisateur</a>
                                                            <div className="text-dark-75" > {data.length}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    }
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