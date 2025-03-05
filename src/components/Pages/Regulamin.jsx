import React, { useEffect } from 'react';
import TopNavBar from '../Headers/TopNavBar';
import Header from '../Headers/Header';
import Footer from '../Footer/Footer';

const Regulamin = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <>
      <TopNavBar />
      <Header />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
              Regulamin Sklepu Internetowego Family Balance
            </h1>
          </div>

          <div className="prose max-w-none">
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">§ 1 Postanowienia ogólne</h2>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Sklep internetowy Familybalance, działający pod adresem https://familybalance.pl, jest prowadzony przez firmę Tobmar, wpisaną do Centralnej Ewidencji i Informacji o Działalności Gospodarczej, z siedzibą przy ul. Długa 99, 41-409 Mysłowice, NIP: 2220791571, REGON: 381147080.</li>
                <li>Regulamin określa zasady korzystania ze sklepu internetowego, składania zamówień, realizacji umów sprzedaży, odstąpienia od umowy oraz procedur reklamacyjnych.</li>
                <li>Wszystkie ceny podane w sklepie są cenami brutto (zawierają podatek VAT).</li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">§ 2 Składanie zamówień i dostępność produktów</h2>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Zamówienia w sklepie internetowym można składać przez 24 godziny na dobę.</li>
                <li>Dostępność produktów jest wskazana na stronie produktu. W przypadku braku dostępności, klient zostanie poinformowany przed złożeniem zamówienia.</li>
                <li>Po złożeniu zamówienia klient otrzymuje potwierdzenie przyjęcia zamówienia drogą elektroniczną na wskazany adres e-mail.</li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">§ 3 Płatności</h2>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Klient może dokonać płatności za zamówienie za pomocą:
                  <ul className="list-disc pl-5 mt-2">
                    <li>przelewu tradycyjnego,</li>
                    <li>szybkich płatności online (np. Przelewy24),</li>
                    <li>kart płatniczych.</li>
                  </ul>
                </li>
                <li>Realizacja zamówienia rozpoczyna się po zaksięgowaniu płatności na koncie sklepu.</li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">§ 4 Dostawa</h2>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Zamówienia są realizowane na terenie Polski.</li>
                <li>Termin dostawy wynosi od 1 do 3 dni roboczych od momentu zaksięgowania płatności, o ile na stronie produktu nie wskazano inaczej.</li>
                <li>Koszty dostawy są wskazane w koszyku przed finalizacją zamówienia.</li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">§ 5 Prawo odstąpienia od umowy</h2>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Konsument ma prawo odstąpić od umowy w ciągu 14 dni od otrzymania produktu bez podawania przyczyny.</li>
                <li>Aby skorzystać z prawa odstąpienia, należy przesłać oświadczenie o odstąpieniu na adres e-mail: tobmar85@gmail.com lub na adres pocztowy: ul. Długa 99, 41-409 Mysłowice.</li>
                <li>Konsument ponosi koszty zwrotu produktu. Sklep zwraca należność w ciągu 14 dni od otrzymania zwrotu.</li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">§ 6 Reklamacje</h2>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Klient ma prawo zgłosić reklamację w przypadku niezgodności towaru z umową.</li>
                <li>Reklamacje należy zgłaszać na adres e-mail: tobmar85@gmail.com lub na adres pocztowy: ul. Długa 99, 41-409 Mysłowice, podając:
                  <ul className="list-disc pl-5 mt-2">
                    <li>imię i nazwisko,</li>
                    <li>numer zamówienia,</li>
                    <li>opis wady produktu.</li>
                  </ul>
                </li>
                <li>Sklep rozpatruje reklamację w terminie 14 dni od daty jej otrzymania.</li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">§ 7 Polityka prywatności</h2>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Administratorem danych osobowych klientów jest firma Tobmar, z siedzibą przy ul. Długa 99, 41-409 Mysłowice.</li>
                <li>Dane osobowe są przetwarzane wyłącznie w celu realizacji zamówień, zgodnie z RODO.</li>
                <li>Klient ma prawo wglądu, poprawiania i żądania usunięcia swoich danych osobowych.</li>
                <li>Szczegóły dotyczące plików cookies i przetwarzania danych osobowych znajdują się w zakładce „Polityka prywatności".</li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">§ 8 Postanowienia końcowe</h2>
              <ol className="list-decimal pl-5 space-y-2">
                <li>W sprawach nieuregulowanych w regulaminie zastosowanie mają przepisy Kodeksu cywilnego oraz ustawy o prawach konsumenta.</li>
                <li>Regulamin wchodzi w życie z dniem 27.12.2024 i obowiązuje do odwołania.</li>
              </ol>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Regulamin;