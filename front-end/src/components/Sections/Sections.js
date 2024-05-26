import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SectionsData } from './SectionsData';
import { Link } from 'react-router-dom';
import Axios from 'axios'; // Importer Axios
import { faBars, faTimes, faUser } from '@fortawesome/free-solid-svg-icons';

import './Sections.css';

function Sections() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user, setUser] = useState(null); // État pour stocker les informations de l'utilisateur

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
        console.log("User state changed:", user); // Ajout d'une console.log pour voir l'état de l'utilisateur
        if (!user) {
            // Réinitialiser l'utilisateur après la déconnexion
            setIsMenuOpen(false); // Fermer le menu si ouvert
        }
    }, [user]);

    // Fonction pour remplacer le bouton "Login" par le nom d'utilisateur et le bouton "Signup" par le bouton de déconnexion si l'utilisateur est connecté
    const getSectionsWithUser = () => {
        if (user) {
            return SectionsData.map(item => {
                if (item.title === 'Login') {
                    return {
                        ...item,
                        title: user.username,
                        url: '/dashboard', // ou toute autre URL appropriée pour le lien vers le tableau de bord
                        cName: 'nav-links', // ou toute autre classe CSS appropriée
                        icon: null // Retirer l'icône pour le nom d'utilisateur
                    };
                } else if (item.title === 'Signup') {
                    return {
                        ...item,
                        title: 'Logout',
                        url: '/login', // Modifier l'URL pour la déconnexion
                        cName: 'nav-links', // ou toute autre classe CSS appropriée
                        icon: null // Retirer l'icône pour le bouton de déconnexion
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
                        <Link to={item.url} className={item.cName}>
                            {item.icon && <FontAwesomeIcon icon={item.icon} />} {item.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Sections;
