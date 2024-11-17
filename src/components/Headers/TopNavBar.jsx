// src/components/TopNavBar.jsx
import React from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { FiPhone, FiMail } from 'react-icons/fi'; // Adding icons for phone and email
import './TopNavBar.css';

const TopNavBar = () => {
  return (
    <div className="top-nav-bar">
      <div className="top-nav-container">
        <div className="top-nav-left">
          <span><FiPhone /> 660 695 776</span>
          <span><FiMail /> sklep@vi-king.pl</span>
        </div>
        <div className="top-nav-right">
          <a href="/account" className="topnav-user-icon">
            <AiOutlineUser />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopNavBar;
