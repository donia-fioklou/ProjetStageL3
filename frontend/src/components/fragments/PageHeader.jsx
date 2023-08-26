import React from 'react';
import { useNavigate } from 'react-router-dom';

const PageHeader = () => {
    const navigate = useNavigate();
    return (
        <div id="kt_header" className="header bg-white header-fixed">
            <div className="container-fluid d-flex align-items-stretch justify-content-between">
                <div className="d-flex align-items-stretch mr-2">
                    <div className="header-menu-wrapper header-menu-wrapper-left" id="kt_header_menu_wrapper">
                        <div id="kt_header_menu" className="header-menu header-menu-mobile header-menu-layout-default">
                            <ul className="menu-nav">
                                <li className="menu-item menu-item">
                                    <a onClick={() => { navigate('/home') }} className="menu-link active">
                                        <span className="menu-text">Générale</span>
                                    </a>
                                </li>
                                <li className="menu-item menu-item-submenu" data-menu-toggle="hover" aria-haspopup="true">
                                    <a onClick={() => { navigate('/formulaire') }} className="menu-link">
                                        <span className="menu-text">Formulaire</span>
                                    </a>
                                </li>
                                <li className="menu-item menu-item-submenu" data-menu-toggle="hover" aria-haspopup="true">
                                    <a onClick={() => { navigate('/analyseBio') }} className="menu-link">
                                        <span className="menu-text">Analyse biologique</span>
                                    </a>
                                </li><li className="menu-item menu-item-submenu" data-menu-toggle="hover" aria-haspopup="true">
                                    <a onClick={() => { navigate('/') }} className="menu-link">
                                        <span className="menu-text">Fichier</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="topbar">
                    <div className="topbar-item">
                        <div className="btn btn-icon w-auto btn-clean d-flex align-items-center btn-lg px-2" onClick={() => { navigate('/user/account') }}>
                            <div className="d-flex flex-column text-right pr-3">
                                <span className="text-muted font-weight-bold font-size-base d-none d-md-inline">{/* {user.nom} */}</span>
                                <span className="text-dark-75 font-weight-bolder font-size-base d-none d-md-inline">{/* {user.role} */}</span>
                            </div>
                            <span className="symbol symbol-35 symbol-light-primary">
                                <span className="symbol-label font-size-h5 font-weight-bold">I</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PageHeader;