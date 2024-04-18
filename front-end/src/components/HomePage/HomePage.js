import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import Eventlist from '../Eventlist/Eventlist';



function HomePage() {
  return (
    <div className="HomePage">
      <Navbar />
     <div className='container mx-auto min-h-screen px-2 mb-6'>
        <Eventlist/>
     </div> 
     <Footer/>
    </div>
  );
}

export default HomePage;

