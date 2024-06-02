import React from "react";
import "./AboutUs.css";
import eventVideo from "./pub.mp4"; 

function AboutUs() {
    return (
        <div id="AboutUs">
            <div>
                <div className="Wrap">
                    <p className="primary-subheading"> PLURIVENT</p>
                    <p className="primary-subheading"> "EVENT MANAGEMENT PLATFORM"</p>

                    <p className="description">
                        At <b>PLURIVENT</b>, we are passionate about simplifying event management. With a focus on innovation and user experience, we strive to
                        provide comprehensive solutions that empower event organizers to create unforgettable experiences. Our platform offers intuitive tools
                        for participant registration, streamlined rooming and catering coordination, and effective event promotion. Backed by a dedicated
                        team committed to excellence, we are here to support you every step of the way in bringing your vision to life.
                    </p>
                    <video className="eventvideo" src={eventVideo} alt="Illustration of people planning an event" controls></video>
                </div>
            </div>
            <p className="primary-subheading"> "DISCOVER OUR EVENTS"</p>

        </div>
    );
}

export default AboutUs;
