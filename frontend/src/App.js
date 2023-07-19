import { useContext } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import { AuthContext } from './context/AuthContext';
/*Pages*/
import Presentation from './components/pages/Charts/presentation';
import Home from './components/pages/Principals/Home';
import Login from './components/pages/Principals/Login';

import Categories from './components/pages/Categorie/Categories';
import DetailsCat from './components/pages/Categorie/Details';
import EditCat from './components/pages/Categorie/Modif';
import DeleteCat from './components/pages/Categorie/Suppr';

/*Role*/
import Forbiden from './components/Err/403';
import NotFound from './components/Err/404';
import Account from './components/pages/Utilisateur/Account';

function App() {

    const { currentUser } = useContext(AuthContext)

    const RequireAuth = ({ children }) => {
        return currentUser ? (children) : <Navigate to={"/login"} />;
    }

    return (
        <div>
            <div className='header-fixed header-mobile-fixed subheader-enabled page-loading' id='kt_body'>
            <Router basename='/'>
                    <Routes>
                        <Route exact path='/login' element={<Login />}></Route>
                        <Route exact path='/pre' element={<Presentation />}></Route>
                        <Route exact path='/' element={<RequireAuth><Home/></RequireAuth>}></Route>

                        {/* user */}
                        <Route path='/user/account' exact element={<RequireAuth><Account/></RequireAuth>}></Route>

                        {/*Catégorie */}
                        <Route path='cat' exact element={<RequireAuth><Categories/></RequireAuth>}></Route>
                        <Route exact path='/cat/details/:id' element={<RequireAuth><DetailsCat/></RequireAuth>}></Route>
                        <Route exact path='/cat/delete/:id' element={<RequireAuth><DeleteCat/></RequireAuth>}></Route>
                        <Route exact path='/cat/edit/:id' element={<RequireAuth><EditCat/></RequireAuth>}></Route>
                        
                        {/* Page d'erreurs */}
                        <Route path='/403' element={<RequireAuth><Forbiden /></RequireAuth>}></Route>
                        <Route path='*' element={<NotFound />} />
                    </Routes>
                </Router>
            </div>
        </div>
    );
}

export default App;
