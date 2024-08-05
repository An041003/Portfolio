import React from 'react';
import './SkillProgress.css'; // File CSS để định dạng

const SkillProgress = ({ skill, years, progress }) => {
  return (
    <div className="skill-progress">
        <div className="skill-text">
          <p>{skill}</p>
          <p>{years}</p>
          <p className="progress-value">{progress}%</p>
        </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
        
      </div>
    </div>
  );
};

export default SkillProgress;