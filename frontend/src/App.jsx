import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import ProductList from './pages/ProductList';
import PriceList from './pages/PriceList';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/prices" element={<PriceList />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
