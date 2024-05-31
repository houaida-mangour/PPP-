import { Menu } from 'antd';
import { HomeOutlined , UnorderedListOutlined , UserOutlined , PoweroffOutlined} from '@ant-design/icons';
import { useNavigate, Route, Routes } from 'react-router-dom';
import Navbar from '../../components/NavbarParticipant/Navbar.js';
import Footer from '../../components/Footer/Footer.js';
import EventCard from '../../components/EventCard/EventCard.js';
import Discover from '../Discover/Discover.js';
import Discover2 from '../Discover2/Discover.js';
import EventPage from '../All-Events/All-Events.js';
import EventForm from '../../components/EventForm/EventForm.js';
import CreatedEvents from '../Created-Events/Created-Events.js';

export default function ParticipantDashboard() {
    const navigate = useNavigate() ;

    return (
       <div style={{position : "relative" , minHeight : "100vh"}}>
         <Navbar />
         <div style={{display : "flex"}}>
            <Menu 
                onClick={({key}) => {
                    if(key === "SignOut") {
                        //To be implemented
                    } else {
                        navigate(key) ;
                    }
                }}
                
                items = {[
                {
                    label : "All Events" ,
                    key : "All-Events",
                    icon : <HomeOutlined />
                } ,
                {
                    label : "Create Events" ,
                    key : "Create-Events",
                    icon : <UnorderedListOutlined />
                } ,
                {
                    label : "Created Events" ,
                    key : "Created-Events",
                    icon : <UnorderedListOutlined />
                } ,
                {
                    label : "Profile" ,
                    key : "Profile",
                    icon : <UserOutlined />
                } ,
                {
                    label : "Sign Out",
                    key : "SignOut",
                    icon : <PoweroffOutlined />,
                    danger : true
                } ,
            ]}>

            </Menu>
            <Content />
            
        </div>
        <div style={{marginTop : "150px"}} >
            <Footer />
            {/* style={{position : "absolute" , bottom : 0}} */}
        </div>
        
        
       </div>
    ) ;

}

function Content() {
    return (
        <div style={{flexGrow : 1}}>
            <Routes>
                <Route path="All-Events" element={<EventPage />} />
                <Route path="Create-Events" element={<EventForm />} />
                <Route path="Created-Events" element={<CreatedEvents />} />
                <Route path="Profile" element={<div>My Profile</div>} />

            </Routes>

        </div>
    )
}