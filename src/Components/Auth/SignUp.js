import React, { useState } from 'react';
import './SignUp.css';
import { Link } from 'react-router-dom';
import { SignUpService } from '../../Services/Auth/Signup';
import { toast } from 'react-toastify';

const SignUp = () => {
    const [formData, setFormData] = useState({
        username: '',
        profile: {
            firstName: '',
            middleName: '',
            lastName: '',
            DOB: '',
            sex: '',
            address: '',
            avatarURL: '',
        },
        email: '',
        password: '',
        phone: '',
        roleId: '',
        verificationStatus: {
            isActive: 1
        },
    });

    const handleChange = (e) => {
        const { name, value, checked } = e.target;

        if (name.startsWith('profile.')) {
            const profileField = name.split('.')[1];
            setFormData(prevFormData => ({
                ...prevFormData,
                profile: {
                    ...prevFormData.profile,
                    [profileField]: value
                }
            }));
        } else if (name === 'roleId') {
            setFormData(prevFormData => ({
                ...prevFormData,
                [name]: parseInt(value, 10)
            }));
        } else if (name === 'isActive') {
            setFormData(prevFormData => ({
                ...prevFormData,
                verificationStatus: {
                    ...prevFormData.verificationStatus,
                    isActive: checked ? 1 : 0
                }
            }));
        } else {
            setFormData(prevFormData => ({
                ...prevFormData,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await SignUpService(formData);
            setFormData({
                username: '',
                profile: {
                    firstName: '',
                    middleName: '',
                    lastName: '',
                    DOB: '',
                    sex: '',
                    address: '',
                    avatarURL: '',
                },
                email: '',
                password: '',
                phone: '',
                roleId: '',
                verificationStatus: {
                    isActive: ''
                },
            });
            toast.success('Registration successfull');

        } catch (error) {
            console.error('There was an error registering the user!', error);
            toast.error('Failed to Register. Please check all the fields.');
        }
    };

    return (
        <div className='wrap'>
            <h1 className='heading'>Register User</h1>

            <form className="user-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>First Name:</label>
                    <input
                        type="text"
                        name="profile.firstName"
                        value={formData.profile.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Middle Name:</label>
                    <input
                        type="text"
                        name="profile.middleName"
                        value={formData.profile.middleName}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Last Name:</label>
                    <input
                        type="text"
                        name="profile.lastName"
                        value={formData.profile.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Date of Birth:</label>
                    <input
                        type="date"
                        name="profile.DOB"
                        value={formData.profile.DOB}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Sex:</label>
                    <select
                        name="profile.sex"
                        value={formData.profile.sex}
                        onChange={handleChange}
                    >
                        <option value="">Select Sex</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Address:</label>
                    <input
                        type="text"
                        name="profile.address"
                        value={formData.profile.address}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Phone:</label>
                    <input
                        type="text"
                        name="phone"
                        maxLength={10}
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Role:</label>
                    <select
                        name="roleId"
                        value={formData.roleId}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Role</option>
                        <option value={1}>Admin</option>
                        <option value={2}>Employee</option>
                        <option value={3}>Customer</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Active:</label>
                    <label className="switch">
                        <input
                            type="checkbox"
                            name="isActive"
                            checked={formData.verificationStatus.isActive === 1}
                            onChange={handleChange}
                        />
                        <span className="slider round"></span>
                    </label>
                </div>
                <button type="submit">Register</button>

            </form>
            <p className="login-link">
                Already Registered? <Link to="/login">Login</Link>
            </p>
        </div>


    );
};

export default SignUp;
