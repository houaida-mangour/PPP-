import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import Eventlist from '../Eventlist/Eventlist';
import WorkService from '../WorkService/Service';
import Contact from '../Contact/Contact';
import Team from '../Team/Team';
import AboutUs from '../AboutUs/AboutUs'


function HomePage() {
  return (
    
    <div className="HomePage">

      <Navbar />
     <div className='container mx-auto min-h-screen px-2 mb-6'>
        <Eventlist/>
        <AboutUs/> 
        <WorkService/> 
        <Contact/>
        <Team/>
     </div> 

     <Footer/>
    </div>
  );
}

export default HomePage;

