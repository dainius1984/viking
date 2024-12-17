import React, { useState, useCallback, useRef } from 'react';
import { AiOutlineShoppingCart, AiOutlineHeart } from 'react-icons/ai';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import categories from '../../Data/category-data';

const Header = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const { state } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const cartItemsCount = state?.cart?.reduce((sum, item) => sum + (item.quantity || 0), 0) || 0;
  const wishlistCount = state?.wishlist?.length || 0;

  // Extracted common styles
  const navLinkStyles = "text-emerald-800 font-bold hover:text-emerald-900 transition-colors text-[17px]";
  const iconStyles = "relative flex items-center text-2xl text-emerald-800 hover:scale-110 transition-transform cursor-pointer";
  const counterStyles = "absolute -top-2 -right-2 min-w-[18px] h-[18px] flex items-center justify-center text-xs text-white bg-emerald-800 rounded-full px-1 font-bold border-2 border-white";

  const handleMouseMove = (e) => {
    if (!dropdownRef.current) return;
    
    const dropdownRect = dropdownRef.current.getBoundingClientRect();
    const dropdownMenu = dropdownRef.current.querySelector('ul');
    
    if (!dropdownMenu) {
      setDropdownVisible(false);
      return;
    }
    
    const menuRect = dropdownMenu.getBoundingClientRect();
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const buffer = 20;
    
    // Create a rectangle that encompasses both the dropdown trigger and menu, plus buffer
    const safeZone = {
      left: Math.min(dropdownRect.left, menuRect.left) - buffer,
      right: Math.max(dropdownRect.right, menuRect.right) + buffer,
      top: Math.min(dropdownRect.top, menuRect.top) - buffer,
      bottom: Math.max(dropdownRect.bottom, menuRect.bottom) + buffer
    };

    const isInSafeZone = 
      mouseX >= safeZone.left && 
      mouseX <= safeZone.right && 
      mouseY >= safeZone.top && 
      mouseY <= safeZone.bottom;

    if (!isInSafeZone) {
      setDropdownVisible(false);
    }
  };

  // Add event listener for mouse movement
  React.useEffect(() => {
    if (isDropdownVisible) {
      document.addEventListener('mousemove', handleMouseMove);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isDropdownVisible]);

  const handleMouseEnter = useCallback(() => {
    setDropdownVisible(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    // We don't immediately hide the dropdown anymore
    // The handleMouseMove function will handle that
  }, []);

  const handleShopClick = useCallback((e) => {
    e.preventDefault();
    navigate('/category');
  }, [navigate]);

  const handleOrderClick = useCallback((e) => {
    e.preventDefault();
    if (location.pathname === '/koszyk') {
      navigate('/category');
    } else {
      navigate('/koszyk');
    }
  }, [location.pathname, navigate]);

  const renderNavLink = (to, text, onClick = null) => (
    onClick ? (
      <a href="#" onClick={onClick} className={navLinkStyles}>
        {text}
      </a>
    ) : (
      <Link to={to} className={navLinkStyles}>
        {text}
      </Link>
    )
  );

  const renderCounter = (count) => (
    <span className={counterStyles}>
      {count}
    </span>
  );

  return (
    <div className="relative bg-white border-b border-gray-200">
      <div className="flex flex-col md:flex-row w-full max-w-6xl mx-auto justify-between items-center px-5 py-4">
        {/* Logo */}
        <div className="w-full md:w-auto flex justify-center mb-4 md:mb-0">
          <Link to="/">
            <img 
              src="/img/logo.jpg" 
              alt="Family Balance" 
              className="h-12 md:h-14 transition-transform hover:scale-105"
            />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="w-full md:flex-1 mx-0 md:mx-5">
          <ul className="flex flex-col md:flex-row gap-4 md:gap-8 items-center justify-center p-0 m-0">
            <li>{renderNavLink("/", "Strona główna")}</li>
            
            {/* Dropdown */}
            <li 
              ref={dropdownRef}
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <a 
                href="#" 
                onClick={handleShopClick}
                className={`${navLinkStyles} flex items-center`}
              >
                Sklep
                <span className={`ml-1 transition-transform duration-200 ease-in-out ${isDropdownVisible ? 'rotate-180' : ''}`}>
                  ▾
                </span>
              </a>
              
              {/* Category Dropdown Menu */}
              {/* Category Dropdown Menu */}
              <ul 
                className={`absolute left-1/2 transform -translate-x-1/2 w-60 bg-white border border-gray-200 rounded-lg shadow-lg 
                  transition-all duration-300 ease-in-out z-50 mt-2
                  md:mt-2 md:left-1/2 md:-translate-x-1/2
                  max-h-[80vh] overflow-y-auto
                  ${isDropdownVisible 
                    ? 'opacity-100 translate-y-0 visible' 
                    : 'opacity-0 translate-y-2 invisible pointer-events-none'}`}
              >
                  <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 rotate-45 w-3 h-3 bg-white border-l border-t border-gray-200"></div>
                  {categories.map((category, index) => (
                    <li key={index} className="border-b border-gray-100 last:border-none">
                      <Link 
                        to={`/category/${category.slug}`}
                        className="relative flex h-12 items-center px-5 text-[15px] text-gray-700 hover:text-emerald-800 hover:bg-gray-50 transition-all
                          before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 
                          before:w-1 before:h-0 hover:before:h-2/3 before:bg-emerald-800 before:transition-all
                          whitespace-nowrap overflow-hidden text-ellipsis"
                      >
                        {category.title}
                      </Link>
                    </li>
                  ))}
                </ul>
            </li>
            
            <li>{renderNavLink("#", "Zamówienie", handleOrderClick)}</li>
            <li>{renderNavLink("/blog", "Blog")}</li>
            <li>{renderNavLink("/auth", "Moje konto")}</li>
          </ul>
        </nav>

        {/* Icons */}
        <div className="flex gap-5 mt-4 md:mt-0">
          <Link to="/koszyk" className={iconStyles}>
            <AiOutlineShoppingCart />
            {renderCounter(cartItemsCount)}
          </Link>
          <Link to="/wishlist" className={iconStyles}>
            <AiOutlineHeart />
            {renderCounter(wishlistCount)}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;