import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import Aside from '../../fragments/Aside';
import Header from '../../fragments/Header';
import PageHeader from '../../fragments/PageHeader';

const Account = () => {
    const [data, setData] = useState({});
    const [pass, setPass] = useState({});
    const [error, setError] = useState(false);
    const [erro, setErro] = useState(false);
    const navigate = useNavigate()

    const logout = () => {
        localStorage.clear()
        navigate('/login')
    }

    useEffect(() => {
        axios.get("https://randomuser.me/api/")
            .then(response => {
                setData(response.data.results[0])
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const input = (e) => {
        const id = e.target.name;
        const value = e.target.value;

        setData({ ...data, [id]: value })
    }

    const passInput = (e) => {
        const id = e.target.name;
        const value = e.target.value;

        setPass({ ...pass, [id]: value })
    }

    const handleSave = async (e) => {
        e.preventDefault();
        try {

            navigate(-1)
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = () => {
        pass.actual !== localStorage.getItem('pass') ?
            setError(true)
            : pass.new !== pass.confirm ?
                setErro(true)
                : localStorage.setItem('pass', pass.new)

    }

    return (
        <div>
            <div>
                <Helmet>
                    <title>Mon compte</title>
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
                                            <h5 className="text-dark font-weight-bold mt-2 mb-2 mr-5">Compte</h5>
                                            <div className="subheader-separator subheader-separator-ver mt-2 mb-2 mr-5 bg-gray-200"></div>
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <a onClick={() => navigate(-1)} className="btn btn-default font-weight-bold btn-sm px-3 font-size-base">Retour</a>
                                            <div className="btn-group ml-2">
                                                <button type="button" onClick={handleSave} className="btn btn-primary font-weight-bold btn-sm px-3 font-size-base">Enregistrer</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex flex-column-fluid">
                                    <div className="container">
                                        <div className="card card-custom">
                                            <div className="card-header card-header-tabs-line nav-tabs-line-3x">
                                                <div className="card-toolbar">
                                                    <ul className="nav nav-tabs nav-bold nav-tabs-line nav-tabs-line-3x">
                                                        <li className="nav-item mr-3">
                                                            <a className="nav-link active" data-toggle="tab" href="#kt_user_edit_tab_1">
                                                                <span className="nav-icon">
                                                                    <span className="svg-icon">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                                            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                                                                <polygon points="0 0 24 0 24 24 0 24" />
                                                                                <path d="M12.9336061,16.072447 L19.36,10.9564761 L19.5181585,10.8312381 C20.1676248,10.3169571 20.2772143,9.3735535 19.7629333,8.72408713 C19.6917232,8.63415859 19.6104327,8.55269514 19.5206557,8.48129411 L12.9336854,3.24257445 C12.3871201,2.80788259 11.6128799,2.80788259 11.0663146,3.24257445 L4.47482784,8.48488609 C3.82645598,9.00054628 3.71887192,9.94418071 4.23453211,10.5925526 C4.30500305,10.6811601 4.38527899,10.7615046 4.47382636,10.8320511 L4.63,10.9564761 L11.0659024,16.0730648 C11.6126744,16.5077525 12.3871218,16.5074963 12.9336061,16.072447 Z" fill="#000000" fillRule="nonzero" />
                                                                                <path d="M11.0563554,18.6706981 L5.33593024,14.122919 C4.94553994,13.8125559 4.37746707,13.8774308 4.06710397,14.2678211 C4.06471678,14.2708238 4.06234874,14.2738418 4.06,14.2768747 L4.06,14.2768747 C3.75257288,14.6738539 3.82516916,15.244888 4.22214834,15.5523151 C4.22358765,15.5534297 4.2250303,15.55454 4.22647627,15.555646 L11.0872776,20.8031356 C11.6250734,21.2144692 12.371757,21.2145375 12.909628,20.8033023 L19.7677785,15.559828 C20.1693192,15.2528257 20.2459576,14.6784381 19.9389553,14.2768974 C19.9376429,14.2751809 19.9363245,14.2734691 19.935,14.2717619 L19.935,14.2717619 C19.6266937,13.8743807 19.0546209,13.8021712 18.6572397,14.1104775 C18.654352,14.112718 18.6514778,14.1149757 18.6486172,14.1172508 L12.9235044,18.6705218 C12.377022,19.1051477 11.6029199,19.1052208 11.0563554,18.6706981 Z" fill="#000000" opacity="0.3" />
                                                                            </g>
                                                                        </svg>
                                                                    </span>
                                                                </span>
                                                                <span className="nav-text font-size-lg">Profil</span>
                                                            </a>
                                                        </li>
                                                        <li className="nav-item mr-3">
                                                            <a className="nav-link" data-toggle="tab" href="#kt_user_edit_tab_3">
                                                                <span className="nav-icon">
                                                                    <span className="svg-icon">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                                            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                                                                <rect x="0" y="0" width="24" height="24" />
                                                                                <path d="M4,4 L11.6314229,2.5691082 C11.8750185,2.52343403 12.1249815,2.52343403 12.3685771,2.5691082 L20,4 L20,13.2830094 C20,16.2173861 18.4883464,18.9447835 16,20.5 L12.5299989,22.6687507 C12.2057287,22.8714196 11.7942713,22.8714196 11.4700011,22.6687507 L8,20.5 C5.51165358,18.9447835 4,16.2173861 4,13.2830094 L4,4 Z" fill="#000000" opacity="0.3" />
                                                                                <path d="M12,11 C10.8954305,11 10,10.1045695 10,9 C10,7.8954305 10.8954305,7 12,7 C13.1045695,7 14,7.8954305 14,9 C14,10.1045695 13.1045695,11 12,11 Z" fill="#000000" opacity="0.3" />
                                                                                <path d="M7.00036205,16.4995035 C7.21569918,13.5165724 9.36772908,12 11.9907452,12 C14.6506758,12 16.8360465,13.4332455 16.9988413,16.5 C17.0053266,16.6221713 16.9988413,17 16.5815,17 C14.5228466,17 11.463736,17 7.4041679,17 C7.26484009,17 6.98863236,16.6619875 7.00036205,16.4995035 Z" fill="#000000" opacity="0.3" />
                                                                            </g>
                                                                        </svg>
                                                                    </span>
                                                                </span>
                                                                <span className="nav-text font-size-lg">Modifier le mot de passe</span>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="card-body">
                                                <form >
                                                    <div className="tab-content">
                                                        <div className="tab-pane show active px-7" id="kt_user_edit_tab_1" role="tabpanel">
                                                            <div className="row">
                                                                <div className="col-xl-2"></div>
                                                                <div className="col-xl-7 my-2">
                                                                    <div className="row">
                                                                        <label className="col-3"></label>
                                                                        <div className="col-9">
                                                                            <h6 className="text-dark font-weight-bold mb-10">Profil</h6>
                                                                        </div>
                                                                    </div>
                                                                    <div className="form-group row">
                                                                        <label className="col-form-label col-3 text-lg-right text-left">Nom</label>
                                                                        <div className="col-9">
                                                                            <input className="form-control form-control-lg form-control-solid" type="text" onChange={input} placeholder="Nom" required value={data.name.last} />
                                                                        </div>
                                                                    </div>
                                                                    <div className="form-group row">
                                                                        <label className="col-form-label col-3 text-lg-right text-left">Prenom</label>
                                                                        <div className="col-9">
                                                                            <input className="form-control form-control-lg form-control-solid" type="text" value={data.name.first} onChange={input} required placeholder="Prenom" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="form-group row">
                                                                        <label className="col-form-label col-3 text-lg-right text-left">Téléphone</label>
                                                                        <div className="col-9">
                                                                            <div className="input-group input-group-lg input-group-solid">
                                                                                <div className="input-group-prepend">
                                                                                    <span className="input-group-text">
                                                                                        <i className="la la-phone"></i>
                                                                                    </span>
                                                                                </div>
                                                                                <input type="tel" pattern='[0-9]{8}' required maxLength={8} minLength={1} className="form-control form-control-lg form-control-solid" onChange={input} value={data.phone} placeholder="Telephone" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="form-group row">
                                                                        <label className="col-form-label col-3 text-lg-right text-left">Email</label>
                                                                        <div className="col-9">
                                                                            <div className="input-group input-group-lg input-group-solid">
                                                                                <div className="input-group-prepend">
                                                                                    <span className="input-group-text">
                                                                                        <i className="la la-at"></i>
                                                                                    </span>
                                                                                </div>
                                                                                <input type="email" className="form-control form-control-lg form-control-solid" required value={data.email} onChange={input} placeholder="Email" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="form-group row mt-10">
                                                                        <label className="col-3"></label>
                                                                        <div className="col-9">
                                                                            <button type="button" className="btn btn-danger font-weight-bold btn-sm mr-5" >Supprimer votre compte ?</button>
                                                                            <button onClick={logout} className="btn btn-light-info font-weight-bold btn-sm">Se déconnecter</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="tab-pane px-7" id="kt_user_edit_tab_3" role="tabpanel">
                                                            <div className="card-body">
                                                                <div className="row">
                                                                    <div className="col-xl-2"></div>
                                                                    <div className="col-xl-7">
                                                                        <div className="row">
                                                                            <label className="col-3"></label>
                                                                            <div className="col-9">
                                                                                <h6 className="text-dark font-weight-bold mb-10">Changer de mot de passe</h6>
                                                                            </div>
                                                                        </div>
                                                                        <div className="form-group row">
                                                                            <label className="col-form-label col-3 text-lg-right text-left">Mot de passe actuel</label>
                                                                            <div className="col-9">
                                                                                <input className="form-control form-control-lg form-control-solid mb-1" type="password" onFocus={() => setError(false)} placeholder="Mot de passe actuel" name='actual' onChange={passInput} />
                                                                                {/* <a className="font-weight-bold font-size-sm">Mot de passe oublié ?</a> */}
                                                                                {error && <span className='text-danger'>Mot de passe incorrect</span>}
                                                                            </div>
                                                                        </div>
                                                                        <div className="form-group row">
                                                                            <label className="col-form-label col-3 text-lg-right text-left">Nouveau mot de passe</label>
                                                                            <div className="col-9">
                                                                                <input className="form-control form-control-lg form-control-solid" type="password" name='new' onChange={passInput} placeholder="Nouveau mot de passe" />
                                                                            </div>
                                                                        </div>
                                                                        <div className="form-group row">
                                                                            <label className="col-form-label col-3 text-lg-right text-left">Confirmer le mot de passe</label>
                                                                            <div className="col-9">
                                                                                <input className="form-control form-control-lg form-control-solid" type="password" name='confirm' onChange={passInput} onFocus={() => setErro(false)} placeholder="Confirmer le mot de passe" />
                                                                                {erro && <span className='text-danger'>Saisissez le même mot de passe</span>}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="card-footer pb-0">
                                                                <div className="row">
                                                                    <div className="col-xl-2"></div>
                                                                    <div className="col-xl-7">
                                                                        <div className="row">
                                                                            <div className="col-3"></div>
                                                                            <div className="col-9">
                                                                                <a onClick={handleChange} className="btn btn-light-primary font-weight-bold">Enregistrer</a>
                                                                                <a className="btn btn-clean font-weight-bold">Annuler</a>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
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

export default Account;