import { useNavigate } from "react-router-dom";

const Forbiden = () => {
    const navigate = useNavigate()
    const url = 'assets/media/error/bg4.jpg';
    return (
        <div className="d-flex flex-column flex-root">
            <div className="d-flex flex-row-fluid flex-column bgi-size-cover bgi-position-center bgi-no-repeat p-10 p-sm-30" /* style={{ backgroundImage: 'url(' + url + ')' }} */>
                <div className="d-flex flex-column flex-row-fluid align-items-center align-items-md-start justify-content-md-center text-center text-md-left px-10 px-md-30 py-10 py-md-0 line-height-xs">
                    <h1 className="error-title text-success font-weight-boldest line-height-sm" style={{ fontSize: 300 }}>403</h1>
                    <p className="error-subtitle text-success font-weight-boldest mb-10">ERROR</p>
                    <p className="display-4 text-danger font-weight-boldest mt-md-0 line-height-md">Vous n'avez pas l'authorization pour accéder à cette page</p>
                    <button onClick={() => navigate(-1)} className="btn btn-primary font-weight-bold px-9 py-4 my-3 mx-4" >Retour</button>
                </div>
            </div>
        </div>
    );
}

export default Forbiden;