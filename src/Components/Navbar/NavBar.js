import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './NavBar.css';
import { logout } from '../../Slice/authSlice';
import { toast } from 'react-toastify';

const NavBar = () => {
    const { isLoggedIn, token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartItems = useSelector((state) => state.cart.items);
    const cartItemCount = cartItems.length;

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('token');
        toast.error('Logout successful!');
        navigate('/login');
    };

    return (
        <header className="header">
            <img src="https://imgs.search.brave.com/9y78KXWHifmAcxx0ERQdxqr8PyHYvFFHukHUhV65RDA/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9taXJv/Lm1lZGl1bS5jb20v/djIvMSpBY2x6Tk9p/bHFyckw5VmdvQTkx/SGh3LnBuZw" alt="DhiWise Logo" className="logo" />
            <nav className="nav">
                <Link to="/dashboard" className="nav-item">Dashboard</Link>
                <Link to="/product" className="nav-item">Products</Link>
                <Link to="/resources-support" className="nav-item">Resources & Support</Link>
                <Link to="/orders" className="nav-item">Orders</Link>
            </nav>

            <div className="cart">
                {isLoggedIn && token ? (
                    <div className="auth-buttons">
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                ) : (
                    <div className="auth-buttons">
                        <Link to="/login" className="sign-in">Sign in</Link>
                        <Link to="/signup" className="sign-up">Sign up for free</Link>
                    </div>
                )}
                <Link to={isLoggedIn && token ? '/cart' : '/login'} className="cart-icon">
                    <i className="fas fa-shopping-cart cart-icon"></i>
                    {cartItemCount > 0 && <span className="cart-count">{cartItemCount}</span>}
                </Link>
            </div>
        </header>
    );
};

export default NavBar;
