import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import InventoryPage from './pages/Inventory/InventoryPage'; // Ton tableau d’inventaire principal
// Tu peux ajouter d'autres pages ici

function App() {
  return (
    <Router>
      <div>
  

        <main style={{ padding: '2rem' }}>
          <Routes>
            <Route path="/" element={<InventoryPage />} />
            {/* Autres routes */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
