import Navbar from "../../components/Navbar/Navbar";
import Eventlist from "../../components/Eventlist/Eventlist";
import Footer from "../../components/Footer/Footer";


export default function HomePage() {
    return (
        <div>
            <Navbar />
            <Eventlist />
            <Footer />
        </div>
    );
}