import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate()
    const url = 'assets/media/error/bg1.jpg';
    return (
        <div className="d-flex flex-column flex-root">
            <div className="d-flex flex-row-fluid flex-column bgi-size-cover bgi-position-center bgi-no-repeat p-10 p-sm-30" /* style={{ backgroundImage: 'url(' + url + ')' }} */>
                <h1 className="font-weight-boldest text-dark-75 mt-15" style={{ fontSize: 300 }}>404</h1>
                <p className="font-size-h2 text-muted font-weight-normal">
                    Cette page n'existe pas
                    <button onClick={() => navigate(-1)} className="btn btn-primary font-weight-bold px-9 py-4 my-3 mx-4" >Retour</button>
                </p>
            </div>
        </div>
    );
}

export default NotFound;