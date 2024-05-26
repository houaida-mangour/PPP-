import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage.js/HomePage.js';
import SignUpPage from './pages/SignUpPage/SignUpPage.js';
import LoginPage from './pages/LoginPage/LoginPage.js';
import ParticipantDashboard from './pages/ParticipantDashboard/ParticipantDashboard.js';
import Sidebar  from './Sidebar.js';

function App() {
  return(
    <div className="wrapp">
      <BrowserRouter>
        <Routes>
          <Route path="/Home" element={<HomePage />} />
          <Route path="/SignUp" element={<SignUpPage />} />
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/ParticipantDashboard/*" element={<ParticipantDashboard />} />
          
          <Route path="*" element={<h1>Page not found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  ) ;
}

export default App;
