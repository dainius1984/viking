import React from 'react';

export const DiscountInput = ({ discountCode, setDiscountCode, onApplyDiscount }) => (
  <div className="pt-4 border-t">
    <h3 className="font-semibold mb-2 text-sm sm:text-base">Kod zniżki</h3>
    <div className="flex gap-2">
      <input
        type="text"
        value={discountCode}
        onChange={(e) => setDiscountCode(e.target.value)}
        placeholder="Wpisz kod"
        className="flex-1 p-2 border rounded text-sm sm:text-base"
      />
      <button
        onClick={onApplyDiscount}
        className="px-3 sm:px-4 py-2 bg-green-800 text-white rounded hover:bg-green-900 text-sm sm:text-base whitespace-nowrap"
      >
        Zastosuj
      </button>
    </div>
  </div>
);
