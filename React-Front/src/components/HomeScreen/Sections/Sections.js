import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { SectionsData } from './SectionsData'; 
import './Sections.css';

function Sections() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen); 
    };

    return (
        <div className='Sections'>
            <div className='menu-items' onClick={toggleMenu}>
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
