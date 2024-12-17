import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineUser } from 'react-icons/ai';
import { FiPhone, FiMail } from 'react-icons/fi';
import './TopNavBar.css';

const TopNavBar = () => {
  return (
    <div className="top-nav-bar">
      <div className="top-nav-container">
        <div className="top-nav-left">
          <span><FiPhone /> 660 695 776</span>
          <span><FiMail /> sklep@familybalance.pl</span>
        </div>
        <div className="top-nav-right">
          <Link to="/auth" className="topnav-user-icon">
            <AiOutlineUser />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopNavBar;