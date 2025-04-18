import React from 'react';
import SEO from '../SEO/SEO';
import ContactForm from './components/ContactForm';
import { Mail, Phone, MapPin } from 'lucide-react';
import Header from '../Headers/Header';
import Footer from '../Footer/Footer';
import TopNavBar from '../Headers/TopNavBar';

const ContactPage = () => {
  return (
    <>
      <SEO
        title="Kontakt - Health Family | Suplementy Diety"
        description="Skontaktuj się z nami w sprawie suplementów diety. Jesteśmy dostępni przez email, telefon i w naszym biurze w Warszawie."
        keywords="kontakt, suplementy diety, witaminy, minerały, probiotyki, omega-3, zdrowie, odporność, suplementacja, naturalne suplementy, suplementy na odporność, suplementy na trawienie, suplementy na stawy, suplementy na sen, suplementy na stres, suplementy na koncentrację, suplementy na włosy, suplementy na skórę, suplementy na paznokcie, suplementy na kości, suplementy na mięśnie, suplementy na serce, suplementy na wątrobę, suplementy na jelita, suplementy na układ nerwowy, suplementy na układ krążenia, suplementy na układ pokarmowy, suplementy na układ odpornościowy, suplementy na układ kostny, suplementy na układ mięśniowy, suplementy na układ hormonalny, suplementy na układ nerwowy, suplementy na układ krążenia, suplementy na układ pokarmowy, suplementy na układ odpornościowy, suplementy na układ kostny, suplementy na układ mięśniowy, suplementy na układ hormonalny"
        ogType="website"
        ogImage="https://healthfamily.pl/images/contact-og.jpg"
      />
      <div className="min-h-screen flex flex-col">
        <TopNavBar />
        <Header />
        <main className="flex-grow bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
              <h1 className="text-3xl sm:text-4xl font-bold text-emerald-800 mb-4">
                Skontaktuj się z nami
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Masz pytania? Chętnie na nie odpowiemy. Skontaktuj się z nami przez formularz lub bezpośrednio.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact Information */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold text-emerald-800 mb-6">Dane kontaktowe</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Mail className="w-6 h-6 text-emerald-600 mt-1" />
                    <div>
                      <h3 className="font-medium text-gray-900">Email</h3>
                      <a href="/contact" className="text-emerald-600 hover:text-emerald-800 transition-colors">
                        sklep@familybalance.pl
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone className="w-6 h-6 text-emerald-600 mt-1" />
                    <div>
                      <h3 className="font-medium text-gray-900">Telefon</h3>
                      <a href="tel:+48533813285" className="text-emerald-600 hover:text-emerald-800 transition-colors">
                        +48 533 813 285
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-emerald-600 mt-1" />
                    <div>
                      <h3 className="font-medium text-gray-900">Adres</h3>
                      <p className="text-gray-600">ul. Długa 99</p>
                      <p className="text-gray-600">41-409 Mysłowice</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold text-emerald-800 mb-6">Formularz kontaktowy</h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default ContactPage; 