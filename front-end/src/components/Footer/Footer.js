import React from 'react';
import logo from './logo.png';
import { IoMdContact } from 'react-icons/io';
import { MdEmail } from 'react-icons/md';
import { SiGooglemaps } from 'react-icons/si';
import {
  FaFacebookSquare,
  FaInstagram,
  FaLinkedin
} from 'react-icons/fa';
import './Footer.css';

const SocialIcon = ({ icon: Icon }) => (
  <Icon className="social-icon hover:text-[#d18100]" size={30} />
);

function Footer() {
  const items = [
    { type: 'icon', icon: FaFacebookSquare },
    { type: 'icon', icon: FaInstagram },
    { type: 'icon', icon: FaLinkedin },
    { type: 'section', title: <strong>Quick Links:</strong>, items: [
        <a key="home" href="#">Home</a>,
        <a key="about" href="#AboutUs">About Us</a>,
        <a key="services" href="#work-service">Services</a>,
        <a key="events" href="#">Events</a>
      ] },
    { type: 'section', title: <strong>Contact</strong>, items: [
        'PLURIVENT',
        <><IoMdContact /> +21600000000</>,
        <><MdEmail /> PLURIVENT@gmail.com</>,
        <><SiGooglemaps />INSAT, Centre Urabain Nord</>
      ] },
    { type: 'section', title: <strong>Account</strong>, items: [
        <a key="signup" href="#">Signup</a>,
        <a key="login" href="#">Login</a>
      ] },
    { type: 'image', imageUrl: './logo.png' }
  ];

  return (
    <footer className='bg-footer py-4 px-4 grid lg:grid-cols-3 gap-8 w-full'>
      <div> 
        <h1 className='footer-brand'>PLURIVENT    "EVENT MANAGEMENT PLATFORM"</h1>
    
        <p className='footer-description'>
          PLURIVENT offers a tailored web platform for seamless event registration, featuring intuitive handling of rooming and catering 
          needs. Our goal is to empower event organizers with a comprehensive solution that simplifies every aspect of attendee management,
          from registration to accommodation and catering requests.
        </p>
        <div className='flex justify-between md:w-[75%] my-6'>
          {items.map((item, index) => (
            item.type === 'icon' ? (
              <SocialIcon key={index} icon={item.icon} />
            ) : null
          ))}
        </div>
      </div>
      <div className='lg:col-span-2 flex justify-between mt-6'>
        {items.map((item, index) => (
          item.type === 'section' ? (
            <div key={index}>
              <h6 className="footer-section-title">{item.title}</h6>
              {item.items.map((subItem, subIndex) => (
                <div key={subIndex} className="footer-list-item">{subItem}</div>
              ))}
            </div>
          ) : item.type === 'image' ? ( 
            <div key={index}>
              <img src={logo} alt="PLURIVENT Logo" className="footer-logo" />
            </div>
          ) : null
        ))}
      </div>
    </footer>
  );
}

export default Footer;
