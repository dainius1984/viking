import categories from './category-data';
import './product-styles.css';

const products = [
  {
    id: 1,
    name: 'BalanceOil+300ml Cytrynowy',
    price: '175.00',
    image: '/img/products/1.png',
    category: categories.find(category => category.slug === 'suplementy-omega-3').slug,
    description: `<div class="product-description">
      <h2 class="product-title">BalanceOil+</h2>
      
      <p class="product-intro">Nasza flagowa seria w pełni naturalnych suplementów diety o zrównoważonej zawartości polifenoli i kwasów omega. Ta innowacyjna mieszanka wysokiej jakości, stworzona na bazie naszej wyjątkowej, naukowej formuły z dodatkiem olejów pozyskanych z dziko odławianych małych ryb oraz oliwy extra virgin wytłoczonej z niedojrzałych jeszcze oliwek dostarcza dużą ilość polifenoli, zapewniając skuteczne przyswajanie i ochronę lipidów we krwi.</p>
      
      <p>Bezpiecznie podnosi i utrzymuje poziom kwasów Omega-3 w organizmie, regulując stosunek Omega-6:3 i zapewniając ich korzystne stężenie dla Twojego cholesterolu, serca i mózgu.</p>
      
      <div class="benefits-container">
        <div class="benefit-card">
          <div class="benefit-icon">❤️</div>
          <h4>Wspomaga prawidłowe funkcjonowanie serca</h4>
        </div>
        
        <div class="benefit-card">
          <div class="benefit-icon">🛡️</div>
          <h4>Wspomaga prawidłowe funkcjonowanie układu odpornościowego</h4>
        </div>
        
        <div class="benefit-card">
          <div class="benefit-icon">🧠</div>
          <h4>Wspomaga prawidłowe funkcjonowanie mózgu</h4>
        </div>
      </div>
    </div>`
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
    description: `<div class="product-description">
      <h2 class="product-title">ZINZINO XTEND+</h2>
      <p class="product-subtitle">W PEŁNI NATURALNY SUPLEMENT DIETY WSPOMAGAJĄCY ODPORNOŚĆ</p>
      
      <p>Xtend+ to wegański suplement diety odżywiający organizm i stymulujący odporność, który zawiera wyłącznie składniki pochodzenia naturalnego. Produkt doskonale uzupełnia BalanceOil i ZinoBiotic. Stworzony, by wspierać nasz wrodzony układ odpornościowy, zawiera mikro- i fitoskładniki, w tym 22 podstawowe witaminy i minerały oraz oczyszczone 1-3, 1-6 beta-glukany z drożdży piekarskich.</p>
      
      <div class="product-info">
        <p><strong>Zawartość:</strong> 60 kapsułek o łącznej masie netto 45 g</p>
      </div>
      
      <h3 class="benefits-heading">NAJWAŻNIEJSZE KORZYŚCI:</h3>
      <ul class="benefits-list">
        <li><span class="benefit-icon">⚡</span> <strong>Więcej energii</strong></li>
        <li><span class="benefit-icon">🦴</span> <strong>Poprawa funkcjonowania kości i stawów</strong></li>
        <li><span class="benefit-icon">🛡️</span> <strong>Wzmocnienie układu odpornościowego</strong></li>
        <li><span class="benefit-icon">🔄</span> <strong>Zapewnia kompleksową dawkę czynników żywieniowych niezbędnych do wzrostu i naprawy tkanek</strong></li>
      </ul>
      
      <div class="feature-box">
        <h3>WEGAŃSKA FORMUŁA</h3>
        <p>Xtend+ ma formę łatwych do połknięcia wegańskich kapsułek. Przez "naturalne" rozumie się, że witaminy są pozyskiwane ze źródeł naturalnych, na przykład z jagód aceroli (witamina C) i gryki (witaminy z grupy B). Także minerały są pochodzenia naturalnego.</p>
      </div>
      
      <div class="benefits-grid">
        <div class="benefit-card">
          <div class="benefit-icon-large">🌱</div>
          <h4>100% NATURALNE</h4>
          <p>Wszystkie składniki są pozyskiwane ze źródeł naturalnych, co pozwala zachować wszystkie fitoskładniki odżywcze.</p>
        </div>
        
        <div class="benefit-card">
          <div class="benefit-icon-large">🛡️</div>
          <h4>WSPARCIE ODPORNOŚCI</h4>
          <p>Zawiera oczyszczone 1-3, 1-6 beta-glukany z drożdży piekarskich, które skutecznie wspierają układ odpornościowy.</p>
        </div>
        
        <div class="benefit-card">
          <div class="benefit-icon-large">🔄</div>
          <h4>KOMPLEKSOWE ODŻYWIANIE</h4>
          <p>22 podstawowe witaminy i minerały zapewniają kompleksowe wsparcie dla organizmu.</p>
        </div>
      </div>
      
      <div class="ingredients-section">
        <h3>NATURALNE SKŁADNIKI</h3>
        <p>Zastąpiliśmy nieaktywne składniki, takie jak środki przeciwzbrylające i wypełniające potrzebne w procesie produkcyjnym (tzw. substancje pomocnicze), naturalnymi zamiennikami pochodzącymi z:</p>
        <ul class="ingredients-list">
          <li><span class="check-icon">✓</span> Kokosa</li>
          <li><span class="check-icon">✓</span> Ryżu</li>
          <li><span class="check-icon">✓</span> Ziemniaków</li>
        </ul>
      </div>
      
      <div class="features-grid">
        <div class="feature-item">
          <h4>WEGAŃSKIE</h4>
          <p>Formuła w 100% wegańska, odpowiednia dla osób na diecie roślinnej.</p>
        </div>
        
        <div class="feature-item">
          <h4>NATURALNE ŹRÓDŁA</h4>
          <p>Witamina C z jagód aceroli, witaminy z grupy B z gryki oraz minerały z naturalnych źródeł.</p>
        </div>
        
        <div class="feature-item">
          <h4>ŁATWE STOSOWANIE</h4>
          <p>Wygodna forma łatwych do połknięcia kapsułek, idealna do codziennego stosowania.</p>
        </div>
        
        <div class="feature-item">
          <h4>KOMPLEKSOWE WSPARCIE</h4>
          <p>Doskonałe uzupełnienie BalanceOil i ZinoBiotic w ramach kompleksowego protokołu zdrowotnego.</p>
        </div>
      </div>
      
      <div class="dosage-section">
        <h3>ZALECANE STOSOWANIE:</h3>
        <p>Dorośli i dzieci powyżej 12 roku życia: 2 kapsułki dziennie. Nie przekraczać zalecanej porcji do spożycia w ciągu dnia.</p>
        <p class="warning">Suplement diety nie może być stosowany jako substytut zróżnicowanej diety. Zrównoważony sposób żywienia i zdrowy tryb życia są ważne.</p>
      </div>
    </div>`
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
    description: `<div class="product-description">
      <h2 class="product-title">HEALTH PROTOCOL – KLUCZ DO ZDROWIA I RÓWNOWAGI W CODZIENNYM ŻYCIU</h2>
      
      <p class="product-intro">W dobie współczesnych wyzwań nasze zdrowie staje się coraz bardziej podatne na działanie negatywnych czynników, takich jak przewlekły stres, niewłaściwie zbilansowana dieta, siedzący tryb życia czy wszechobecne zanieczyszczenia środowiska. Każdego dnia docierają do nas informacje o nowych cudownych dietach, suplementach i metodach na poprawę samopoczucia, co często prowadzi do dezorientacji.</p>
      
      <p><strong>Jak w gąszczu tych propozycji odnaleźć rozwiązanie, które naprawdę działa i przynosi długotrwałe korzyści?</strong> Odpowiedzią jest Health Protocol – kompleksowe podejście oparte na solidnych podstawach naukowych, które harmonizuje naturalne składniki z najnowszymi odkryciami medycyny i dietetyki, oferując wsparcie dla organizmu w kluczowych aspektach zdrowia.</p>
      
      <div class="protocol-intro">
        <h3>Health Protocol wyróżnia się holistycznym podejściem, koncentrując się na trzech filarach dobrego samopoczucia:</h3>
      </div>
      
      <div class="pillars-container">
        <div class="pillar-card">
          <div class="pillar-icon">⚖️</div>
          <h4>Równowaga kwasów tłuszczowych Omega-6 do Omega-3</h4>
          <p>Współczesna dieta często charakteryzuje się nadmiarem kwasów Omega-6 (obecnych w olejach roślinnych czy przetworzonej żywności) przy jednoczesnym niedoborze Omega-3 (znajdujących się m.in. w tłustych rybach czy siemieniu lnianym). Taki brak równowagi może prowadzić do stanów zapalnych w organizmie, które są podłożem wielu chorób przewlekłych.</p>
          <p><strong>Health Protocol pomaga przywrócić optymalny stosunek tych kwasów</strong>, wspierając funkcjonowanie układu nerwowego, sercowo-naczyniowego oraz poprawiając zdolności regeneracyjne organizmu.</p>
        </div>
        
        <div class="pillar-card">
          <div class="pillar-icon">🦠</div>
          <h4>Zdrowie jelit</h4>
          <p>Jelita są nie tylko centrum trawienia, ale także kluczowym elementem układu odpornościowego i miejscem, gdzie zachodzi produkcja wielu ważnych neuroprzekaźników, takich jak serotonina.</p>
          <p><strong>Health Protocol wykorzystuje naturalne składniki</strong>, takie jak probiotyki, prebiotyki i błonnik, aby wspierać mikrobiom jelitowy, poprawiać trawienie, redukować stany zapalne i zwiększać wchłanianie składników odżywczych.</p>
        </div>
        
        <div class="pillar-card">
          <div class="pillar-icon">🛡️</div>
          <h4>Wzmocnienie układu odpornościowego</h4>
          <p>W obliczu codziennych wyzwań, takich jak zmienne warunki pogodowe, kontakt z patogenami czy stres, odporność jest naszą tarczą ochronną.</p>
          <p><strong>Health Protocol dostarcza organizmowi niezbędnych witamin, minerałów i antyoksydantów</strong> (np. witaminy C, D, cynku czy polifenoli), które działają synergicznie, wzmacniając naturalne mechanizmy obronne i pomagając w szybszej regeneracji.</p>
        </div>
      </div>
      
      <div class="unique-features">
        <h3>Co wyróżnia Health Protocol?</h3>
        <ul class="features-list">
          <li><span class="feature-icon">✅</span> <strong>Skuteczność</strong> - potwierdzona badaniami naukowymi i doświadczeniem klinicznym</li>
          <li><span class="feature-icon">✅</span> <strong>Uniwersalność</strong> - odpowiedni dla różnych grup wiekowych i stylów życia</li>
          <li><span class="feature-icon">✅</span> <strong>Prostota wdrożenia</strong> - nie wymaga drastycznych zmian ani skomplikowanych planów</li>
          <li><span class="feature-icon">✅</span> <strong>Naturalne składniki</strong> - działające w zgodzie z fizjologią organizmu</li>
          <li><span class="feature-icon">✅</span> <strong>Holistyczne podejście</strong> - uwzględniające wzajemne powiązania między różnymi układami ciała</li>
        </ul>
      </div>
      
      <div class="target-groups">
        <h3>Dla kogo jest Health Protocol?</h3>
        <div class="groups-container">
          <div class="group-item">
            <h4>Dla osób aktywnych</h4>
            <p>Chcących utrzymać energię i witalność na wysokim poziomie</p>
          </div>
          <div class="group-item">
            <h4>Dla zapracowanych</h4>
            <p>Szukających prostego i skutecznego rozwiązania w zabieganym życiu</p>
          </div>
          <div class="group-item">
            <h4>Dla zmagających się z przewlekłym zmęczeniem</h4>
            <p>Potrzebujących wsparcia w odzyskaniu równowagi i sił witalnych</p>
          </div>
          <div class="group-item">
            <h4>Dla świadomych zdrowotnie</h4>
            <p>Inwestujących w swoje zdrowie długoterminowo</p>
          </div>
        </div>
      </div>
      
      <div class="conclusion">
        <p>Health Protocol to nie kolejna dieta czy chwilowy trend – to <strong>styl życia</strong>, który pozwala odzyskać kontrolę nad zdrowiem, wspiera równowagę wewnętrzną i buduje solidne fundamenty dla długowieczności. Poprzez połączenie nauki i natury, ten protokół staje się kluczem do harmonii w zabieganym świecie, oferując nie tylko lepsze samopoczucie dziś, ale i inwestycję w zdrowie na lata.</p>
      </div>
    </div>`
  },
  {
    id: 18,
    name: 'Zestaw BalanceOil+ z testem',
    price: '600.00',
    image: '/img/products/EO.png',
    category: categories.find(category => category.slug === 'suplementy-na-odpornosc').slug,
    description: `<div class="product-description">
      <h2 class="product-title">ZINZINO BALANCEOIL+ 100ml</h2>
      <p>Zinzino BalanceOil+ to synergiczne połączenie wysokiej jakości oleju z ryb, bogatego w kwasy tłuszczowe omega-3 EPA i DHA i specjalnie dobranej oliwy z pierwszego tłoczenia o wysokiej zawartości polifenoli. BalanceOil+ bezpiecznie dostosowuje i utrzymuje prawidłowy poziom EPA + DHA i kwasów tłuszczowych omega-6:3 w organizmie. BalanceOil+ wspomaga optymalną pracę mózgu i prawidłową pracę serca i wzmacnia układ odpornościowy.</p>

      <h3 class="benefits-heading">NAJWAŻNIEJSZE KORZYŚCI</h3>
      <ul class="benefits-list">
        <li><span class="benefit-icon">🧠</span> <strong>Wspomaga prawidłowe funkcjonowanie mózgu</strong>, ponieważ dzienna dawka zawiera 700 mg kwasu dokozaheksaenowego</li>
        <li><span class="benefit-icon">❤️</span> <strong>Prawidłowe funkcjonowanie serca</strong>, ponieważ dzienna dawka zawiera 1300 mg kwasu eikozapentaenowego oraz 700 mg kwasu dokozaheksaenowego</li>
        <li><span class="benefit-icon">🛡️</span> <strong>Wspomaga prawidłowe funkcjonowanie układu odpornościowego</strong>, ponieważ dzienna dawka zawiera 20 µg witaminy D3</li>
        <li><span class="benefit-icon">⚖️</span> <strong>Suplement diety pomaga utrzymać odpowiedni poziom kwasów omega-3 DHA i EPA</strong></li>
        <li><span class="benefit-icon">📊</span> <strong>Jest ważny</strong>, ponieważ utrzymuje optymalny poziom kwasów Omega-6:3 w Twoim organizmie</li>
        <li><span class="benefit-icon">🌿</span> <strong>Pomaga utrzymać polifenole</strong> w Twoim ciele na poziomie, który ochroni lipidy krwi przed stresem oksydacyjnym</li>
        <li><span class="benefit-icon">👁️</span> <strong>Bez wątpienia dba o zdrowie oczu</strong> i wspiera ich prawidłowe funkcjonowanie</li>
        <li><span class="benefit-icon">🦴</span> <strong>Wspomaga prawidłową budowę kości</strong>, prawidłowe funkcjonowanie mięśni, prawidłową budowę zębów oraz podział komórek</li>
        <li><span class="benefit-icon">💉</span> <strong>Pomaga utrzymać zawartość trójglicerydów we krwi</strong> oraz jej ciśnienie, a także ilość wapnia na prawidłowym poziomie</li>
      </ul>

      <div class="feature-box">
        <h3>SYNERGIA OLEJU Z RYB I OLIWY Z OLIWEK</h3>
        <p>Naukowcy opracowali BalanceOil+ tak, by łączył kwasy Omega-3 z odpowiednią zawartością oliwy z oliwek, która dostarcza kwasów Omega-9 oraz antyoksydantów w bardzo dużych ilościach. To synergiczne połączenie sprawia, że można w bezpieczny sposób dostosować i utrzymać kwasy Omega-3 w Twoim ciele na takim poziomie, aby uzyskać balans Omega-6:3 wynoszący mniej niż 3:1.</p>
      </div>

      <div class="feature-box">
        <h3>DOWÓD NA OSIĄGNIĘCIE RÓWNOWAGI W 120 DNI</h3>
        <p>Certyfikowane laboratoria odpowiedzialne są za analizowanie testów suchej kropli krwi na zawartość jedenastu kwasów tłuszczowych, co czyni bazę danych Zinzino największą tego typu na świecie. Przeciętny stosunek kwasów Omega-6:3 u ludzi, którzy nie przyjmują żadnych suplementów diety zawierających kwasy Omega-3 wynosi 12:1 dla Europy Północnej, 15:1 dla Europy oraz 25:1 dla Stanów Zjednoczonych. Po przyjmowaniu BalanceOil+ przez 120 dni średni stosunek dla większości ludzi wynosi mniej niż 3:1.</p>
      </div>

      <div class="benefits-grid">
        <div class="benefit-card">
          <div class="benefit-icon-large">🧠</div>
          <h4>FUNKCJONOWANIE MÓZGU</h4>
          <p>EPA i DHA mają potwierdzone działanie zdrowotne dla utrzymania prawidłowego funkcjonowania mózgu.</p>
        </div>

        <div class="benefit-card">
          <div class="benefit-icon-large">❤️</div>
          <h4>FUNKCJONOWANIE SERCA</h4>
          <p>EPA i DHA mają potwierdzone działanie zdrowotne dla zachowania zdrowego serca. Przyczyniają się do prawidłowego funkcjonowania serca.</p>
        </div>

        <div class="benefit-card">
          <div class="benefit-icon-large">🛡️</div>
          <h4>UKŁAD ODPORNOŚCIOWY</h4>
          <p>BalanceOil+ zawiera witaminę D3, niezwykle istotną dla układu odpornościowego, gdyż wspomaga jego prawidłowe funkcjonowanie.</p>
        </div>
      </div>

      <div class="ingredients-section">
        <h3>TYLKO NATURALNE SKŁADNIKI</h3>
        <ul class="ingredients-list">
          <li><span class="check-icon">✓</span> Naturalny triglicerydowy olej rybny</li>
          <li><span class="check-icon">✓</span> Tłoczona na zimno oliwa z oliwek najwyższej jakości z pierwszego tłoczenia</li>
          <li><span class="check-icon">✓</span> Witamina D3 naturalnego pochodzenia</li>
          <li><span class="check-icon">✓</span> Certyfikowane naturalne smaki</li>
        </ul>
      </div>

      <div class="features-grid">
        <div class="feature-item">
          <h4>OCHRONA ZAPEWNIANA PRZEZ POLIFENOLE</h4>
          <p>Chroń swoje komórki przed utlenianiem (oksydacją). Polifenole z oliwy z oliwek wspomagają ochronę lipidów krwi przed uszkodzeniami oksydacyjnymi.</p>
        </div>

        <div class="feature-item">
          <h4>ULTRACZYSTOŚĆ</h4>
          <p>Produkt molekularnie testowany pod kątem toksyn w celu zapewnienia świeżości, bezpieczeństwa i czystości, którym można zaufać.</p>
        </div>

        <div class="feature-item">
          <h4>ŻYWNOŚĆ NASTĘPNEJ GENERACJI</h4>
          <p>Synergiczna formuła, która wspomaga prawidłowe funkcjonowanie serca, mózgu oraz układu odpornościowego.</p>
        </div>

        <div class="feature-item">
          <h4>ODŻYWIANIE POPARTE WYNIKAMI TESTÓW</h4>
          <p>Sprawdź swoje indywidualne wyniki testów "przed" i "po" rozpoczęciu przyjmowania BalanceOil+</p>
        </div>
      </div>

      <div class="ingredients-details">
        <h3>Składniki:</h3>
        <h4>NATURALNE</h4>
        <p>Suplement diety BalanceOil produkowany jest wyłącznie ze składników naturalnego pochodzenia.</p>

        <h4>BEZ GMO</h4>
        <p>Produkty nie zawierają składników modyfikowanych genetycznie (bez GMO).</p>

        <h4>OLEJE RYBNE</h4>
        <p>Oleje rybne wykorzystane w produktach BalanceOil mają bardzo ściśle określone wymogi dla kwasów eikozapentaenowego i dokozaheksaenowego, które w ciągu 120 dni skutecznie optymalizują stosunek kwasów tłuszczowych Omega-6:3 w ludzkim ciele. Składniki, których używamy, wytwarzane są głównie z krótko żyjących niewielkich ryb pelagicznych, takich jak sardynki i sardele.</p>
        <p>Kwasy omega-3 z oleju rybnego uzyskiwane są z całych, nieprzetworzonych ryb. Olej przechodzi proces rafinowania w celu usunięcia zanieczyszczeń środowiskowych (jeśli takowe występują) i uzyskuje certyfikat potwierdzający brak obecności metali ciężkich oraz innych toksyn. Przede wszystkim LYSI, producent BalanceOil, spełnia wszelkie wymogi prawne dla produkcji oraz stosuje DPP (Dobre praktyki produkcyjne) dla produktów żywnościowych i farmaceutycznych.</p>

        <h4>OLIWA Z OLIWEK Z PIERWSZEGO TŁOCZENIA</h4>
        <p>Suplement diety z Hiszpańskich oliwek odmiany Picual wybierane są ponieważ mają wysoką zawartość kwasów Omega-9 oraz antyoksydantów. Z niedojrzałych jeszcze oliwek w trakcie procesu produkcyjnego usuwa się pestki i na zimno tłoczy same owoce, co w rezultacie daje oliwę extra virgin, bogatą w kwasy Omega-9 (kwas oleinowy) i antyoksydanty zwane polifenolami (powyżej 750 mg/kg5), które mają pozytywny wpływ na organizm. Polifenole chronią BalanceOil przed upływem czasu, lecz, co ważniejsze, zapewniają ochronę również Twoim komórkom.</p>

        <h4>Witamina D3</h4>
        <p>BalanceOil zawiera kwasy omega-3 witaminę D3 (cholekalcyferol). Używamy naturalnej witaminy D3 (cholekalcyferol) uzyskiwanej z lanoliny. Lanolina jest naturalnie występującym tłuszczem otrzymywanym w rezultacie z wełny owczej. Witamina D3 jest uzyskiwana poprzez rozpuszczenie prekursora witaminy D3 z lanoliny. Jest on następnie chemicznie zmieniany i aktywowany przez wystawienie na promieniowanie ultrafioletowe (UV). Bez wątpienia ten proces chemiczny porównywalny jest do procesu, który zachodzi w ludzkiej skórze podczas produkcji witaminy D3.</p>

        <h4>NATURALNE TOKOFEROLE</h4>
        <p>Mieszanka tokoferoli to z pewnością powszechnie stosowany w suplementach diety antyoksydant. Dlatego wykorzystywane przy produkcji naturalne tokoferole uzyskiwane są z pewnością z wolnych od GMO, wysoko rafinowanych destylatów oleju sojowego, które przechodzą dalszy proces rafinacji i tym samym nie zawierają żadnych białek sojowych. Przede wszystkim oznacza to, że pozbawione są alergenów. Typowy skład jest następujący: alfa-, beta-, gamma- i delta-tokoferole.</p>
      </div>

      <div class="dosage-section">
        <h3>SUGEROWANE DAWKOWANIE:</h3>
        <p>0,15 ml na kilogram masy ciała. Dlatego porcję należy dostosować w oparciu o masę ciała.</p>
        <ul>
          <li>Dorośli o masie ciała wynoszącej 50 kg: 7,5 ml dziennie.</li>
          <li>Dorośli o masie ciała wynoszącej 80 kg: 12 ml dziennie.</li>
        </ul>
        <p class="warning">Nie przekraczać zalecanej dawki dziennej. Suplement diety przede wszystkim nie może zastąpić zrównoważonej i zróżnicowanej diety.</p>
      </div>

      <div class="ingredients-final">
        <h3>SKŁADNIKI:</h3>
        <p>Olej rybny (z sardeli, makreli, sardynki), tłoczona na zimno oliwa z oliwek, mieszanka tokoferoli (antyoksydantów), naturalne substancje smakowe, witamina D3 (cholekalcyferol).</p>
      </div>
    </div>`
  }
]

export default products;