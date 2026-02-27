import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import './Dashboard.css';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await authAPI.getMe();
        setUser(response.data.user);
      } catch (error) {
        console.error('Failed to fetch user:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-box">
        <div className="glow-effect"></div>
        
        <div className="content">
          <h1 className="hello-text">
            <span className="letter">h</span>
            <span className="letter">e</span>
            <span className="letter">l</span>
            <span className="letter">l</span>
            <span className="letter">o</span>
            <span className="space"></span>
            <span className="letter">b</span>
            <span className="letter">r</span>
            <span className="letter">o</span>
            <span className="letter">t</span>
            <span className="letter">h</span>
            <span className="letter">e</span>
            <span className="letter">r</span>
          </h1>
          
          <div className="user-badge">
            <div className="avatar">
              {user?.username?.charAt(0).toUpperCase()}
            </div>
            <div className="user-info">
              <span className="username">{user?.username}</span>
              <span className="email">{user?.email}</span>
            </div>
          </div>
        </div>
        
        <button className="logout-button" onClick={handleLogout}>
          <span>Logout</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
        </button>
      </div>
      
      <div className="floating-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>
    </div>
  );
};

export default Dashboard;
