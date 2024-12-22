import React from 'react';

const OrderSummary = ({ cart, totalAmount, shipping, setShipping, loading }) => {
  return (
    <div className="lg:sticky lg:top-5">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-6">Twoje zamówienie</h2>
        
        <div className="space-y-4 border-b border-gray-100 pb-6">
          {cart.map(item => (
            <div key={item.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center gap-3">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-12 h-12 object-cover rounded-md"
                />
                <span className="font-medium">
                  {item.name} × {item.quantity}
                </span>
              </div>
              <span className="font-semibold">
                {(item.price * item.quantity).toFixed(2)} zł
              </span>
            </div>
          ))}
        </div>
        
        <div className="space-y-4 mt-6">
          <div className="flex justify-between text-gray-600">
            <span>Suma częściowa</span>
            <span>{totalAmount.toFixed(2)} zł</span>
          </div>
          
          <div className="flex flex-col gap-2">
            <span className="text-gray-600">Wysyłka</span>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="shipping"
                value="DPD"
                checked={shipping === 'DPD'}
                onChange={(e) => setShipping(e.target.value)}
                className="text-green-600 focus:ring-green-500"
              />
              Kurier DPD - 15.00 zł
            </label>
          </div>
          
          <div className="flex justify-between text-lg font-bold pt-4 border-t border-gray-200">
            <span>Do zapłaty</span>
            <span>{(totalAmount + 15).toFixed(2)} zł</span>
          </div>
        </div>

        <button 
          type="submit" 
          className="w-full mt-6 bg-green-800 text-white py-4 px-6 rounded-lg font-semibold transition-all 
                   hover:bg-green-900 focus:ring-4 focus:ring-green-500/20 
                   disabled:bg-gray-300 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? 'Przetwarzanie...' : 'Kupuję i płacę'}
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;