import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Aside from '../../fragments/Aside';
import Header from '../../fragments/Header';
import PageHeader from '../../fragments/PageHeader';
import Pie from './GenderChart';


const Presentation = () => {
    const primary = '#6993FF';
    const success = '#1BC5BD';
    const info = '#8950FC';
    const warning = '#FFA800';
    const danger = '#F64E60';

    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get("http://192.168.1.110:8000/api/gender-stats/")
            .then(response => {
                setData(response.data);
                console.log(response.data);
            })
            .catch(error => console.log(error));
    }, []);

    return (
        <div>
            <div>
                <Helmet>
                    <title>Charts | Accueil</title>
                </Helmet>
            </div>
            <Header />
            <div className='d-flex flex-column flex-root'>
                <div className='d-flex flex-row flex-column-fluid page'>
                    <Aside />
                    <div className='d-flex flex-column flex-row-fluid wrapper' id='kt_wrapper'>
                        <PageHeader />
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
                                            {/* <Lines opt={lineOptions} id={"line"} />
                                            <Column opt={columnOptions} id={"column"} />
                                            <Timelines opt={timelineOptions} id={"timeline"} /> */}
                                        </div>
                                        <div className="row">
                                            {/* <Donut opt={donutOptions} id={"donut"} />
                                            <Pie opt={pieOptions} id={"pie"} /> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Presentation;