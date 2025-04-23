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

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    errors: {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
  });

  const [notification, setNotification] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateName = (name) => {
    if (!name) return 'Imię jest wymagane';
    if (name.length < 2) return 'Imię musi mieć minimum 2 znaki';
    return '';
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return 'Email jest wymagany';
    if (!re.test(email)) return 'Nieprawidłowy format emaila';
    return '';
  };

  const validateSubject = (subject) => {
    if (!subject) return 'Temat jest wymagany';
    if (subject.length < 3) return 'Temat musi mieć minimum 3 znaki';
    return '';
  };

  const validateMessage = (message) => {
    if (!message) return 'Wiadomość jest wymagana';
    if (message.length < 10) return 'Wiadomość musi mieć minimum 10 znaków';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Clear any existing notification
    setNotification({ type: '', message: '' });

    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const subjectError = validateSubject(formData.subject);
    const messageError = validateMessage(formData.message);

    setFormData(prev => ({
      ...prev,
      errors: {
        name: nameError,
        email: emailError,
        subject: subjectError,
        message: messageError
      }
    }));

    if (nameError || emailError || subjectError || messageError) return;

    setIsSubmitting(true);

    try {
      const result = await emailjs.send(
        SMTP_CONFIG.SERVICE_ID,
        SMTP_CONFIG.TEMPLATE_ID,
        {
          name: formData.name,
          email: formData.email,
          title: formData.subject,
          message: formData.message,
          time: new Date().toLocaleString('pl-PL')
        },
        SMTP_CONFIG.PUBLIC_KEY
      );

      if (result.status === 200) {
        setNotification({
          type: 'success',
          message: 'Dziękujemy za wiadomość! Skontaktujemy się z Tobą wkrótce.'
        });

        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          errors: {
            name: '',
            email: '',
            subject: '',
            message: ''
          }
        });
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      setNotification({
        type: 'error',
        message: 'Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie później.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      {notification.message && (
        <div className="mb-8">
          <EnhancedAlert
            type={notification.type}
            message={notification.message}
            onDismiss={() => setNotification({ type: '', message: '' })}
          />
        </div>
      )}

      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label className="text-lg font-medium text-gray-700">
            Imię i nazwisko
          </label>
          <input
            type="text"
            name="name"
            className={`p-4 border-2 rounded-lg text-base focus:outline-none transition-colors ${
              formData.errors.name
                ? 'border-red-300 focus:border-red-500 bg-red-50'
                : 'border-gray-200 focus:border-emerald-500 hover:border-gray-300'
            }`}
            value={formData.name}
            onChange={(e) => setFormData({
              ...formData,
              name: e.target.value,
              errors: { ...formData.errors, name: '' }
            })}
            disabled={isSubmitting}
            required
            placeholder="Wprowadź swoje imię i nazwisko"
          />
          {formData.errors.name && (
            <span className="text-red-500 text-sm mt-1">
              {formData.errors.name}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-lg font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            className={`p-4 border-2 rounded-lg text-base focus:outline-none transition-colors ${
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
            <span className="text-red-500 text-sm mt-1">
              {formData.errors.email}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-lg font-medium text-gray-700">
            Temat
          </label>
          <input
            type="text"
            name="subject"
            className={`p-4 border-2 rounded-lg text-base focus:outline-none transition-colors ${
              formData.errors.subject
                ? 'border-red-300 focus:border-red-500 bg-red-50'
                : 'border-gray-200 focus:border-emerald-500 hover:border-gray-300'
            }`}
            value={formData.subject}
            onChange={(e) => setFormData({
              ...formData,
              subject: e.target.value,
              errors: { ...formData.errors, subject: '' }
            })}
            disabled={isSubmitting}
            required
            placeholder="Wprowadź temat wiadomości"
          />
          {formData.errors.subject && (
            <span className="text-red-500 text-sm mt-1">
              {formData.errors.subject}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-lg font-medium text-gray-700">
            Wiadomość
          </label>
          <textarea
            name="message"
            className={`p-4 border-2 rounded-lg text-base focus:outline-none transition-colors ${
              formData.errors.message
                ? 'border-red-300 focus:border-red-500 bg-red-50'
                : 'border-gray-200 focus:border-emerald-500 hover:border-gray-300'
            }`}
            value={formData.message}
            onChange={(e) => setFormData({
              ...formData,
              message: e.target.value,
              errors: { ...formData.errors, message: '' }
            })}
            disabled={isSubmitting}
            rows={6}
            required
            placeholder="Wprowadź treść wiadomości"
          />
          {formData.errors.message && (
            <span className="text-red-500 text-sm mt-1">
              {formData.errors.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="bg-emerald-600 hover:bg-emerald-700 text-white py-4 px-8 rounded-lg text-lg font-semibold cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none w-full mt-4"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-3">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Wysyłanie...
            </span>
          ) : 'Wyślij wiadomość'}
        </button>
      </form>
    </div>
  );
};

export default ContactForm; 