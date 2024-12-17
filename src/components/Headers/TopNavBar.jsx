import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineUser } from 'react-icons/ai';
import { FiPhone, FiMail } from 'react-icons/fi';

const TopNavBar = () => {
  return (
    <div className="bg-emerald-800 text-white py-2.5">
      <div className="flex w-full max-w-6xl mx-auto justify-between items-center px-5">
        {/* Left side - Contact info */}
        <div className="flex gap-5">
          <span className="flex items-center">
            <FiPhone className="mr-2" /> 
            660 695 776
          </span>
          <span className="flex items-center">
            <FiMail className="mr-2" /> 
            sklep@familybalance.pl
          </span>
        </div>

        {/* Right side - User icon */}
        <div className="flex items-center">
          <Link 
            to="/auth" 
            className="text-white text-2xl cursor-pointer transition-all duration-300 ease-in-out hover:scale-110 hover:text-gray-300"
          >
            <AiOutlineUser />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopNavBar;