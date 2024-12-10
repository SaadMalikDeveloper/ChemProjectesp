import React from 'react';

const Header = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100;
  return (
    <header>
      <h1 className='logo'>LOGO</h1>
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>
    </header>
  );
};

export default Header;
