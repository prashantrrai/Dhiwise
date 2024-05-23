// src/Pages/UsersPage/userspage.js

import React from 'react';
import UserDetails from '../../Components/UserDetails/userdetails';
import './userpage.css';

const UsersPage = () => {
    return (
        <div className="users-page-container">
            <UserDetails />
        </div>
    );
};

export default UsersPage;
