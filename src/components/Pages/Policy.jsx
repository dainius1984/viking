import React, { useEffect } from 'react';
import TopNavBar from '../Headers/TopNavBar';
import Header from '../Headers/Header';
import Footer from '../Footer/Footer';

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <>
      <TopNavBar />
      <Header />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-[2.8rem] font-bold text-gray-800 leading-tight font-serif 
              mb-6 sm:mb-8 px-4 sm:px-0">
              Polityka Prywatności
            </h1>
            
            <div className="w-full mb-8 sm:mb-12 rounded-lg sm:rounded-xl overflow-hidden shadow-lg shadow-black/10">
              <img 
                src="/img/banner.jpg" 
                alt="Health Family - Polityka Prywatności"
                className="w-full h-[200px] sm:h-[250px] md:h-[300px] object-cover"
              />
            </div>
          </div>

          <div className="prose prose-base sm:prose-lg mx-auto text-gray-700 space-y-4 sm:space-y-6 px-4 sm:px-0">
            <div className="text-base sm:text-lg leading-relaxed space-y-4 sm:space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mt-8 mb-4">
                POLITYKA PRYWATNOŚCI TOBMAR
              </h2>

              <p className="text-gray-600">
                Niniejsza Polityka Prywatności określa zasady przetwarzania i ochrony danych osobowych przekazywanych 
                przez użytkowników w związku z korzystaniem ze strony internetowej prowadzonej pod adresem www.familybalance.pl.
              </p>

              <section className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">§ 1 Postanowienia ogólne</h3>
                <div className="space-y-4 text-gray-600">
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>Administratorem danych osobowych jest Tobmar, wpisaną do Centralnej Ewidencji i Informacji o Działalności Gospodarczej, 
                    z siedzibą przy ul. Długa 99, 41-409 Mysłowice, NIP: 2220791571, REGON: 381147080, zwany dalej "Administratorem".</li>
                    <li>Administrator przetwarza dane osobowe zgodnie z obowiązującymi przepisami prawa, w szczególności 
                    z Rozporządzeniem Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. w sprawie 
                    ochrony osób fizycznych w związku z przetwarzaniem danych osobowych (RODO).</li>
                    <li>W trosce o bezpieczeństwo powierzonych danych osobowych Administrator stosuje odpowiednie środki 
                    techniczne i organizacyjne zapewniające ochronę danych przed nieuprawnionym dostępem, utratą, 
                    zniszczeniem czy modyfikacją.</li>
                  </ol>
                </div>
              </section>

              {/* Rest of the sections remain unchanged */}
              <section className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">§ 2 Zakres i cel przetwarzania danych</h3>
                <div className="space-y-4 text-gray-600">
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>
                      Dane osobowe są zbierane w celu:
                      <ul className="list-[lower-alpha] pl-6 pt-2 space-y-1">
                        <li>Realizacji zamówień składanych w sklepie internetowym,</li>
                        <li>Prowadzenia konta użytkownika na stronie internetowej,</li>
                        <li>Realizacji usług świadczonych drogą elektroniczną,</li>
                        <li>Wysyłki newslettera, jeśli użytkownik wyraził zgodę na jego otrzymywanie,</li>
                        <li>Prowadzenia marketingu bezpośredniego własnych produktów i usług,</li>
                        <li>Rozpatrywania reklamacji i wniosków oraz udzielania odpowiedzi na zapytania.</li>
                      </ul>
                    </li>
                    <li>Zakres przetwarzanych danych obejmuje: imię, nazwisko, adres e-mail, numer telefonu, adres 
                    zamieszkania lub dostawy, dane do faktury (NIP, nazwa firmy).</li>
                    <li>Podanie danych osobowych jest dobrowolne, ale niezbędne do realizacji wskazanych celów.</li>
                  </ol>
                </div>
              </section>

              <section className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">§ 3 Udostępnianie danych</h3>
                <div className="space-y-4 text-gray-600">
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>Dane osobowe mogą być udostępniane podmiotom współpracującym z Administratorem wyłącznie w zakresie 
                    niezbędnym do realizacji celów przetwarzania, np. firmom kurierskim, operatorom płatności elektronicznych.</li>
                    <li>Dane mogą być przekazywane organom państwowym na podstawie obowiązującego prawa.</li>
                    <li>Administrator nie przekazuje danych osobowych do państw trzecich ani organizacji międzynarodowych.</li>
                  </ol>
                </div>
              </section>

              <section className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">§ 4 Prawa użytkowników</h3>
                <div className="space-y-4 text-gray-600">
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>
                      Każdy użytkownik ma prawo do:
                      <ul className="list-[lower-alpha] pl-6 pt-2 space-y-1">
                        <li>Dostępu do swoich danych osobowych,</li>
                        <li>Sprostowania danych osobowych,</li>
                        <li>Usunięcia danych osobowych („prawo do bycia zapomnianym"),</li>
                        <li>Ograniczenia przetwarzania danych osobowych,</li>
                        <li>Przenoszenia danych osobowych,</li>
                        <li>Sprzeciwu wobec przetwarzania danych osobowych w celach marketingowych,</li>
                        <li>Wniesienia skargi do organu nadzorczego – Prezesa Urzędu Ochrony Danych Osobowych.</li>
                      </ul>
                    </li>
                    <li>W celu realizacji powyższych praw użytkownik może skontaktować się z Administratorem za pomocą 
                    adresu e-mail: sklep@familybalance.pl.</li>
                  </ol>
                </div>
              </section>

              <section className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">§ 5 Okres przechowywania danych</h3>
                <div className="space-y-4 text-gray-600">
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>Dane osobowe przechowywane są przez okres niezbędny do realizacji celów, dla których zostały 
                    zebrane, a także zgodnie z obowiązującymi przepisami prawa.</li>
                    <li>W przypadku przetwarzania danych na podstawie zgody – do czasu jej wycofania.</li>
                  </ol>
                </div>
              </section>

              <section className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">§ 6 Pliki cookies</h3>
                <div className="space-y-4 text-gray-600">
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>Strona internetowa www.familybalance.pl wykorzystuje pliki cookies w celu zapewnienia poprawnego 
                    działania serwisu oraz optymalizacji korzystania z niego przez użytkowników.</li>
                    <li>Pliki cookies mogą być wykorzystywane do zbierania informacji o aktywności użytkownika na stronie, 
                    w tym w celach statystycznych i marketingowych.</li>
                    <li>Użytkownik może zmienić ustawienia dotyczące plików cookies w swojej przeglądarce internetowej.</li>
                  </ol>
                </div>
              </section>

              <section className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">§ 7 Postanowienia końcowe</h3>
                <div className="space-y-4 text-gray-600">
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>Administrator zastrzega sobie prawo do wprowadzania zmian w niniejszej Polityce Prywatności. 
                    O zmianach użytkownicy będą informowani z odpowiednim wyprzedzeniem na stronie internetowej.</li>
                    <li>W sprawach nieuregulowanych niniejszą Polityką Prywatności zastosowanie mają przepisy RODO oraz 
                    inne obowiązujące przepisy prawa.</li>
                  </ol>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;