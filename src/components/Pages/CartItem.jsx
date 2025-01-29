import React from 'react';
import { formatPrice } from './OrderUtils';

export const CartItem = ({ item }) => (
  <div className="bg-gray-50 p-3 rounded-lg">
    <div className="flex gap-3">
      <div className="flex-grow min-w-0">
        <p className="font-medium text-sm sm:text-base line-clamp-2 sm:line-clamp-none">
          {item.name}
        </p>
        <p className="text-gray-600 text-xs sm:text-sm mt-1">
          Ilość: {item.quantity}
        </p>
      </div>
      <span className="font-semibold text-sm sm:text-base whitespace-nowrap">
        {formatPrice(item.price * item.quantity)}
      </span>
    </div>
  </div>
);