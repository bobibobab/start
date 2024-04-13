import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Comsumption } from './comsumption/comsumption';
import { Total } from './total/total';
import { About } from './about/about';
import { AuthState } from './login/authState';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

function App() {
    const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
    const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
    const [authState, setAuthState] = React.useState(currentAuthState);
    
    const myStyle = {
        backgroundImage:
            "url('https://media.istockphoto.com/id/1198334973/vector/falling-american-dollar-bills-seamless-pattern-on-white-background.jpg?s=612x612&w=0&k=20&c=YmRnfuNww1Mn6Ezy7_sWWJHx113BfDxsDWyRaVMhAN0=')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
    };

    return (
        <BrowserRouter>
            <div className='body bg-white' style={myStyle}>
                <header className='container-fluid'>
                    <nav className='navbar fixed-top'>
                        <div className='logo'>
                            <img src="https://api.sherbert.cimpress.io/v2/assets/ezQLGBGRyaJgMpfFc3KkI~200/webPreview?signature=3adeb2396468bd23ed00497400bf2d6e110d0902" alt='logo' style={{ width: '90px', height: '90' }} />
                        </div>

                        <menu className= 'navbar-nav'>
                            <li className='nav-item'>
                                <a className='nav-link' href='/'>
                                    Login
                                </a>
                            </li>
                            {authState === AuthState.Authenticated &&
                                <li className='nav-item'>
                                    <a className='nav-link' href='comsumption'>
                                        Comsumption
                                    </a>
                                </li>}

                            {authState === AuthState.Authenticated &&
                                <li className='nav-item'>
                                    <a className='nav-link' href='total'>
                                        Total
                                    </a>
                                </li>}
                            <li className='nav-item'>
                                <a className='nav-link' href='about'>
                                    About
                                </a>
                            </li>
                        </menu>
                    </nav>
                </header>

                <Routes>
                    <Route path='/' element={
                        <Login
                            userName={userName}
                            authState={authState}
                            onAuthChange={(userName, authState) => {
                                setAuthState(authState);
                                setUserName(userName);
                            }}
                        />
                    } exact />
                    <Route path='/comsumption' element={<Comsumption userName={userName}/>} />
                    <Route path='/total' element={<Total />} />
                    <Route path='/about' element={<About />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>

                <footer className='bg-dark text-white-50'>
                    <div className='container-fluid'>
                        <span className='text-reset'>Jisu Song(s)</span>
                        <a className='text-reset' href='https://github.com/bobibobab?tab=repositories'>
                            Source
                        </a>
                    </div>
                </footer>
            </div>
        </BrowserRouter>
    );
}
function NotFound() {
    return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}

export default App;