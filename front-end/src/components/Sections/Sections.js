import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate, Link } from 'react-router-dom';
import Axios from 'axios';
import { faBars, faTimes, faUser } from '@fortawesome/free-solid-svg-icons';
import './Sections.css';
import { SectionsData } from './SectionsData';
import { usernameresponse } from '../Login/Login';

function Sections() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate(); 

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        Axios.get("http://localhost:8000/auth/verify")
            .then(response => {
                if (response.data.status) {
                    setUser(response.data.user);
                }
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        console.log("User state changed:", user);
        if (!user) {
            setIsMenuOpen(false);
        }
    }, [user]);

    const handleNavigation = (url) => {
        if (url === '/logout') {
            // Déconnexion de l'utilisateur
            Axios.post("http://localhost:8000/auth/logout")
                .then(response => {
                    if (response.data.status) {
                        localStorage.removeItem('token');
                        setUser(null);
                        navigate('/login');
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        } else if (url.startsWith('#')) {
            navigate('/');
            setTimeout(() => {
                window.location.hash = url;
            }, 100);
        } else {
            navigate(url);
        }
    };



    const getSectionsWithUser = () => {
        if (user) {
            return SectionsData.map(item => {
                if (item.title === 'Login') {
                    return {
                        ...item,
                        title: usernameresponse,
                        url: '/dashboard',
                        cName: 'nav-links',
                        icon: faUser
                    };
                } else if (item.title === 'Signup') {
                    return {
                        ...item,
                        title: 'Logout',
                        url: '/login',
                        cName: 'nav-links',
                        icon: null
                    };
                }
                return item;
            });
        }
        return SectionsData;
    };

    return (
        <div className='Sections'>
            <div className='menu-items' onClick={toggleMenu}>
                <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} className="menu-icon" />
            </div>
            <ul className='nav-items'>
                {getSectionsWithUser().map((item, index) => (
                    <li key={index}>
                        <div className={item.cName} onClick={() => handleNavigation(item.url)}>
                            {item.icon && <FontAwesomeIcon icon={item.icon} />} {item.title}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Sections;
