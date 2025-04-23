import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineUser } from 'react-icons/ai';
import { FiPhone, FiMail } from 'react-icons/fi';

const TopNavBar = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };

  return (
    <div className="bg-emerald-800 text-white py-2.5">
      <div className="flex w-full max-w-6xl mx-auto justify-between items-center px-5">
        {/* Left side - Contact info */}
        <div className="flex gap-5">
          <a href="tel:533813285" className="flex items-center hover:text-gray-200 transition-colors" aria-label="Zadzwoń pod numer 533 813 285">
            <FiPhone className="mr-2" aria-hidden="true" /> 
            <span>533 813 285</span>
          </a>
          <a href="mailto:sklep@familybalance.pl" className="flex items-center hover:text-gray-200 transition-colors" aria-label="Wyślij email na adres sklep@familybalance.pl">
            <FiMail className="mr-2" aria-hidden="true" /> 
            <span>sklep@familybalance.pl</span>
          </a>
        </div>

        {/* Right side - User icon with dropdown */}
        <div 
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          ref={dropdownRef}
        >
          <Link 
            to="/auth"
            className="flex items-center"
            aria-label="Konto użytkownika"
            aria-expanded={isDropdownVisible}
            aria-haspopup="true"
          >
            <AiOutlineUser className="text-white text-2xl cursor-pointer transition-all duration-300 ease-in-out hover:scale-110 hover:text-gray-300" aria-hidden="true" />
            <span className="sr-only">Konto użytkownika</span>
          </Link>
          
          {/* Dropdown menu */}
          <div 
            className={`absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 
              transition-all duration-200 ease-in-out z-50
              ${isDropdownVisible ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-1 invisible pointer-events-none'}`}
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu-button"
          >
            {/* Triangle pointer */}
            <div className="absolute -top-2 right-4 w-4 h-4 bg-white transform rotate-45 border-l border-t border-gray-100" aria-hidden="true"></div>
            
            {/* Menu items */}
            <div className="relative bg-white rounded-lg overflow-hidden">
              <Link 
                to="/auth" 
                className="block px-4 py-3 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-800 transition-colors border-b border-gray-100"
                role="menuitem"
              >
                Zaloguj
              </Link>
              <Link 
                to="/auth" 
                className="block px-4 py-3 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-800 transition-colors"
                role="menuitem"
              >
                Zarejestruj
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNavBar;