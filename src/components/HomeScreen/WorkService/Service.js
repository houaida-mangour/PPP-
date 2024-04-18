import React from "react";
import Inscrit from "./inscri.jpg";
import Rooming from "./room.png";
import Comm from "./comm.png";
import "./Service.css";
const Work = () => {
  const workInfoData = [
    {
      image: Inscrit,
      title: "Participant Registration and Management",
      text: "Offer a comprehensive registration system for event participants, allowing organizers to create customized forms and manage attendee lists while ensuring data security and privacy compliance.",
    },
    {
        image: Rooming,
        title: "Streamlined Rooming and Catering Coordination",
        text: "The platform offers streamlined rooming management and catering coordination for event organizers.Additionally, organizers can plan menus, coordinate with vendors, and manage meal orders efficiently",
      },
    {
        image: Comm,
        title: "Event Promotion and Communication",
        text: "Provide tools for effective event promotion and communication, including customizable event pages with detailed information, social sharing features, and communication channels to keep participants informed.",
     },

  ];
  return (
    <div className="service-section-wrapper">
      <div className="service-section-top">
        <p className="primary-subheading"> Event Management platform</p>
        <h1 className="primary-heading">PLURIVENT</h1>
        <p className="primary-text">
        At PLURIVENT, we are passionate about simplifying event management. With a focus on innovation and user experience, we strive to
     provide comprehensive solutions that empower event organizers to create unforgettable experiences. Our platform offers intuitive tools
      for participant registration, streamlined rooming and catering coordination, and effective event promotion. Backed by a dedicated 
      team committed to excellence, we are here to support you every step of the way in bringing your vision to life.
      <br/>Explore our services today and let us help you create memorable experiences:
        </p>
      </div>
      <div className="service-section-bottom">
        {workInfoData.map((data) => (
          <div className="service-section-info" key={data.title}>
            <div className="info-boxes-img-container">
              <img src={data.image} alt="" />
            </div>
            <h2>{data.title}</h2>
            <p>{data.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;