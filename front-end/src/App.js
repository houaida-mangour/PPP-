import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage.js/HomePage.js';
import SignUpPage from './pages/SignUpPage/SignUpPage.js';
import SignUpPage2 from './pages/SignUpPage2/SignUpPage2.js';
import LoginPage from './pages/LoginPage/LoginPage.js';
import LoginPage2 from './pages/LoginPage2/LoginPage2.js';
import ForgotPassword from './pages/ForgotPassworf/ForgotPassword.js';
import ResetPassword from './pages/ResetPasswordPage/ResetPassword';
import Dashboard from './pages/Dashboard/Dashboard';
import Dashboard2 from './pages/Dashboard2/Dashboard.js';
import EventForm from './components/EventForm/EventForm.js';
import EventPage from './pages/EventPage/EventPage.js';

import EventDetails from './components/EventDetails/EventDetails.js';

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/SignUp" element={<SignUpPage />} />
          <Route path="/SignUp2" element={<SignUpPage2 />} />
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/Login2" element={<LoginPage2 />} />

          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/resetPassword/:token" element={<ResetPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard2/*" element={<Dashboard2 />} />
          <Route path="/eventform" element={<EventForm />} />
          <Route path="/eventpage" element={<EventPage />} />
          <Route path="/eventdetails/:id" element={<EventDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
