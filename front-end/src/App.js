import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage.js/HomePage.js';
import SignUpPage from './pages/SignUpPage/SignUpPage.js';
import LoginPage from './pages/LoginPage/LoginPage.js';
import ForgotPassword from './pages/ForgotPassworf/ForgotPassword.js';
import ResetPassword from './pages/ResetPasswordPage/ResetPassword';
import Dashboard from './pages/Dashboard/Dashboard';
import EventForm from './components/EventForm/EventForm.js';
import UpdateEvent from './components/EventForm/UpdateEvent.js';
import EventPage from './pages/EventPage/EventPage.js';
import {EventDetails} from './components/EventDetails/EventDetails.js';
import ParticipantForm from './components/ParticipantForm/ParticipantForm.js';
import ParticipantsPage from './pages/ParticipantsPage/ParticipantsPage.js';

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/SignUp" element={<SignUpPage />} />
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/resetPassword/:token" element={<ResetPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/eventform" element={<EventForm />} />
          <Route path="/eventpage" element={<EventPage />} />
          <Route path="/eventdetails/:id" element={<EventDetails />} />
          <Route path="/updateevent/:id" element={<UpdateEvent />} />
          <Route path="/participateform/:id" element={<ParticipantForm />} />
          <Route path="/participantspage/:id" element={<ParticipantsPage />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
