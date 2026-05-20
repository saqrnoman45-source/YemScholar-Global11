import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import FieldsPage from './pages/Fields';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fields" element={<FieldsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
