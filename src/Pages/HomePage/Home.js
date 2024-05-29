import React from 'react';
import './Home.css';

const Home = () => {
    return (
        <div className="home">
            <main className="main-content">
                <h1>Developer Productivity Solved</h1>
                <p>Build Front-end and Web applications at blazing fast speed without compromising on code-quality and developer-experience.</p>
                <div className="action-buttons">
                    <a href="#" className="sign-up-main">Sign Up for Free</a>
                    <a href="#" className="install-plugin">Install Figma Plugin</a>
                </div>
                <div className="video-container">
                    <a href="#" className="video-link">See how to get started with DhiWise in 60 secs Watch now</a>
                </div>
            </main>
        </div>
    );
};

export default Home;
