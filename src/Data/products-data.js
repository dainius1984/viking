import categories from './category-data';
import './product-styles.css';

const products = [
  {
    id: 1,
    name: 'BalanceOil+300ml Cytrynowy',
    price: '175.00',
    image: '/img/products/1.png',
    category: categories.find(category => category.slug === 'suplementy-omega-3').slug,
    description: 'Zinzino BalanceOil+ to synergiczne połączenie wysokiej jakości oleju z ryb, bogatego w kwasy tłuszczowe omega-3 EPA i DHA i specjalnie dobranej oliwy z pierwszego tłoczenia o wysokiej zawartości polifenoli. BalanceOil+ bezpiecznie dostosowuje i utrzymuje prawidłowy poziom EPA + DHA i kwasów tłuszczowych omega-6:3 w organizmie. BalanceOil+ wspomaga optymalną pracę mózgu i prawidłową pracę serca i wzmacnia układ odpornościowy.'
  },
  {
    id: 2,
    name: 'BalanceOil+300ml Grejpfrut, Cytryna i Limonka',
    price: '175.00',
    image: '/img/products/2.png',
    category: categories.find(category => category.slug === 'suplementy-omega-3').slug,
    description: 'Zinzino BalanceOil+ to synergiczne połączenie wysokiej jakości oleju z ryb, bogatego w kwasy tłuszczowe omega-3 EPA i DHA i specjalnie dobranej oliwy z pierwszego tłoczenia o wysokiej zawartości polifenoli. BalanceOil+ bezpiecznie dostosowuje i utrzymuje prawidłowy poziom EPA + DHA i kwasów tłuszczowych omega-6:3 w organizmie. BalanceOil+ wspomaga optymalną pracę mózgu i prawidłową pracę serca i wzmacnia układ odpornościowy.'
  },
  {
    id: 3,
    name: 'BalanceOil+300ml Pomarańcza, Cytryna i Mięta',
    price: '175.00',
    image: '/img/products/3.png',
    category: categories.find(category => category.slug === 'suplementy-omega-3').slug,
    description: 'Zinzino BalanceOil+ to synergiczne połączenie wysokiej jakości oleju z ryb, bogatego w kwasy tłuszczowe omega-3 EPA i DHA i specjalnie dobranej oliwy z pierwszego tłoczenia o wysokiej zawartości polifenoli. BalanceOil+ bezpiecznie dostosowuje i utrzymuje prawidłowy poziom EPA + DHA i kwasów tłuszczowych omega-6:3 w organizmie. BalanceOil+ wspomaga optymalną pracę mózgu i prawidłową pracę serca i wzmacnia układ odpornościowy.'
  },
  {
    id: 4,
    name: 'BalanceOil+300ml Tutti Frutti',
    price: '175.00',
    image: '/img/products/4.png',
    category: categories.find(category => category.slug === 'suplementy-omega-3').slug,
    description: 'Zinzino BalanceOil+ to synergiczne połączenie wysokiej jakości oleju z ryb, bogatego w kwasy tłuszczowe omega-3 EPA i DHA i specjalnie dobranej oliwy z pierwszego tłoczenia o wysokiej zawartości polifenoli. BalanceOil+ bezpiecznie dostosowuje i utrzymuje prawidłowy poziom EPA + DHA i kwasów tłuszczowych omega-6:3 w organizmie. BalanceOil+ wspomaga optymalną pracę mózgu i prawidłową pracę serca i wzmacnia układ odpornościowy.'
  },
  {
    id: 5,
    name: 'BalanceOil+100ml Pomarańcza, Cytryna i Mięta',
    price: '65.00',
    image: '/img/products/5.png',
    category: categories.find(category => category.slug === 'suplementy-omega-3').slug,
    description: 'Zinzino BalanceOil+ to synergiczne połączenie wysokiej jakości oleju z ryb, bogatego w kwasy tłuszczowe omega-3 EPA i DHA i specjalnie dobranej oliwy z pierwszego tłoczenia o wysokiej zawartości polifenoli. BalanceOil+ bezpiecznie dostosowuje i utrzymuje prawidłowy poziom EPA + DHA i kwasów tłuszczowych omega-6:3 w organizmie. BalanceOil+ wspomaga optymalną pracę mózgu i prawidłową pracę serca i wzmacnia układ odpornościowy.'
  },
  {
    id: 6,
    name: 'BalanceOil+300ml AquaX',
    price: '209.00',
    image: '/img/products/6.png',
    category: categories.find(category => category.slug === 'suplementy-omega-3').slug,
    description: 'AquaX to przełom w wiedzy o omega-3. AquaX jest formą BalanceOil+ zawierającą Aquacelle, wyjątkowy, naturalny emulgator, który rozpuszcza BalanceOil+ w wodzie. Znacznie poprawia smak i konsystencję produktu, a w wielu przypadkach wchłanianie omega-3. Wymieszaj dzienną dawkę BalanceOil+ AquaX w wodzie lub innym wybranym płynie i przekonaj się sam jak zanika smak i tłuste wrażenie typowe dla oleju. Po prostu wstrząśnij butelką, a następnie wlej, wymieszaj, wypij i rozkoszuj się smakiem!'
  },
  {
    id: 7,
    name: 'BalanceOil+Premium 300ml',
    price: '250.00',
    image: '/img/products/7.png',
    category: categories.find(category => category.slug === 'suplementy-omega-3').slug,
    description: 'Wyższa jakość klasy premium. BalanceOil+ Premium jest nową odsłoną naszego w pełni naturalnego suplementu diety o zrównoważonej zawartości polifenoli i kwasów omega. Ta wyjątkowa i innowacyjna mieszanka wykorzystująca oliwę R.E.V.O.O. dostarcza solidnych zasobów polifenoli i substancji odżywczych pochodzenia roślinnego. To właśnie dlatego BalanceOil+ Premium umożliwia wydajniejsze i skuteczniejsze niż kiedykolwiek wchłanianie i ochronę lipidów krwi; bezpiecznie podnosi stężenie kwasów Omega-3, dostosowuje współczynnik kwasów Omega-6:3, zapewnia ich korzystne stężenia dla Twojego poziomu cholesterolu, serca, i mózgu.'
  },
  {
    id: 8,
    name: 'Essent+Premium',
    price: '220.00',
    image: '/img/products/8.jpeg',
    category: categories.find(category => category.slug === 'suplementy-omega-3').slug,
    description: 'Nowa generacja suplementów diety. Ten ultraczysty, testowany molekularnie suplement diety z polifenolami i kwasami Omega Balans bezpiecznie dostosowuje i utrzymuje balans Omega-6:3, jednocześnie chroniąc komórki przed utlenianiem1 i wspomagając prawidłowe funkcjonowanie mózgu, serca i układu odpornościowego. Essent to synergiczna mieszanka skoncentrowanego wysokiej klasy oleju rybnego o wysokiej zawartości tłuszczu w kwasów tłuszczowych Omega-3 EPA i DHA, z dodatkiem oliwy z oliwek z pierwszego tłoczenia, ekstraktu z owoców drzewa oliwnego oraz kakao — wszystkie te składniki dostarczają dużej ilości polifenoli.'
  },
  {
    id: 9,
    name: 'BalanceTest',
    price: '250.00',
    image: '/img/products/9.png',
    category: categories.find(category => category.slug === 'testy').slug,
    description: 'BalanceTest jest testem suchej kropli krwi, którego dokładność potwierdzona w badaniach klinicznych odpowiada dokładności pomiarów stężenia kwasów tłuszczowych w próbkach krwi żylnej. Test wymaga jedynie pobrania kilku kropli krwi z opuszki palca i naniesienia ich na bibułę filtracyjną, a cała procedura zajmuje mniej niż minutę. Laboratorium VITAS Analytical Services przeprowadza anonimowo analizę stężenia 11 kwasów tłuszczowych we krwi z pewnością pomiaru na poziomie 98%. Następnie, po upływie około 20 dni wynik jest wyświetlany na stronie internetowej zinzinotest.com wraz ze informacjami szczegółowymi obejmującymi m.in. równowagę kwasów tłuszczowych omega-6:3, zawartość kwasów tłuszczowych omega 3 oraz profil ochrony kwasów tłuszczowych.'
  },
  {
    id: 10,
    name: 'Protect +',
    price: '175.00',
    image: '/img/products/10.jpg',
    category: categories.find(category => category.slug === 'suplementy-na-odpornosc').slug,
    description: 'Protect+ to w pełni naturalny suplement diety, który wspiera prawidłowe funkcjonowanie układu odpornościowego, co korzystnie wpływa na samopoczucie i chroni przed chorobami. Zawiera skuteczne wegańskie witaminy D3 i C, które przyczyniają się do prawidłowego funkcjonowania układu odpornościowego, a także silnie działające, potwierdzone klinicznie 1-3, 1-6 beta-glukany.Protect działa najlepiej, gdy jest przyjmowany codziennie, ponieważ kluczowe komórki odporności nieswoistej są odnawiane co 1–2 dni i potrzebują pobudzenia, aby mogły skutecznie funkcjonować'
  },
  {
    id: 11,
    name: 'Viva +',
    price: '125.00',
    image: '/img/products/11.png',
    category: categories.find(category => category.slug === 'suplementy-przywracajace-zdrowie').slug,
    description: 'Naturalny suplement diety Viva+ opracowany z myślą o zwalczaniu stresu, poprawianiu nastroju i samopoczucia. Preparat ten wspiera również zdrowe funkcjonowanie układu nerwowego i mózgu, przyczyniając się do zmniejszania oznak zmęczenia i znużenia. Viva+ to połączenie affronu®, standaryzowanego i opatentowanego ekstraktu ze znamion wysokiej jakości czystego szafranu (Crocus sativus L) pochodzącego z Hiszpanii, kompleksu witamin z grupy B uzyskanych z ziaren gryki, magnezu z wody morskiej, jodu oraz witaminy C z aceroli. Wszystkie te składniki poprawiają ogólny stan zdrowia, wspólnie zawiązując łagodny lecz potężny sojusz.'
  },
  {
    id: 12,
    name: 'Xtend',
    price: '129.00',
    image: '/img/products/12.jpg',
    category: categories.find(category => category.slug === 'suplementy-na-odpornosc').slug,
    description: 'Xtend, nasz najbardziej zaawansowany suplement immunologiczny i odżywczy, jest wyjątkowym źródłem mikro- i fitoskładników, w tym 23 niezbędnych witamin i minerałów, a także oczyszczonych 1-3, 1-6 beta glukanów pochodzących z drożdży piekarskich, chroniących i odnawiających komórki oraz tkanki. Xtend to idealne uzupełnienie BalanceOil i ZinoBiotic w ramach Twojego protokołu zdrowotnego.\n\nZawartość: 60 tabletek, waga netto 45 g\n\n<h4 class="benefits-heading">NAJWAŻNIEJSZE KORZYŚCI:</h4>\n<ul class="benefits-list">\n  <li><span class="benefit-icon">⚡</span> <strong>Więcej energii</strong></li>\n  <li><span class="benefit-icon">🦴</span> <strong>Poprawa funkcjonowania kości i stawów</strong></li>\n  <li><span class="benefit-icon">🛡️</span> <strong>Wzmocnienie układu odpornościowego</strong></li>\n  <li><span class="benefit-icon">🔄</span> <strong>Zapewnia kompleksową dawkę składników odżywczych niezbędnych do wzrostu i naprawy tkanek</strong></li>\n</ul>'
  },
  {
    id: 13,
    name: 'Xtend +',
    price: '129.00',
    image: '/img/products/13.jpg',
    category: categories.find(category => category.slug === 'suplementy-na-odpornosc').slug,
    description: 'Xtend+ to wegański suplement diety odżywiający organizm i stymulujący odporność, który zawiera wyłącznie składniki pochodzenia naturalnego. Produkt doskonale uzupełnia BalanceOil i ZinoBiotic. Stworzony, by wspierać nasz wrodzony układ odpornościowy, zawiera mikro- i fitoskładniki, w tym 22 podstawowe witaminy i minerały oraz oczyszczone 1-3, 1-6 beta-glukany z drożdży piekarskich. Xtend+ ma formę łatwych do połknięcia wegańskich kapsułek. Przez "naturalne" rozumie się, że witaminy są pozyskiwane ze źródeł naturalnych, na przykład z jagód aceroli (witamina C) i gryki (witaminy z grupy B). Także minerały będą pochodzenia naturalnego. To pozwoli nam zachować wszystkie fitoskładniki odżywcze. Ponadto zastąpiliśmy nieaktywne składniki , takie jak środki przeciwzbrylające i wypełniające potrzebne w procesie produkcyjnym (tzw. substancje pomocnicze), naturalnymi zamiennikami pochodzącymi z kokosa, ryżu i ziemniaków'
  },
  {
    id: 14,
    name: 'Zinobiotic +',
    price: '129.00',
    image: '/img/products/14.jpg',
    category: categories.find(category => category.slug === 'blonnik-dla-jelit').slug,
    description: 'ZinoBiotic+ to specjalna mieszanka 8 naturalnych rodzajów błonnika pokarmowego. Są one metabolizowane w okrężnicy (jelito grube), gdzie wspierają rozrost zdrowych bakterii. ZinoBiotic+ pomaga ograniczyć skoki poziomu cukru we krwi po posiłkach, i utrzymać właściwy poziom cholesterolu. Błonnik wspomaga zdrowe funkcjonowanie jelit.'
  },
  {
    id: 15,
    name: 'Zinogene +',
    price: '249.00',
    image: '/img/products/15.png',
    category: categories.find(category => category.slug === 'suplementy-przywracajace-zdrowie').slug,
    description: 'ZinoGene+ to suplementy diety bazujące na przełomowej i innowacyjnej technologii. To przełomowe odkrycie naukowe bazujące na złożonej formule fukoidyny czyli naturalnych polisacharydach z wodorostów morskich, polifenolach, witaminie C oraz cynku wspomagającego syntezę DNA i podział komórek. Nagromadzenie niewłaściwie funkcjonujących komórek oraz pogarszające się właściwości regeneracyjne to nieodzowna część procesu starzenia. Tempo starzenia się zależy od ilości składników odżywczych w naszej diecie. Dlatego opracowaliśmy suplement ZinoGene+.'
  },
  {
    id: 16,
    name: 'Zinoshine +',
    price: '75.00',
    image: '/img/products/16.png',
    category: categories.find(category => category.slug === 'suplementy-na-odpornosc').slug,
    description: 'To unikalny suplement diety z witaminą D3 i magnezem o szerokim spektrum działania. Opatentowana mieszanka została opracowana, aby wspierać układ odpornościowy, zmniejszać uczucie zmęczenia i znużenia oraz wspomagać mięśnie, kości i zęby.'
  },
  {
    id: 17,
    name: 'Protokół zdrowia',
    price: '418.00',
    image: '/img/products/HP.png',
    category: categories.find(category => category.slug === 'suplementy-na-odpornosc').slug,
    description: 'Opis produktu będzie dodany wkrótce.'
  },
  {
    id: 18,
    name: 'Zestaw BalanceOil+ z testem',
    price: '600.00',
    image: '/img/products/EO.png',
    category: categories.find(category => category.slug === 'suplementy-na-odpornosc').slug,
    description: 'Opis produktu będzie dodany wkrótce.'
  }
];

export default products;