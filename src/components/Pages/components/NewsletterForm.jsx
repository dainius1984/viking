import React, { useState } from 'react';
import EnhancedAlert from './Alert';
import emailjs from '@emailjs/browser';

// Initialize EmailJS with your public key
emailjs.init("0f8Jce-Gsw4GbjCQ_");

// SMTP Configuration Constants
const SMTP_CONFIG = {
  SERVICE_ID: 'service_7qpgsjk',
  TEMPLATE_ID: 'template_r7rcz39',
  PUBLIC_KEY: '0f8Jce-Gsw4GbjCQ_'
};

const NewsletterForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    errors: {
      email: ''
    }
  });

  const [notification, setNotification] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return 'Email jest wymagany';
    if (!re.test(email)) return 'Nieprawidłowy format emaila';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Clear any existing notification
    setNotification({ type: '', message: '' });

    const emailError = validateEmail(formData.email);

    setFormData(prev => ({
      ...prev,
      errors: {
        email: emailError
      }
    }));

    if (emailError) return;

    setIsSubmitting(true);

    try {
      const result = await emailjs.send(
        SMTP_CONFIG.SERVICE_ID,
        SMTP_CONFIG.TEMPLATE_ID,
        {
          name: 'Newsletter Subscriber',
          email: formData.email,
          title: 'Newsletter Subscription',
          message: 'Nowa subskrypcja newslettera',
          time: new Date().toLocaleString('pl-PL')
        },
        SMTP_CONFIG.PUBLIC_KEY
      );

      if (result.status === 200) {
        setNotification({
          type: 'success',
          message: 'Dziękujemy za subskrypcję!'
        });

        // Reset form
        setFormData({
          email: '',
          errors: {
            email: ''
          }
        });
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      setNotification({
        type: 'error',
        message: 'Wystąpił błąd podczas subskrypcji.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      {notification.message && (
        <div className="mb-3">
          <EnhancedAlert
            type={notification.type}
            message={notification.message}
            onDismiss={() => setNotification({ type: '', message: '' })}
          />
        </div>
      )}

      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1">
          <input
            type="email"
            name="email"
            className={`p-2 border-2 rounded-lg text-sm focus:outline-none transition-colors ${
              formData.errors.email
                ? 'border-red-300 focus:border-red-500 bg-red-50'
                : 'border-gray-200 focus:border-emerald-500 hover:border-gray-300'
            }`}
            value={formData.email}
            onChange={(e) => setFormData({
              ...formData,
              email: e.target.value,
              errors: { ...formData.errors, email: '' }
            })}
            disabled={isSubmitting}
            required
            placeholder="Wprowadź swój email"
          />
          {formData.errors.email && (
            <span className="text-red-500 text-xs mt-1">
              {formData.errors.email}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-lg text-sm font-semibold cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Subskrybuję...
            </span>
          ) : 'Subskrybuj newsletter'}
        </button>
      </form>
    </div>
  );
};

export default NewsletterForm; 