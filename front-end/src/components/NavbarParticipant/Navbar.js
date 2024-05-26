import React from 'react';
import logoPj from './logoPj.png';
import './Navbar.css';
import Sections from '../Sections/Sections';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSearch}  from '@fortawesome/free-solid-svg-icons' ;



function Navbar() {
    return (
        <header className='navbar'>
            <div className="left-section">
                <img src={logoPj} className="logoapp" alt="logoPj" />
                <h1 className="name">PLURIVENT</h1>
            </div>
            


         <p style={{marginRight : "15px"}}>Weclome Ahmed !</p>  
            
        </header>
    );
}

export default Navbar;

