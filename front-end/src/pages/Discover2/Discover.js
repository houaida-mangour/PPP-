import EventCard from "../../components/EventCard/EventCard";
import nrw from "../../components/Eventlist/nrw.jpeg"
import TCPC from "../../components/Eventlist/TCPC.jpg"
import obj1 from "../obj";
import './Discover.css'



export default function Discover() {


    return (
        <div>
            <h1>Your Events</h1>
            <div className="eventWrap">
                <EventCard sh={obj1[1]} id="1" src={nrw} name="Nrw : The awaited robotics event" />
                <EventCard sh={obj1[2]} id="2" src={TCPC} name="TCPC : A competitve programming event" />
            </div>
        </div>
    )

}