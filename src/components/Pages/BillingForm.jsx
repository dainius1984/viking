import React from 'react';

const BillingForm = ({ formData, handleInputChange }) => {
  return (
    <div className="space-y-4">
      <input
        type="text"
        name="firstName"
        placeholder="Imię *" 
        required
        value={formData.firstName}
        onChange={handleInputChange}
        className="w-full p-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
      />
      
      <input
        type="text"
        name="lastName"
        placeholder="Nazwisko *"
        required
        value={formData.lastName}
        onChange={handleInputChange}
        className="w-full p-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
      />
      
      <input
        type="text"
        name="company"
        placeholder="Nazwa firmy (opcjonalnie)"
        value={formData.company}
        onChange={handleInputChange}
        className="w-full p-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
      />
      
      <input
        type="text"
        name="street"
        placeholder="Ulica *"
        required
        value={formData.street}
        onChange={handleInputChange}
        className="w-full p-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
      />
      
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="postal"
          placeholder="Kod pocztowy *"
          required
          value={formData.postal}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
        />
        
        <input
          type="text"
          name="city"
          placeholder="Miasto *"
          required
          value={formData.city}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
        />
      </div>
      
      <input
        type="tel"
        name="phone"
        placeholder="Telefon *"
        required
        value={formData.phone}
        onChange={handleInputChange}
        className="w-full p-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
      />
      
      <input
        type="email"
        name="email"
        placeholder="Email *"
        required
        value={formData.email}
        onChange={handleInputChange}
        className="w-full p-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
      />
      
      <textarea
        name="notes"
        placeholder="Uwagi do zamówienia"
        value={formData.notes}
        onChange={handleInputChange}
        className="w-full p-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all min-h-[100px] resize-y"
      />
    </div>
  );
};

export default BillingForm;