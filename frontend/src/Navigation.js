import React from 'react';

const Navigation = ({ currentPage, setCurrentPage }) => {
  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-brand">
          <h2>Flex Living</h2>
        </div>
        
        <div className="nav-links">
          <button 
            className={`nav-link ${currentPage === 'dashboard' ? 'active' : ''}`}
            onClick={() => setCurrentPage('dashboard')}
          >
            Manager Dashboard
          </button>
          <button 
            className={`nav-link ${currentPage === 'property' ? 'active' : ''}`}
            onClick={() => setCurrentPage('property')}
          >
            Property Display
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;