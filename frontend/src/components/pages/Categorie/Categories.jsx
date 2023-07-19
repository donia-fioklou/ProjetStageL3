import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import makeId from '../../../IdGenerator';
import Aside from '../../fragments/Aside';
import Header from '../../fragments/Header';
import PageHeader from '../../fragments/PageHeader';

const Categories = () => {
    const [data, setData] = useState({});
    const [list, setList] = useState([]);
    let navigate = useNavigate();

    //Récupération des informations
    const handleInput = (e) => {
        const id = e.target.name;
        const value = e.target.value;

        setData({ ...data, [id]: value });
    }

    //Opérations
    const handleAdd = async (e) => {
        e.preventDefault();
        let id = makeId(25);
        try {
            navigate(0)
        } catch (err) {
            console.log(err)
        }
    }

    //Affichage
    useEffect(() => {




    }, []);

    const delet = (id) => {
        return navigate(`/cat/delete/${id}`)
    };

    const edit = (id) => {
        return navigate(`/cat/edit/${id}`);
    }

    const details = (id) => {
        return navigate(`/cat/details/${id}`)
    }

    return (
        <div>
            <div>
                <Helmet>
                    <title>Categorie | Accueil</title>
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
                                            <h5 className="text-dark font-weight-bold mt-2 mb-2 mr-5">Catégories</h5>
                                            <div className="subheader-separator subheader-separator-ver mt-2 mb-2 mr-5 bg-gray-200"></div>
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <a data-toggle="modal" aria-haspopup="true" aria-expanded="false" data-target="#ModalCreateBateau" className="btn btn-light-primary font-weight-bold btn-sm px-4 font-size-base ml-2">Ajouter une Catégorie</a>
                                        </div>
                                        <div className="modal fade" id="ModalCreateBateau" data-backdrop="static" tabIndex="-1" role="dialog" aria-labelledby="staticBackdrop" aria-hidden="true">
                                            <div className="modal-dialog modal-" role="document">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h3 className="card-title">
                                                            Ajouter une nouvelle catégorie
                                                        </h3>
                                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                            <i aria-hidden="true" className="ki ki-close"></i>
                                                        </button>
                                                    </div>
                                                    <form onSubmit={handleAdd}>
                                                        <div className="modal-body">
                                                            <div className="form-group">
                                                                <label>Titre<span className="text-danger">*</span></label>
                                                                <input type="text" required className="form-control" placeholder="Titre de la catégorie" onChange={handleInput} name="nom" />
                                                            </div>
                                                        </div>
                                                        <div className="modal-footer">
                                                            <button type="submit" className="btn btn-primary mr-2">Valider</button>
                                                            <button type="reset" data-dismiss="modal" className="btn btn-secondary">Annuler</button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex flex-column-fluid">
                                    <div className="container">
                                        <div className="card card-custom">
                                            <div className="card-header flex-wrap border-0 pt-6 pb-0">
                                                <div className="card-title">
                                                    <h3 className="card-label">Liste de toute les catégories</h3>
                                                </div>
                                            </div>

                                            <div className="card-body">
                                                <table className="table table-separate table-head-custom">
                                                    <thead>
                                                        <tr>
                                                            <th>#</th>
                                                            <th>Titre</th>
                                                            <th>Actions</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            list.map(cat => <tr key={cat.id}>
                                                                <th scope="row" >{list.findIndex(g => g.id === cat.id) + 1}</th>
                                                                <td>{cat.nom}</td>
                                                                <td nowrap="nowrap">
                                                                    <div className="dropdown dropdown-inline">
                                                                        <a onClick={() => edit(cat.id)} className="btn btn-sm btn-clean btn-icon mr-2" title="Modifier">
                                                                            <span className="svg-icon svg-icon-md">
                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                                                    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                                                                        <rect x="0" y="0" width="24" height="24" />
                                                                                        <path d="M8,17.9148182 L8,5.96685884 C8,5.56391781 8.16211443,5.17792052 8.44982609,4.89581508 L10.965708,2.42895648 C11.5426798,1.86322723 12.4640974,1.85620921 13.0496196,2.41308426 L15.5337377,4.77566479 C15.8314604,5.0588212 16,5.45170806 16,5.86258077 L16,17.9148182 C16,18.7432453 15.3284271,19.4148182 14.5,19.4148182 L9.5,19.4148182 C8.67157288,19.4148182 8,18.7432453 8,17.9148182 Z" fill="#000000" fillRule="nonzero" transform="translate(12.000000, 10.707409) rotate(-135.000000) translate(-12.000000, -10.707409) " />
                                                                                        <rect fill="#000000" opacity="0.3" x="5" y="20" width="15" height="2" rx="1" />
                                                                                    </g>
                                                                                </svg>
                                                                            </span>
                                                                        </a>
                                                                        <a onClick={() => details(cat.id)} className="btn btn-sm btn-clean btn-icon mr-2" title="Details">
                                                                            <span className="svg-icon svg-icon-md">
                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                                                    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                                                                        <rect x="0" y="0" width="24" height="24" />
                                                                                        <path d="M5,8.6862915 L5,5 L8.6862915,5 L11.5857864,2.10050506 L14.4852814,5 L19,5 L19,9.51471863 L21.4852814,12 L19,14.4852814 L19,19 L14.4852814,19 L11.5857864,21.8994949 L8.6862915,19 L5,19 L5,15.3137085 L1.6862915,12 L5,8.6862915 Z M12,15 C13.6568542,15 15,13.6568542 15,12 C15,10.3431458 13.6568542,9 12,9 C10.3431458,9 9,10.3431458 9,12 C9,13.6568542 10.3431458,15 12,15 Z" fill="#000000" />
                                                                                    </g>
                                                                                </svg>
                                                                            </span>
                                                                        </a>
                                                                        <a onClick={() => delet(cat.id)} className="btn btn-sm btn-clean btn-icon" title="Supprimer">
                                                                            <span className="svg-icon svg-icon-md">
                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                                                    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                                                                        <rect x="0" y="0" width="24" height="24" />
                                                                                        <path d="M6,8 L6,20.5 C6,21.3284271 6.67157288,22 7.5,22 L16.5,22 C17.3284271,22 18,21.3284271 18,20.5 L18,8 L6,8 Z" fill="#000000" fillRule="nonzero" />
                                                                                        <path d="M14,4.5 L14,4 C14,3.44771525 13.5522847,3 13,3 L11,3 C10.4477153,3 10,3.44771525 10,4 L10,4.5 L5.5,4.5 C5.22385763,4.5 5,4.72385763 5,5 L5,5.5 C5,5.77614237 5.22385763,6 5.5,6 L18.5,6 C18.7761424,6 19,5.77614237 19,5.5 L19,5 C19,4.72385763 18.7761424,4.5 18.5,4.5 L14,4.5 Z" fill="#000000" opacity="0.3" />
                                                                                    </g>
                                                                                </svg>
                                                                            </span>
                                                                        </a>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            )
                                                        }

                                                    </tbody>
                                                </table>
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

export default Categories;