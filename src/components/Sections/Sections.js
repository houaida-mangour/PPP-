import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'; // Importez les icônes des bars et de la croix
import { SectionsData } from './SectionsData'; 
import './Sections.css';

function Sections() {
    const [isMenuOpen, setIsMenuOpen] = useState(false); // État pour suivre si le menu est ouvert ou fermé

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen); // Inversez l'état du menu à chaque clic
    };

    return (
        <div className='Sections'>
            <div className='menu-items' onClick={toggleMenu}>
                {/* Utilisez l'icône des bars ou de la croix en fonction de l'état */}
                <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} className="menu-icon" />
            </div>
            <ul className='nav-items'>
                {SectionsData.map((item, index) => (
                    <li key={index}> 
                        <a href={item.url} className={item.cName}>
                            <FontAwesomeIcon icon={item.icon} /> {item.title}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sections;
