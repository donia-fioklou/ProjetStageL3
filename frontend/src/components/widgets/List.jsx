import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { doc, collection, onSnapshot, deleteDoc } from 'firebase/firestore'
import { bd } from '../../firebase/firebase';

const List = () => {
    const [list, setList] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {

        const myData = onSnapshot(collection(bd, 'bateau'), (snapshots) => {
            let liste = [];
            snapshots.docs.forEach((doc) => {
                liste.push({ ...doc.data() })
            });
            setList(liste);
        },
            (error) => {
                console.log(error);
            }
        );

        return () => {
            myData();
        }
    }, []);

    const delet = (id) => {
        navigate(`/bateau/delete/${id}`)
    };

    const edit = (id) => {
        navigate(`/bateau/edit/${id}`);
    }

    const details = (id) => {
        navigate(`/bateau/details/${id}`)
    }

    return (
        <div className="card card-custom">
            <div className="card-header flex-wrap border-0 pt-6 pb-0">
                <div className="card-title">
                    <h3 className="card-label">Liste de tous les bateaux</h3>
                </div>
            </div>

            <div className="card-body">
                <table className="table table-separate table-head-custom">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nom</th>
                            <th>Nombre de cales</th>
                            <th>Actif</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            list.map(bateau => <tr key={bateau.id}>
                                <th scope="row" >{list.findIndex(b => b.id === bateau.id) + 1}</th>
                                <td>{bateau.nom}</td>
                                <td>{bateau.nbCales}</td>
                                <td className="text-info">
                                    {bateau.actif}
                                </td>
                                <td nowrap="nowrap">
                                    <div className="dropdown dropdown-inline">
                                        <a onClick={() => edit(bateau.id)} className="btn btn-sm btn-clean btn-icon mr-2" title="Modifier">
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
                                        <a onClick={() => details(bateau.id)} className="btn btn-sm btn-clean btn-icon mr-2" title="Details">
                                            <span className="svg-icon svg-icon-md">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                                        <rect x="0" y="0" width="24" height="24" />
                                                        <path d="M5,8.6862915 L5,5 L8.6862915,5 L11.5857864,2.10050506 L14.4852814,5 L19,5 L19,9.51471863 L21.4852814,12 L19,14.4852814 L19,19 L14.4852814,19 L11.5857864,21.8994949 L8.6862915,19 L5,19 L5,15.3137085 L1.6862915,12 L5,8.6862915 Z M12,15 C13.6568542,15 15,13.6568542 15,12 C15,10.3431458 13.6568542,9 12,9 C10.3431458,9 9,10.3431458 9,12 C9,13.6568542 10.3431458,15 12,15 Z" fill="#000000" />
                                                    </g>
                                                </svg>
                                            </span>
                                        </a>
                                        <a onClick={() => delet(bateau.id)} className="btn btn-sm btn-clean btn-icon" title="Supprimer">
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
    );
}

export default List;