import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useridresponse } from '../Login/Login';
import './Profil.css'; 

const Profil = () => {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: '',
        newPassword: '',
    });

    const [editing, setEditing] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleUpdate = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            };

            const updateData = {
                username: userData.username,
                email: userData.email,
                password: userData.newPassword || userData.password,
            };

            const response = await axios.put(`http://localhost:8000/auth/update/${useridresponse}`, updateData, config);
            console.log(response.data.message);
            setEditing(false);
        } catch (error) {
            console.error('Error updating user:', error.response ? error.response.data.error : error.message);
        }
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                const config = {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                };
                const response = await axios.get(`http://localhost:8000/auth/${useridresponse}`, config);
                setUserData({
                    username: response.data.username,
                    email: response.data.email,
                    password: '',
                    newPassword: ''
                });
                console.log(response.data.username);
            } catch (error) {
                console.error('Error fetching user data:', error.response ? error.response.data.error : error.message);
            }
        };
        fetchUserData();
    }, []);

    return (
        <div className="profile-container">
            <h2 className="profile-title">{userData.username} Profile</h2>
            <div className="profile-field">
                <label>Username:</label>
                {editing ? (
                    <input type="text" name="username" value={userData.username} onChange={handleChange} className="profile-input" />
                ) : (
                    <div className="profile-value">{userData.username}</div>
                )}
            </div>
            <div className="profile-field">
                <label>Email:</label>
                {editing ? (
                    <input type="email" name="email" value={userData.email} onChange={handleChange} className="profile-input" />
                ) : (
                    <div className="profile-value">{userData.email}</div>
                )}
            </div>
            <div className="profile-field">
                <label>Password:</label>
                {editing ? (
                    <input type="password" name="password" value={userData.password} onChange={handleChange} className="profile-input" />
                ) : (
                    <div className="profile-value">******</div>
                )}
            </div>
            {editing && (
                <div className="profile-field">
                    <label>New Password:</label>
                    <input type="password" name="newPassword" value={userData.newPassword} onChange={handleChange} className="profile-input" />
                </div>
            )}
            {editing ? (
                <button onClick={handleUpdate} className="profile-button">Update</button>
            ) : (
                <button onClick={() => setEditing(true)} className="profile-button">Edit</button>
            )}
        </div>
    );
};

export default Profil;
