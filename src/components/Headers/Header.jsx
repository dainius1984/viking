import React, { useState, useCallback, useRef, useEffect, memo, useMemo } from 'react';
import { AiOutlineShoppingCart, AiOutlineHeart } from 'react-icons/ai';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import categories from '../../Data/category-data';

// Throttle function to limit how often a function can run
const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Memoized category item component
const CategoryItem = memo(({ category, onClick }) => (
  <Link
    to={`/category/${category.slug}`}
    onClick={onClick}
    className="flex items-center justify-between px-4 py-3.5 rounded-lg text-gray-700 hover:bg-emerald-50/60 active:bg-emerald-50 hover:text-emerald-800 transition-colors group"
  >
    <span className="text-base font-medium">{category.title}</span>
    <span className="w-6 h-6 flex items-center justify-center rounded-full bg-white text-gray-400 group-hover:bg-emerald-100 group-hover:text-emerald-800 transition-colors">
      →
    </span>
  </Link>
));

// Memoized cart icon component
const CartIcon = memo(({ iconStyles, counterStyles, cartItemsCount }) => (
  <Link 
    to="/koszyk" 
    className={iconStyles}
    aria-label={`Koszyk${cartItemsCount > 0 ? `, ${cartItemsCount} ${cartItemsCount === 1 ? 'produkt' : 'produktów'}` : ''}`}
  >
    <AiOutlineShoppingCart aria-hidden="true" />
    {cartItemsCount > 0 && (
      <span className={counterStyles} aria-hidden="true">
        {cartItemsCount}
      </span>
    )}
    <span className="sr-only">
      Koszyk{cartItemsCount > 0 ? `, ${cartItemsCount} ${cartItemsCount === 1 ? 'produkt' : 'produktów'}` : ''}
    </span>
  </Link>
));

// Memoized wishlist icon component
const WishlistIcon = memo(({ iconStyles, counterStyles, wishlistCount }) => (
  <Link 
    to="/wishlist" 
    className={iconStyles}
    aria-label={`Lista życzeń${wishlistCount > 0 ? `, ${wishlistCount} ${wishlistCount === 1 ? 'produkt' : 'produktów'}` : ''}`}
  >
    <AiOutlineHeart aria-hidden="true" />
    {wishlistCount > 0 && (
      <span className={counterStyles} aria-hidden="true">
        {wishlistCount}
      </span>
    )}
    <span className="sr-only">
      Lista życzeń{wishlistCount > 0 ? `, ${wishlistCount} ${wishlistCount === 1 ? 'produkt' : 'produktów'}` : ''}
    </span>
  </Link>
));

const Header = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const { state } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTransparent, setIsTransparent] = useState(location.pathname === '/');
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [useDefaultLogo, setUseDefaultLogo] = useState(false);

  const cartItemsCount = useMemo(() => 
    state?.cart?.reduce((sum, item) => sum + (item.quantity || 0), 0) || 0
  , [state?.cart]);
  
  const wishlistCount = useMemo(() => 
    state?.wishlist?.length || 0
  , [state?.wishlist]);

  // Check if white logo exists
  useEffect(() => {
    if (isTransparent) {
      const img = new Image();
      img.onload = () => {
        setLogoLoaded(true);
        setUseDefaultLogo(false);
      };
      img.onerror = () => {
        setLogoLoaded(true);
        setUseDefaultLogo(true);
      };
      img.src = '/img/logo-white.png';
    } else {
      setLogoLoaded(true);
    }
  }, [isTransparent]);

  // Extracted common styles
  const isHomePage = location.pathname === '/';
  const navLinkStyles = useMemo(() => 
    `font-medium transition-colors text-sm md:text-[17px] ${isHomePage ? 'text-white hover:text-gray-200' : 'text-emerald-800 hover:text-emerald-900'}`
  , [isHomePage]);
  
  const iconStyles = useMemo(() => 
    `relative flex items-center text-xl md:text-2xl ${isHomePage ? 'text-white' : 'text-emerald-800'} hover:scale-110 transition-transform cursor-pointer`
  , [isHomePage]);
  
  const counterStyles = "absolute -top-2 -right-2 min-w-[18px] h-[18px] flex items-center justify-center text-xs text-white bg-emerald-800 rounded-full px-1 font-bold border-2 border-white";

  // Update transparency on route change and scroll
  useEffect(() => {
    setIsTransparent(location.pathname === '/');
    
    // Create throttled scroll handler
    const handleScroll = throttle(() => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      if (location.pathname === '/') {
        // Only apply scroll-based transparency on homepage
        setIsScrolled(scrollY > 100);
        // Make header solid after scrolling past video
        setIsTransparent(scrollY <= windowHeight - 100);
      } else {
        setIsScrolled(scrollY > 100);
        setIsTransparent(false);
      }
    }, 100); // Throttle to once every 100ms
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const handleMouseMove = useCallback((e) => {
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
  }, []);

  useEffect(() => {
    if (isDropdownVisible) {
      document.addEventListener('mousemove', handleMouseMove);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isDropdownVisible, handleMouseMove]);

  const handleMouseEnter = useCallback(() => {
    setDropdownVisible(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    // Handled by handleMouseMove
  }, []);

  const handleShopClick = useCallback((e) => {
    e.preventDefault();
    // Only navigate on desktop, show menu on mobile
    if (window.innerWidth >= 768) {
      navigate('/category');
    } else {
      setIsMobileMenuOpen(true);
    }
  }, [navigate]);

  // Get logo source based on state
  const getLogoSrc = useCallback(() => {
    if (isTransparent && !useDefaultLogo) {
      return '/img/logo-white.png';
    }
    return '/img/logo.jpg';
  }, [isTransparent, useDefaultLogo]);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  // Sticky shop button for mobile - memoized
  const StickyShopButton = useMemo(() => (
    <div className={`fixed top-0 left-0 right-0 z-50 bg-white shadow-md transform transition-transform duration-300 md:hidden ${isScrolled ? 'translate-y-0' : '-translate-y-full'}`}>
      <button 
        onClick={handleShopClick}
        className="w-full py-3 px-4 bg-emerald-50 text-emerald-800 font-bold text-lg flex items-center justify-center"
      >
        Sklep ▾
      </button>
    </div>
  ), [isScrolled, handleShopClick]);

  // Mobile category menu - memoized
  const MobileCategoryMenu = useMemo(() => (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/30 z-50 transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeMobileMenu}
      />
      
      {/* Menu Panel */}
      <div 
        className={`fixed inset-x-0 top-0 bottom-0 bg-white z-50 transition-all duration-300 ease-out
          ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}
          max-w-lg mx-auto rounded-b-xl shadow-xl`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="text-xl font-bold text-emerald-800">Kategorie</h2>
            <button 
              onClick={closeMobileMenu}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 text-gray-500 hover:bg-emerald-50 hover:text-emerald-800 transition-colors"
            >
              ✕
            </button>
          </div>
          
          {/* Categories List */}
          <div className="flex-1 overflow-y-auto overscroll-contain pb-safe">
            <div className="p-2">
              {categories.map((category, index) => (
                <CategoryItem 
                  key={index} 
                  category={category} 
                  onClick={closeMobileMenu} 
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  ), [isMobileMenuOpen, closeMobileMenu]);

  return (
    <>
      {StickyShopButton}
      <header className={`relative z-20 transition-all duration-300 ${isTransparent ? 'bg-transparent border-b border-white/20' : 'bg-white border-b border-gray-200'}`}>
        <div className="flex flex-col md:flex-row w-full max-w-6xl mx-auto justify-between items-center px-5 py-4">
          {/* Logo */}
          <div className="w-full md:w-auto flex justify-center mb-4 md:mb-0">
            <Link to="/">
              {logoLoaded ? (
                <img 
                  src={getLogoSrc()}
                  alt="Family Balance" 
                  className="h-12 md:h-14 transition-transform hover:scale-105"
                  width="150"
                  height="56"
                />
              ) : (
                <div className="h-12 md:h-14 w-[150px] bg-gray-200 animate-pulse rounded-md"></div>
              )}
            </Link>
          </div>

          {/* Mobile Primary Navigation */}
          <div className="flex items-center justify-between w-full px-4 md:hidden">
            <button 
              onClick={handleShopClick}
              className={`px-4 py-2 rounded-lg font-bold text-lg flex items-center gap-2 ${
                isTransparent ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-800'
              }`}
            >
              Sklep
              <span className="text-xl">▾</span>
            </button>
            
            {/* Mobile Icons */}
            <div className="flex items-center gap-4">
              <CartIcon 
                iconStyles={iconStyles} 
                counterStyles={counterStyles} 
                cartItemsCount={cartItemsCount} 
              />
              <WishlistIcon 
                iconStyles={iconStyles} 
                counterStyles={counterStyles} 
                wishlistCount={wishlistCount} 
              />
            </div>
          </div>

          {/* Mobile Secondary Navigation */}
          <div className="flex justify-center gap-6 mt-4 md:hidden">
            <Link to="/" className={navLinkStyles}>Strona główna</Link>
            <Link to="/blog" className={navLinkStyles}>Blog</Link>
            <Link to="/contact" className={navLinkStyles}>Kontakt</Link>
            <Link to="/auth" className={navLinkStyles}>Moje konto</Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block md:flex-1 mx-0 md:mx-5">
            <ul className="flex flex-row gap-8 items-center justify-center p-0 m-0">
              <li><Link to="/" className={navLinkStyles}>Strona główna</Link></li>
              
              {/* Desktop Dropdown */}
              <li 
                ref={dropdownRef}
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button 
                  onClick={handleShopClick}
                  className={`${navLinkStyles} flex items-center`}
                >
                  Sklep
                  <span className={`ml-1 transition-transform duration-200 ease-in-out ${isDropdownVisible ? 'rotate-180' : ''}`}>
                    ▾
                  </span>
                </button>
                
                {/* Only render the dropdown content when it's visible to save resources */}
                {isDropdownVisible && (
                  <ul className={`absolute left-0 w-[300px] bg-white border border-gray-200 rounded-lg shadow-lg 
                    transition-all duration-300 ease-in-out z-50 mt-2
                    max-h-[80vh] overflow-y-auto
                    ${isDropdownVisible ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-2 invisible pointer-events-none'}`}
                  >
                    <div className="absolute -top-1.5 left-6 rotate-45 w-3 h-3 bg-white border-l border-t border-gray-200"></div>
                    {categories.map((category, index) => (
                      <li key={index} className="border-b border-gray-100 last:border-none">
                        <Link 
                          to={`/category/${category.slug}`}
                          className="relative flex h-12 items-center px-5 text-[15px] text-gray-700 hover:text-emerald-800 hover:bg-gray-50 transition-all
                            before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 
                            before:w-1 before:h-0 hover:before:h-2/3 before:bg-emerald-800 before:transition-all
                            pr-8"
                        >
                          <span className="block truncate">
                            {category.title}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
              
              <li><Link to="/koszyk" className={navLinkStyles}>Zamówienie</Link></li>
              <li><Link to="/blog" className={navLinkStyles}>Blog</Link></li>
              <li><Link to="/contact" className={navLinkStyles}>Kontakt</Link></li>
              <li><Link to="/auth" className={navLinkStyles}>Moje konto</Link></li>
            </ul>
          </nav>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center gap-6">
            <CartIcon 
              iconStyles={iconStyles} 
              counterStyles={counterStyles} 
              cartItemsCount={cartItemsCount} 
            />
            <WishlistIcon 
              iconStyles={iconStyles} 
              counterStyles={counterStyles} 
              wishlistCount={wishlistCount} 
            />
          </div>
        </div>
      </header>
      {MobileCategoryMenu}
    </>
  );
};

export default Header;