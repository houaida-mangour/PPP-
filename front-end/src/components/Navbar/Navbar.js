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
            {/* 
            <div className='col-span-3'>
                <form className='w-full text-sm bg-drGray rounded flex-btn gap-4'>
                    <input type='text' className='bg-white w-full h-12 rounded text-gray-700 placeholder-gray-500 px-4 outline-none' placeholder='Search Event By Name...' />
                    <button type='submit' className='bg-subMain w-8 h-6 rounded flex items-center justify-center'>
                    <FontAwesomeIcon icon={faSearch} />
                    </button>
                </form>
            </div>
            */}


         <Sections />  
            
        </header>
    );
}

export default Navbar;

