// DetailedPlan.js

import React from 'react';
import './DetailedPlan.css';

const DetailedPlan = ({ detailedPlan }) => {
  const planItems = detailedPlan.split('\n').filter(item => item.trim() !== '');

  return (
    <div className="detailed-plan-container">
      <h2 className="detailed-plan-title"><b>Detailed Plan Of Our Event</b></h2>
      <ul className="detailed-plan-list">
        {planItems.map((item, index) => (
          <li key={index} className="detailed-plan-item">{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default DetailedPlan;
