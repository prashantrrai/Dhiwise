import React, { useEffect, useState } from 'react';
import { getUsers } from '../../Services/User/User';
import './userdetails.css';

const UserDetails = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getUsers();
                setUsers(data.response);
            } catch (error) {
                console.error('There was an error fetching the users!', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="user-details">
            <h1>User Details</h1>
            {users.length === 0 ? (
                <div className="notfound">
                    <p>No users found</p>
                </div>
            ) : (
                <div className="table-container">
                    <table className="user-table">
                        <thead>
                            <tr>
                                <th>Avatar</th>
                                <th>ID</th>
                                <th>Username</th>
                                <th>First Name</th>
                                <th>Middle Name</th>
                                <th>Last Name</th>
                                <th>Date of Birth</th>
                                <th>Gender</th>
                                <th>Address</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={user.id} className={index % 2 === 0 ? 'striped' : ''}>
                                    <td><img src={user.profile.avatarURL} alt="profile" className='profile' /></td>
                                    <td>{user._id}</td>
                                    <td>{user.username}</td>
                                    <td>{user.profile.firstName}</td>
                                    <td>{user.profile.middleName}</td>
                                    <td>{user.profile.lastName}</td>
                                    <td>{user.profile.DOB}</td>
                                    <td>{user.profile.sex}</td>
                                    <td>{user.profile.address}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.roleId.role}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default UserDetails;
