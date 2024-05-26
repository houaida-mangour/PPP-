import Navbar from "../../components/Navbar/Navbar";
import Eventlist from "../../components/Eventlist/Eventlist";
import Footer from "../../components/Footer/Footer";
import AboutUs from "../../components/AboutUs/AboutUs";
import Work from '../../components/Services/Services';
import Contact from "../../components/Contact/Contact";
import Team from "../../components/Team/Team";

import "./HomePage.css";


export default function HomePage() {
    return (
        <div className="Home">
            <Navbar />
            <div className='wrapper'>
            <Eventlist />
            <AboutUs />
            <Work />
            <Team />
            <Contact />
            </div>
            <Footer />
            
        </div> 
    );
}