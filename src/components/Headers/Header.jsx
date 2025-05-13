import React from 'react';
import { AiOutlineShoppingCart, AiOutlineHeart } from 'react-icons/ai';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import categories from '../../Data/category-data';

const Header = () => {
  const [isDropdownVisible, setDropdownVisible] = React.useState(false);
  const dropdownRef = React.useRef(null);
  const { state } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const cartItemsCount = state?.cart?.reduce((sum, item) => sum + (item.quantity || 0), 0) || 0;
  const wishlistCount = state?.wishlist?.length || 0;

  // Common styles
  const navLinkStyles = "text-emerald-800 font-medium hover:text-emerald-900 transition-colors text-sm md:text-[17px]";
  const iconStyles = "relative flex items-center text-xl md:text-2xl text-emerald-800 hover:scale-110 transition-transform cursor-pointer";
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

  React.useEffect(() => {
    if (isDropdownVisible) {
      document.addEventListener('mousemove', handleMouseMove);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isDropdownVisible]);

  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    // Handled by handleMouseMove
  };

  const handleShopClick = (e) => {
    e.preventDefault();
    // Only navigate on desktop, show menu on mobile
    if (window.innerWidth >= 768) {
      navigate('/category');
    } else {
      setIsMobileMenuOpen(true);
    }
  };

  const MobileCategoryMenu = () => (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/30 z-50 transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
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
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 text-gray-500 hover:bg-emerald-50 hover:text-emerald-800 transition-colors"
            >
              ✕
            </button>
          </div>
          
          {/* Categories List */}
          <div className="flex-1 overflow-y-auto overscroll-contain pb-safe">
            <div className="p-2">
              {categories.map((category, index) => (
                <Link
                  key={index}
                  to={`/category/${category.slug}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between px-4 py-3.5 rounded-lg text-gray-700 hover:bg-emerald-50/60 active:bg-emerald-50 hover:text-emerald-800 transition-colors group"
                >
                  <span className="text-base font-medium">{category.title}</span>
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-white text-gray-400 group-hover:bg-emerald-100 group-hover:text-emerald-800 transition-colors">
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      <header className="bg-white border-b border-gray-200 relative z-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-3">
            {/* Logo - Adjusted for better alignment and sizing */}
            <div className="flex items-center justify-center">
              <Link to="/" className="flex items-center">
                <img 
                  src="/img/logo.jpg" 
                  alt="Family Balance" 
                  className="h-10 md:h-12 w-auto object-contain"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:block">
              <ul className="flex items-center space-x-8">
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
                </li>
                
                <li><Link to="/koszyk" className={navLinkStyles}>Zamówienie</Link></li>
                <li><Link to="/blog" className={navLinkStyles}>Blog</Link></li>
                <li><Link to="/contact" className={navLinkStyles}>Kontakt</Link></li>
                <li><Link to="/auth" className={navLinkStyles}>Moje konto</Link></li>
              </ul>
            </nav>

            {/* Desktop Icons */}
            <div className="hidden md:flex items-center space-x-6">
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
              </Link>
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
              </Link>
            </div>

            {/* Mobile Navigation Button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={handleShopClick}
                className="px-4 py-2 bg-emerald-100 text-emerald-800 rounded-lg font-bold text-base flex items-center gap-1"
              >
                Sklep
                <span className="text-lg">▾</span>
              </button>
            </div>
          </div>
          
          {/* Mobile Secondary Navigation */}
          <div className="md:hidden flex justify-between pb-3">
            <div className="flex space-x-4 items-center">
              <Link to="/" className={navLinkStyles}>Strona główna</Link>
              <Link to="/blog" className={navLinkStyles}>Blog</Link>
              <Link to="/contact" className={navLinkStyles}>Kontakt</Link>
            </div>
            
            {/* Mobile Icons */}
            <div className="flex items-center space-x-4">
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
              </Link>
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
              </Link>
            </div>
          </div>
        </div>
      </header>
      <MobileCategoryMenu />
    </>
  );
};

export default Header;