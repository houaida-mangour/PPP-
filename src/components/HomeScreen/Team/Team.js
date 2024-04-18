import React from "react";
import { MdEmail } from 'react-icons/md';
import "./Team.css";
import Houaida from "./houaida.jpeg";
import Ahmed from "./ahmed.jpeg";
import MedAli from "./med ali.jpeg";
import Eya from "./eya.jpeg";

function Team () {
    return (
        <div id="Team">
      <section className="section-white">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h2 className="section-title">The Team Behind PLURIVENT</h2>
              <p className="section-subtitle">At PLURIVENT, our team is the heart of our success. Comprised of dedicated professionals with diverse expertise <br/> Meet the faces behind PLURIVENT and discover the commitment and creativity that define us.</p>
            </div>
            <div className="team-container">
              <div className="team-item">
                <img
                  src={Houaida}
                  className="team-img"
                  alt="pic"
                />
                <h3>Mangour Houaida</h3>            
                <div className="team-info"><p>co-founder of PLURIVENT</p></div>
                <p><MdEmail /> <a href="mailto:houaida.mangour@insat.ucar.tn" typeof="email">houaida.mangour@insat.ucar.tn</a></p>
              </div>
              <div className="team-item">
                <img
                  src={Ahmed}
                  className="team-img"
                  alt="pic"
                />
                <h3>Toufehi Ahmed</h3>
                <div className="team-info"><p>co-founder of PLURIVENT</p></div>
                <p><MdEmail /> <a href="mailto:ahmed.toufahi@insat.ucar.tn" typeof="email">ahmed.toufahi@insat.ucar.tn</a></p>

              </div>
              <div className="team-item">
                <img
                  src={MedAli}
                  className="team-img"
                  alt="pic"
                />
                <h3> Toufahi Mohamed Ali</h3>
                <div className="team-info"><p>co-founder of PLURIVENT</p></div>
                <p><MdEmail /> <a href="mailto:mohamedali.toufahi@insat.ucar.tn" typeof="email">mohamedali.toufahi@insat.ucar.tn</a></p>
              </div>
              <div className="team-item">
                <img
                  src={Eya}
                  className="team-img"
                  alt="pic"
                />
                <h3>Ben Youssef Eya</h3>            
                <div className="team-info"><p>co-founder of PLURIVENT</p></div>
                <p><MdEmail /> <a href="mailto:eya.benyoussef@insat.ucar.tn" typeof="email">eya.benyoussef@insat.ucar.tn</a></p>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
    );
}

export default Team;
