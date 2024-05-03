import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage.js/HomePage.js';
import SignUpPage from './pages/SignUpPage/SignUpPage.js';
import LoginPage from './pages/LoginPage/LoginPage.js';
import EventsPage from './pages/EventsPage/EventsPage.js';

function App() {
  return(
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/Home" element={<HomePage />} />
          <Route path="/SignUp" element={<SignUpPage />} />
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/EventsPage" element={<EventsPage />} />

          <Route path="*" element={<h1>Page not found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  ) ;
}

export default App;
