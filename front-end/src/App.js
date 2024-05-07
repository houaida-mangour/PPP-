import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage.js/HomePage.js';
import SignUpPage from './pages/SignUpPage/SignUpPage.js';
import LoginPage from './pages/LoginPage/LoginPage.js';
import ForgotPassword from './pages/ForgotPassworf/ForgotPassword.js';
import ResetPassword from './pages/ResetPasswordPage/ResetPassword';
import Dashboard from './pages/Dashboard/Dashboard';


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
</Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
