import { Menu } from 'antd';
import { HomeOutlined , UnorderedListOutlined , UserOutlined , PoweroffOutlined} from '@ant-design/icons';
import { useNavigate, Route, Routes } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar.js';
import Footer from '../../components/Footer/Footer.js';
import EventPagedash from '../EventPage/EventPagedash.js';
import EventForm from '../../components/EventForm/EventForm.js';
import MyEvents from '../../components/MyEvents/MyEvents.js';
import MyTickets from '../../components/MyTickets/MyTickets.js';
import Profil from '../../components/Profil/Profil.js';

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
                        label : "Profile" ,
                        key : "profil",
                        icon : <UserOutlined />
                } ,
                {
                    label : "All Events" ,
                    key : "eventpagedash",
                    icon : <HomeOutlined />
                } ,
                {
                    label : "Create Events" ,
                    key : "eventform",
                    icon : <UnorderedListOutlined />
                } ,
                {
                    label : "Organized Events",
                    key : "myevents",
                    icon : <UnorderedListOutlined />
                } ,
                {
                    label : "Participated Events",
                    key : "mytickets",
                    icon : <UnorderedListOutlined />
                } ,
 

            ]}>

            </Menu>
            <Content />
            
        </div>
        <div style={{marginTop : "150px"}} >
            <Footer />
        </div>
        
        
       </div>
    ) ;

}

function Content() {
    return (
        <div style={{flexGrow : 1}}>
            <Routes>
                <Route path="eventpagedash" element={<EventPagedash />} />
                <Route path="eventform" element={<EventForm />} />
                <Route path="myevents" element={<MyEvents />} />
                <Route path="mytickets" element={<MyTickets />} />
                <Route path="profil" element={<Profil />} />


            </Routes>

        </div>
    )
}