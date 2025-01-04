import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import TopNavBar from '../Headers/TopNavBar';
import Header from '../Headers/Header';
import Footer from '../Footer/Footer';
import ProductGrid from '../Section/ProductGrid';

// Reusable empty state component
const EmptyState = ({ title, description }) => (
  <div className="text-center p-6 sm:p-8 mx-auto max-w-2xl bg-white rounded-xl shadow-sm">
    <Heart className="w-16 sm:w-20 h-16 sm:h-20 mx-auto mb-3 text-emerald-800" />
    <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">{title}</h2>
    <p className="text-sm sm:text-base text-gray-600 mb-5 leading-relaxed">{description}</p>
    <Link 
      to="/category"
      className="inline-block px-6 sm:px-8 py-3 sm:py-3.5 bg-emerald-800 text-white rounded-lg 
        font-medium transition-all duration-300 hover:bg-emerald-900 
        hover:-translate-y-0.5 hover:shadow-lg text-sm sm:text-base"
    >
      Przejdź Do Sklepu
    </Link>
  </div>
);

const Wishlist = () => {
  const { state, dispatch } = useCart();

  const removeFromWishlist = (id) => {
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: id });
  };

  const addToCart = (item) => {
    dispatch({ 
      type: 'ADD_TO_CART', 
      payload: {
        ...item,
        quantity: 1
      }
    });
    removeFromWishlist(item.id);
  };

  const renderWishlistContent = () => {
    if (!state || !state.wishlist) {
      return (
        <EmptyState 
          title="Wystąpił błąd"
          description="Nie można załadować listy życzeń."
        />
      );
    }

    if (state.wishlist.length === 0) {
      return (
        <EmptyState 
          title="Twoja lista życzeń jest pusta"
          description="Wygląda na to, że nie masz jeszcze żadnych produktów w liście życzeń. 
            Zapraszamy do zapoznania się z naszą ofertą."
        />
      );
    }

    return (
      <div className="flex flex-col gap-5">
        <h1 className="text-xl sm:text-2xl font-bold">Lista życzeń</h1>
        {state.wishlist.map((item) => (
          <div 
            key={item.id} 
            className="flex flex-col sm:flex-row justify-between items-center p-4 sm:p-5 
              bg-white rounded-lg shadow-sm gap-4 sm:gap-5 animate-fadeIn"
          >
            <div className="flex items-center gap-3 sm:gap-5 w-full sm:w-auto">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-sm sm:text-lg mb-1 sm:mb-2 line-clamp-2">
                  {item.name}
                </h3>
                <p className="font-bold text-gray-800 text-sm sm:text-base">
                  {item.price} zł
                </p>
              </div>
            </div>

            <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
              <button 
                onClick={() => addToCart(item)}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 
                  bg-green-600 text-white rounded-lg text-sm sm:text-base
                  transition-colors duration-300 hover:bg-green-700"
              >
                <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Dodaj do koszyka</span>
              </button>
              <button 
                onClick={() => removeFromWishlist(item.id)}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 
                  bg-red-500 text-white rounded-lg text-sm sm:text-base
                  transition-colors duration-300 hover:bg-red-600"
              >
                <Trash className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Usuń</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <TopNavBar />
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Wishlist Content */}
        <div className="mb-12">
          {renderWishlistContent()}
        </div>

        {/* Always show ProductGrid */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold mb-6">Nasza Najnowsze produkty</h2>
          <ProductGrid />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Wishlist;