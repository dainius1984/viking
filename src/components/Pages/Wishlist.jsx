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
  <div className="text-center p-8 mx-auto max-w-2xl bg-white rounded-xl shadow-sm">
    <Heart className="w-20 h-20 mx-auto mb-3 text-emerald-800" />
    <h2 className="text-2xl font-semibold text-gray-800 mb-2">{title}</h2>
    <p className="text-gray-600 mb-5">{description}</p>
    <Link 
      to="/category"
      className="inline-block px-7 py-3 bg-emerald-800 text-white rounded-lg font-medium 
        transition-all duration-300 hover:bg-emerald-900 hover:-translate-y-0.5 
        hover:shadow-lg"
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

  const renderContent = () => {
    // Handle error state
    if (!state || !state.wishlist) {
      return (
        <EmptyState 
          title="Wystąpił błąd"
          description="Nie można załadować listy życzeń."
        />
      );
    }

    // Handle empty state
    if (state.wishlist.length === 0) {
      return (
        <EmptyState 
          title="Twoja lista życzeń jest pusta"
          description="Wygląda na to, że nie masz jeszcze żadnych produktów w liście życzeń. 
            Zapraszamy do zapoznania się z naszą ofertą."
        />
      );
    }

    // Handle main content
    return (
      <>
        <h1 className="text-3xl font-bold text-center mb-8">Lista życzeń</h1>
        <div className="flex flex-col gap-5">
          {state.wishlist.map((item) => (
            <div key={item.id} 
              className="flex flex-col md:flex-row justify-between items-center p-5 bg-white rounded-lg shadow-sm gap-5"
            >
              <div className="flex items-center gap-5">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-24 h-24 object-cover rounded"
                />
                <div>
                  <h3 className="font-medium text-lg mb-2">{item.name}</h3>
                  <p className="font-bold text-gray-800">{item.price} zł</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => addToCart(item)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded 
                    transition-colors duration-300 hover:bg-green-700"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Dodaj do koszyka
                </button>
                <button 
                  onClick={() => removeFromWishlist(item.id)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-red-500 text-white rounded 
                    transition-colors duration-300 hover:bg-red-600"
                >
                  <Trash className="w-5 h-5" />
                  Usuń
                </button>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <>
      <TopNavBar />
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-10">
        {renderContent()}
        {(!state?.wishlist || state.wishlist.length === 0) && <ProductGrid />}
      </div>
      <Footer />
    </>
  );
};

export default Wishlist;