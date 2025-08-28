// // import Dashboard from './Dashboard';
// // import './App.css';

// // function App() {
// //   return <Dashboard />;
// // }

// // export default App;

// import PropertyPage from './PropertyPage';
// import './App.css';

// function App() {
//   return <PropertyPage />;
// }

// export default App;

import React, { useState } from 'react';
import Navigation from './Navigation';
import Dashboard from './Dashboard';
import PropertyPage from './PropertyPage';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  return (
    <div className="App">
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      {currentPage === 'dashboard' ? <Dashboard /> : <PropertyPage />}
    </div>
  );
}

export default App;