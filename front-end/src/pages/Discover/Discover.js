import EventCard from "../../components/EventCard/EventCard";
import nrw from "../../components/Eventlist/nrw.jpeg"
import TCPC from "../../components/Eventlist/TCPC.jpg"
import './Discover.css'



export default function Discover() {


    return (
        <div>
            <h1>Check all the events and pick the best for you</h1>
            <div className="eventWrap">
                <EventCard sh="true" b="true" id="1" src={nrw} name="Nrw : The awaited robotics event" />
                <EventCard sh="true" b="true" id="2" src={TCPC} name="TCPC : A competitve programming event" />
            </div>
        </div>
    )

}