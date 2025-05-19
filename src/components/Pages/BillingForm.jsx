import React, { useState, useEffect } from 'react';

const BillingForm = ({ formData, handleInputChange }) => {
  const [postalError, setPostalError] = useState('');
  
  // Funkcja walidująca kod pocztowy
  const validatePostalCode = (code) => {
    // Akceptujemy format XX-XXX lub XXXXX
    const postalPattern = /^\d{2}(-\d{3}|\d{3})$/;
    return postalPattern.test(code);
  };
  
  // Niestandardowy handler dla kodu pocztowego
  const handlePostalChange = (e) => {
    // Najpierw wywołaj oryginalny handler przekazany przez props
    handleInputChange(e);
    
    // Następnie wykonaj walidację
    const value = e.target.value;
    if (value && !validatePostalCode(value)) {
      setPostalError('Wprowadź kod pocztowy w formacie XX-XXX lub XXXXX');
    } else {
      setPostalError('');
    }
  };
  
  // Sprawdź kod pocztowy przy załadowaniu lub zmianie
  useEffect(() => {
    if (formData.postal && !validatePostalCode(formData.postal)) {
      setPostalError('Wprowadź kod pocztowy w formacie XX-XXX lub XXXXX');
    } else {
      setPostalError('');
    }
  }, [formData.postal]);
  
  return (
    <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6">Dane rozliczeniowe</h2>
      
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
          placeholder="Ulica i numer *"
          required
          value={formData.street}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
        />
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              name="postal"
              placeholder="Kod pocztowy *"
              required
              pattern="\d{2}(-\d{3}|\d{3})"
              title="Wprowadź kod pocztowy w formacie XX-XXX lub XXXXX"
              value={formData.postal}
              onChange={handlePostalChange}
              className={`w-full p-3 border ${postalError ? 'border-red-500' : 'border-gray-200'} rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all`}
              onInvalid={(e) => e.target.setCustomValidity('Wprowadź kod pocztowy w formacie XX-XXX lub XXXXX')}
              onInput={(e) => e.target.setCustomValidity('')}
            />
            {postalError && (
              <p className="text-red-500 text-xs mt-1">{postalError}</p>
            )}
          </div>
          
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
    </div>
  );
};

export default BillingForm;