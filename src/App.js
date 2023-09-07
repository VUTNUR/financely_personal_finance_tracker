import './App.css';
import Dashboard from './pages/Dashboard';
import Signup from './pages/Signup';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
        <Routes>
            <Route path='/' element={<Signup />} />
            <Route path='/dashboard' element={<Dashboard />}/>
        </Routes>
    </Router>
  );
}

export default App;
