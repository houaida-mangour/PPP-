import React from "react";
import "./AboutUs.css";
import event1 from "./event.jpg";


function AboutUs() {


    return (
        <div id="AboutUs">
            <div>
                <div className="Wrap">
                    <p className="primary-subheading"> PLURIVENT</p>

                    <p class="description">
                        At <mark>PLURIVENT</mark>, we are passionate about simplifying event management. With a focus on innovation and user experience, we strive to
                        provide comprehensive solutions that empower event organizers to create unforgettable experiences. Our platform offers intuitive tools
                        for participant registration, streamlined rooming and catering coordination, and effective event promotion. Backed by a dedicated
                        team committed to excellence, we are here to support you every step of the way in bringing your vision to life.
                    </p>
                    <img src={event1} alt="Illustration of people planning an event" />
                </div>
            </div>
        </div>);
}

export default AboutUs;