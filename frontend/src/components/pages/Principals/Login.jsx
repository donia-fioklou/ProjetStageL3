import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';

const Login = () => {
    let url = 'assets/media/bg/bg-3.jpg'
    const [error, setError] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [token, setToken] = useState("");
    const [refreshToken ,setRefreshToken]=useState("");

    const navigate = useNavigate()

    const { dispatch } = useContext(AuthContext)

    // const formData = new FormData();
    // formData.append('username', email);
    // formData.append('password', password);
    // formData.append('device',1)
    const formData ={
        "username":email,
        "password":password,
        "device":1
    }
    const handleLogin = (e) => {
        e.preventDefault();
        const formData ={
            username:email,
            password:password,
            device:1
        }
        
        fetch('https://test.coo.tg/api/traite/connexion/info',{
            method: 'POST',
            headers:{'content-Type':'application/json'},
            body: JSON.stringify(formData)
            
        }
        )
        .then((response) => response.json())
        .then((data)=>{
            setToken(data.token);
            setRefreshToken(data.refresh_token);
            var token = data.token;
            
            console.log(token);
            if(token != null){
                localStorage.setItem('uid', email)
                
                dispatch({ type: "LOGIN", payload: email })
                navigate("/");

            }

            /*fetch('https://test.coo.tg/api/traite/me/info',{

                method: 'POST',
                headers:{
                    'Authorization':'Bearer '+token,
                }
            }).then(
                (response)=>response.json()
            ).then((data)=>{
                console.log(data);
                if(data["etatconnexion"]){
                    localStorage.setItem('uid', email)
                    
                    dispatch({ type: "LOGIN", payload: email })
                    navigate("/");

                }
                
            }
            )*/

        })
        .catch((error) => {
            console.error('Error fetching form data:', error);
        });
        

        // if (email === "admin@admin.a" && password === "1234567890") {
        //     localStorage.setItem('uid', "admin@admin.a")
        //     localStorage.setItem('pass', "1234567890")
        //     dispatch({ type: "LOGIN", payload: "admin@admin.a" })
        //     navigate("/")
        // } else {
        //     setError(true)
        // }


    }

    return (
        <div>
            <div>
                <Helmet>
                    <title>Login</title>
                </Helmet>
            </div>
            <div className='d-flex flex-column flex-root'>
                <div className='login login-4 login-signin-on d-flex flex-row-fluid' id='kt_login'>
                    <div className='d-flex flex-center flex-row-fluid bgi-size-cover bgi-position-top bgi-no-repeat' style={{ backgroundImage: 'url(' + url + ')' }}>
                        <div className='login-form text-center p-7 position-relative overflow-hidden'>
                            <div className='d-flex flex-center mb-15'>
                                <a href='#'>
                                    <img src='assets/media/logos/logo-letter-13.png' className='max-h-75px' alt='' />
                                </a>
                            </div>
                            <div className='login-signin'>
                                <div className='mb-20'>
                                    <h3>Connectez vous</h3>
                                    <div className='text-muted font-weight-bold'>Saisissez vos informations pour vous connecter</div>
                                </div>
                                <form className='form' id='login' onSubmit={handleLogin}>
                                    <div className='form-group mb-5'>
                                        <input className='form-control h-auto form-control-solid py-4 px-8' type='text' placeholder="nom d'utilisateur" autoComplete='off' onChange={e => setEmail(e.target.value)} />
                                    </div>
                                    <div className='form-group mb-5'>
                                        <input className='form-control h-auto form-control-solid py-4 px-8' id='password' type='password' placeholder='Mot de passe' name='password' onChange={e => setPassword(e.target.value)} />
                                    </div>
                                    <div className='form-group d-flex flex-wrap justify-content-center align-items-center'>
                                        <div className='col'>
                                            <a className='text-muted row text-hover-primary'>Mot de passe oublié ?</a>
                                            {error && <span className='text-danger'>Email ou mot de passe incorrect</span>}
                                        </div>
                                    </div>
                                    <div className='col'>
                                        <button id='login-btn' type='submit' className='btn btn-primary font-weight-bold px-9 py-4 my-3 mx-4'>Se connecter</button>

                                    </div>
                                </form>
                            </div>
                            <div className='login-forgot'>
                                <div className='mb-20'>
                                    <h3>Mot de passe oublié ?</h3>
                                    <div className='text-muted font-weight-bold'>Saisissez votre email pour mettre à jour le mot de passe</div>
                                </div>
                                <form className='form' id='kt_login_forgot_form'>
                                    <div className='form-group mb-10'>
                                        <input className='form-control form-control-solid h-auto py-4 px-8' type='text' placeholder='Email' name='email' autocomplete='off' />
                                    </div>
                                    <div className='form-group d-flex flex-wrap flex-center mt-10'>
                                        <button id='kt_login_forgot_submit' type='submit' className='btn btn-primary font-weight-bold px-9 py-4 my-3 mx-2'>Valider</button>
                                        <button id='kt_login_forgot_cancel' type='reset' className='btn btn-light-primary font-weight-bold px-9 py-4 my-3 mx-2'>Annuler</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;