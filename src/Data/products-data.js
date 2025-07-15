import categories from './category-data';
import './product-styles.css';
import { balanceOilDescription } from './balanceoil-description';

const products = [
  {
    id: 1,
    name: 'BalanceOil+300ml Cytrynowy',
    price: '175.00',
    image: '/img/products/1.png',
    category: categories.find(category => category.slug === 'suplementy-omega-3').slug,
    description: balanceOilDescription
  },
  {
    id: 2,
    name: 'BalanceOil+300ml Grejpfrut, Cytryna i Limonka',
    price: '175.00',
    image: '/img/products/2.png',
    category: categories.find(category => category.slug === 'suplementy-omega-3').slug,
    description: balanceOilDescription
  },
  {
    id: 3,
    name: 'BalanceOil+300ml Pomarańcza, Cytryna i Mięta',
    price: '175.00',
    image: '/img/products/3.png',
    category: categories.find(category => category.slug === 'suplementy-omega-3').slug,
    description: balanceOilDescription
  },
  {
    id: 4,
    name: 'BalanceOil+300ml Tutti Frutti',
    price: '175.00',
    image: '/img/products/4.png',
    category: categories.find(category => category.slug === 'suplementy-omega-3').slug,
    description: balanceOilDescription
  },
  {
    id: 5,
    name: 'BalanceOil+100ml Pomarańcza, Cytryna i Mięta',
    price: '65.00',
    image: '/img/products/5.png',
    category: categories.find(category => category.slug === 'suplementy-omega-3').slug,
    description: balanceOilDescription
  },
  {
    id: 6,
    name: 'BalanceOil+300ml AquaX',
    price: '209.00',
    image: '/img/products/6.png',
    category: categories.find(category => category.slug === 'suplementy-omega-3').slug,
    description: balanceOilDescription
  },
  {
    id: 7,
    name: 'BalanceOil+Premium 300ml',
    price: '250.00',
    image: '/img/products/7.png',
    category: categories.find(category => category.slug === 'suplementy-omega-3').slug,
    description: balanceOilDescription
  },
  {
    id: 8,
    name: 'Essent+Premium',
    price: '220.00',
    image: '/img/products/8.jpeg',
    category: categories.find(category => category.slug === 'suplementy-omega-3').slug,
    description: `<div class="product-description">
      <h2 class="product-title">ESSENT+ PREMIUM</h2>
      
      <div class="intro-section">
        <p>Nowa generacja suplementów diety. Ten ultraczysty, testowany molekularnie suplement diety z polifenolami i kwasami Omega Balans bezpiecznie dostosowuje i utrzymuje balans Omega-6:3, jednocześnie chroniąc komórki przed utlenianiem i wspomagając prawidłowe funkcjonowanie mózgu, serca i układu odpornościowego. Essent to synergiczna mieszanka skoncentrowanego wysokiej klasy oleju rybnego o wysokiej zawartości tłuszczu w kwasów tłuszczowych Omega-3 EPA i DHA, z dodatkiem oliwy z oliwek z pierwszego tłoczenia, ekstraktu z owoców drzewa oliwnego oraz kakao — wszystkie te składniki dostarczają dużej ilości polifenoli.</p>
      </div>

      <div class="main-features">
        <h3>NAJWAŻNIEJSZE FUNKCJE</h3>
        
        <div class="feature-grid">
          <div class="feature-item">
            <h4>FUNKCJONOWANIE MÓZGU</h4>
            <p>Dla EPA i DHA zatwierdzono oświadczenia, że utrzymują prawidłowe funkcjonowanie mózgu. W przypadku kobiet w ciąży i karmiących piersią, DHA wspomaga prawidłowy rozwój mózgu płodu oraz karmionych niemowląt. Długołańcuchowe kwasy tłuszczowe omega-3 są istotne dla zdrowia zarówno naszego, jak i kolejnego pokolenia.</p>
          </div>

          <div class="feature-item">
            <h4>FUNKCJONOWANIE SERCA</h4>
            <p>EPA i DHA mają potwierdzone działanie zdrowotne dla zachowania zdrowego serca. Przyczyniają się do prawidłowego funkcjonowania serca.</p>
          </div>

          <div class="feature-item">
            <h4>UKŁAD ODPORNOŚCIOWY</h4>
            <p>Essent zawiera witaminę D3, niezwykle istotną dla układu odpornościowego, gdyż wspomaga jego prawidłowe funkcjonowanie.</p>
          </div>

          <div class="feature-item">
            <h4>OCHRONA PRZED OKSYDACJĄ</h4>
            <p>Hydroksytyrozol z oliwek wspomaga ochronę lipidów krwi przed uszkodzeniami oksydacyjnymi, jeśli jego dzienna dawka wynosi 5 mg lub więcej. Lipidy to substancje przypominające tłuszcze znajdujące się we krwi i tkankach; zaliczają się do nich cholesterol i trójglicerydy, od których zależy zdrowie naszego serca.</p>
          </div>
        </div>
      </div>

      <div class="synergy-section">
        <h3>SYNERGIA OLEJU Z RYB I OLIWY Z OLIWEK = WYNIKI</h3>
        <p>Naukowcy opracowali suplement Essent jako mieszankę kilku wysokiej jakości kwasów tłuszczowych Omega-3 w skoncentrowanej postaci, ale pozostających naturalnymi trójglicerydami, z wyjątkowo wysoką zawartością (85%) kwasów EPA i DHA oraz kwasem tłuszczonym Omega-9 z oliwy z oliwek z pierwszego tłoczenia. Essent ma również bardzo wysoką zawartość polifenoli (23 mg) w postaci specjalnej mieszanki hydroksytyrozolu i flawanoli. Hydroksytyrozol pochodzi z oliwy z oliwek i ekstraktu z owoców drzewa oliwnego, natomiast flawanol zawarty jest w kakao.</p>
      </div>

      <div class="evidence-section">
        <h3>DOWÓD NA OSIĄGNIĘCIE RÓWNOWAGI W 120 DNI</h3>
        <p>Nasze certyfikowane laboratoria odpowiedzialne są za analizowanie testów suchej kropli krwi na zawartość jedenastu kwasów tłuszczowych, co czyni naszą bazę danych największą tego typu na świecie. Przeciętny stosunek kwasów Omega-6:3 u ludzi, którzy nie przyjmują żadnych suplementów diety zawierających kwasy Omega-3 wynosi 12:1 dla Europy Północnej, 15:1 dla Europy oraz 25:1 dla Stanów Zjednoczonych. Po przyjmowaniu produktów BalanceOil przez 120 dni średni stosunek dla większości ludzi wynosi mniej niż 3:1.</p>
      </div>

      <div class="benefits-section">
        <h3>NAJWAŻNIEJSZE KORZYŚCI:</h3>
        <ul class="benefits-list">
          <li>Pomaga utrzymać polifenole w Twoim ciele na poziomie, który ochroni lipidy krwi przed stresem oksydacyjnym</li>
          <li>Wspomaga prawidłowe funkcjonowanie serca</li>
          <li>Przyczynia się do prawidłowego funkcjonowania mózgu</li>
          <li>Wspomaga prawidłowe funkcjonowanie układu odpornościowego</li>
          <li>Dba o zdrowie oczu i wspiera ich prawidłowe funkcjonowanie</li>
          <li>Pomaga utrzymać poziom trójglycerydów i ciśnienia krwi w normalnych granicach</li>
          <li>Pomaga utrzymać zdrowie kości, mięśni, zębów i komórek</li>
          <li>Pomaga utrzymać optymalny poziom kwasów Omega-6:3 w organizmie</li>
        </ul>
      </div>

      <div class="ingredients-section">
        <h3>SKŁADNIKI:</h3>
        <p>Oleje rybne, żelatyna rybna, środek utrzymujący wilgotność (glicerol), oliwa z oliwek z pierwszego tłoczenia na zimno, kakao w proszku, zagęszczacz (ditlenek krzemu), woda, ekstrakt z owoców drzewa oliwnego (Olea europaea), witamina D3 (cholekalcyferol).</p>
        
        <h4>GŁÓWNE SKŁADNIKI:</h4>
        <div class="ingredients-grid">
          <div class="ingredient-item">
            <h5>OLIWA Z OLIWEK Z PIERWSZEGO TŁOCZENIA</h5>
            <p>Hiszpańskie oliwki odmiany Picual wybierane są z uwagi na wysoką zawartość kwasów Omega-9 oraz antyoksydantów. Oliwki jeszcze niedojrzałe, a w procesie tym usuwa się pestki i jedynie owoce są tłoczone na zimno, produkując olej z pierwszego tłoczenia, bogaty w kwas Omega-9 (kwas oleinowy) o bardzo wysokiej zawartości przeciwutleniaczy zwanych polifenolami (powyżej 750 mg/kg).</p>
          </div>

          <div class="ingredient-item">
            <h5>WITAMINA D3</h5>
            <p>Essent zawiera naturalną witaminę D3 (cholekalcyferol) uzyskiwaną z lanoliny. 3 miękkie kapsułki softgel dostarczają 20 μg.</p>
          </div>

          <div class="ingredient-item">
            <h5>KAKAO W PROSZKU</h5>
            <p>Kakao w proszku z odtłuszczonych ziaren kakao ma wysoką zawartość polifenoli, a w szczególności ich podgrupy zwanej flawanolami. Dawka dobowa 3 miękkich kapsułek softgel dostarcza 17,9 mg polifenoli.</p>
          </div>
        </div>
      </div>

      <div class="dosage-section">
        <h3>SUGEROWANE DAWKOWANIE:</h3>
        <p>1 miękka kapsułka softgel na około 30 kilogramów masy ciała. Porcję należy dostosować w oparciu o masę ciała:</p>
        <ul>
          <li>Dorośli o masie ciała 50–60 kg: 2 miękkie kapsułki softgel dziennie</li>
          <li>Dorośli o masie ciała 80–90 kg: 3 miękkie kapsułki softgel dziennie</li>
          <li>Maksymalnie 5 miękkich kapsułek softgel dziennie</li>
        </ul>
        <p class="warning">Nie przekraczać zalecanej dawki dziennej. Suplement diety nie może zastąpić zrównoważonej i zbilansowanej diety.</p>
      </div>

      <div class="additional-info">
        <h3>DODATKOWE INFORMACJE:</h3>
        <ul class="info-list">
          <li><strong>ZINZINO POLYPHENOL BLEND:</strong> Hydroksytyrozol, kakao i polifenole z oliwek</li>
          <li><strong>ZINZINO BALANCE BLEND:</strong> Kwasy EPA, DHA i Omega-9</li>
          <li><strong>NATURALNE:</strong> Essent produkowany jest wyłącznie ze składników naturalnego pochodzenia</li>
          <li><strong>BEZ GMO:</strong> Produkt nie zawierają składników modyfikowanych genetycznie</li>
        </ul>
      </div>

      <div class="storage-warning">
        <h3>PRZECHOWYWANIE:</h3>
        <p>Przechowywać w suchym i zacienionym miejscu o temperaturze pokojowej lub w lodówce. Należy trzymać w miejscu niedostępnym dla dzieci.</p>
      </div>
    </div>`
  },
  {
    id: 9,
    name: 'BalanceTest',
    price: '250.00',
    image: '/img/products/9.png',
    category: categories.find(category => category.slug === 'testy').slug,
    description: `<div class="product-description">
      <h2 class="product-title">BALANCETEST</h2>
      <h3 class="product-subtitle">INNOWACYJNY TEST SUCHEJ KROPLI KRWI</h3>

      <div class="intro-section">
        <p>BalanceTest to innowacyjny test suchej kropli krwi, który pozwala na precyzyjne określenie profilu kwasów tłuszczowych w organizmie. Jego dokładność została potwierdzona w badaniach klinicznych, gdzie wykazano, że wyniki uzyskane za pomocą tej metody są równie wiarygodne, co pomiary stężenia kwasów tłuszczowych w próbkach krwi żylnej. Procedura jest niezwykle prosta i wygodna – wystarczy pobrać kilka kropli krwi z opuszki palca, nanieść je na specjalną bibułę filtracyjną, a cały proces zajmuje mniej niż minutę.</p>
      </div>

      <div class="main-features">
        <h3>KLUCZOWE CECHY</h3>
        <div class="benefits-container">
          <div class="benefit-card">
            <span class="benefit-icon">🏠</span>
            <h4>Łatwy w użyciu</h4>
            <p>Test do samodzielnej analizy suchej kropli krwi – prostota i wygoda pozwalają na wykonanie testu w domowym zaciszu bez konieczności wizyty w laboratorium.</p>
          </div>

          <div class="benefit-card">
            <span class="benefit-icon">🔬</span>
            <h4>Kompleksowa analiza</h4>
            <p>Mierzy poziom 11 kwasów tłuszczowych we krwi – dostarcza kompleksowych danych na temat składu lipidowego organizmu, odzwierciedlając dietę z ostatnich 120 dni.</p>
          </div>

          <div class="benefit-card">
            <span class="benefit-icon">⚖️</span>
            <h4>Balans omega-6:3</h4>
            <p>Pozwala ocenić, czy stosunek omega-6 do omega-3 jest na poziomie poniżej 3:1, co jest uznawane za optymalne dla utrzymania prawidłowego rozwoju komórek i tkanek.</p>
          </div>
        </div>
      </div>

      <div class="analysis-section">
        <h3>ANALIZA PRÓBKI</h3>
        <p>Analiza próbki jest przeprowadzana anonimowo przez renomowane laboratorium VITAS Analytical Services w Oslo, w Norwegii, które specjalizuje się w badaniach chromatograficznych i posiada certyfikat GMP (Good Manufacturing Practices). VITAS, z ponad 25-letnim doświadczeniem, jest uznawane za lidera w dziedzinie analizy suchej kropli krwi, a jego usługi są zgodne z najwyższymi standardami jakości.</p>
        
        <div class="feature-box">
          <h4>Badane kwasy tłuszczowe:</h4>
          <ul class="ingredients-list">
            <li><span class="check-icon">✓</span> Kwasy nasycone</li>
            <li><span class="check-icon">✓</span> Kwasy jednonienasycone (omega-9)</li>
            <li><span class="check-icon">✓</span> Kwasy wielonienasycone (omega-6 i omega-3)</li>
            <li><span class="check-icon">✓</span> EPA, DPA i DHA</li>
          </ul>
        </div>
      </div>

      <div class="results-section">
        <h3>WYNIKI I RAPORT</h3>
        <p>Po około 10-20 dniach od wysłania próbki wyniki są dostępne na stronie internetowej zinzinotest.com. Użytkownik otrzymuje szczegółowy raport, który obejmuje:</p>
        <ul class="benefits-list">
          <li><span class="benefit-icon">📊</span> Równowagę kwasów tłuszczowych omega-6:3</li>
          <li><span class="benefit-icon">🔍</span> Poziom omega-3 w organizmie</li>
          <li><span class="benefit-icon">🛡️</span> Profil ochrony kwasów tłuszczowych</li>
          <li><span class="benefit-icon">🧠</span> Indeks omega-3 i siłę mentalną</li>
          <li><span class="benefit-icon">💪</span> Płynność błon komórkowych</li>
        </ul>
      </div>

      <div class="security-section">
        <h3>BEZPIECZEŃSTWO I ANONIMOWOŚĆ</h3>
        <div class="security-features">
          <div class="feature-item">
            <h4>Anonimowość</h4>
            <p>Próbka jest analizowana anonimowo, a wyniki są dostępne tylko dla użytkownika po wprowadzeniu unikalnego kodu testowego.</p>
          </div>
          <div class="feature-item">
            <h4>Zaufane źródło</h4>
            <p>VITAS Analytical Services współpracuje z międzynarodowymi instytucjami, takimi jak Światowa Organizacja Zdrowia (WHO).</p>
          </div>
        </div>
      </div>

      <div class="conclusion-section">
        <h3>PIERWSZY KROK DO ZDROWIA</h3>
        <p>BalanceTest to nie tylko narzędzie diagnostyczne, ale także pierwszy krok w kierunku świadomego budowania zdrowego stylu życia. Dzięki szczegółowym wynikom i wskazówkom użytkownicy mogą lepiej zrozumieć swoje potrzeby żywieniowe, a w razie potrzeby wprowadzić zmiany, takie jak zwiększenie spożycia omega-3 lub ograniczenie nadmiaru omega-6, co przyczynia się do poprawy ogólnego stanu zdrowia i samopoczucia.</p>
      </div>
    </div>`
  },
  {
    id: 10,
    name: 'Protect +',
    price: '175.00',
    image: '/img/products/10.jpg',
    category: categories.find(category => category.slug === 'suplementy-na-odpornosc').slug,
    description: `<div class="product-description">
      <h2 class="product-title">PROTECT+</h2>
      
      <div class="intro-section">
        <p>Protect+ to innowacyjny suplement diety, który łączy w sobie naturalne składniki wspierające układ odpornościowy. Produkt zawiera 1-3, 1-6 beta-glukany pochodzące z drożdży piekarskich, witaminę C z owoców aceroli oraz wegańską witaminę D3 z porostów. Protect+ wspomaga naturalne mechanizmy obronne organizmu i chroni komórki przed stresem oksydacyjnym.</p>
      </div>

      <div class="main-features">
        <h3 class="benefits-heading">NAJWAŻNIEJSZE KORZYŚCI</h3>
        <div class="benefits-container">
          <div class="benefit-card">
            <span class="benefit-icon">🛡️</span>
            <h4>Wspomaga układ odpornościowy</h4>
            <p>Zawiera 1-3, 1-6 beta-glukany z drożdży piekarskich</p>
          </div>

          <div class="benefit-card">
            <span class="benefit-icon">🌿</span>
            <h4>Ochrona przed stresem oksydacyjnym</h4>
            <p>Witamina C z owoców aceroli chroni komórki</p>
          </div>

          <div class="benefit-card">
            <span class="benefit-icon">☀️</span>
            <h4>Wegańska witamina D3</h4>
            <p>Pochodzi z ekologicznie uprawianych porostów</p>
          </div>
        </div>
      </div>

      <div class="additional-benefits">
        <ul class="features-list">
          <li><span class="benefit-icon">⚡</span> <strong>Wspomaga naturalną odporność</strong> poprzez aktywację komórek odpornościowych</li>
          <li><span class="benefit-icon">🛡️</span> <strong>Chroni komórki</strong> przed uszkodzeniem oksydacyjnym</li>
          <li><span class="benefit-icon">🌱</span> <strong>100% wegańskie</strong> składniki pochodzenia naturalnego</li>
          <li><span class="benefit-icon">🔬</span> <strong>Naukowo potwierdzone</strong> działanie składników</li>
          <li><span class="benefit-icon">🌿</span> <strong>Bez GMO</strong> - wszystkie składniki są naturalnego pochodzenia</li>
          <li><span class="benefit-icon">💪</span> <strong>Wspiera ogólne zdrowie</strong> i dobre samopoczucie</li>
        </ul>
      </div>

      <div class="evidence-section">
        <h3>DWA TYPY ODPORNOŚCI</h3>
        <p>Człowiek posiada dwa typy odporności: nieswoistą i swoistą. Przeważnie to odporność nieswoista chroni nas przed infekcjami. Składa się ze wyspecjalizowanych komórek i enzymów, które pozostają w gotowości do walki z drobnoustrojami w miejscu infekcji, gdy tylko pojawi się zagrożenie. Odporność swoista zapamiętuje określone patogeny, dzięki czemu zapewnia długotrwałą obronę i ochronę przed nawracającymi infekcjami.</p>
        <div class="feature-box">
          <p><strong>Witamina D jest niezbędna do aktywacji naszej odpowiedzi immunologicznej.</strong> Bez wystarczającego spożycia witaminy D układ odpornościowy ma mniejsze szanse, aby właściwie walczyć z infekcjami.</p>
        </div>
      </div>

      <div class="features-grid">
        <div class="feature-item">
          <h4>WITAMINA D</h4>
          <p>Najważniejszą formą witaminy D dla zdrowia jest witamina D3 (cholekalcyferol). Jest syntetyzowana w skórze, gdy otrzymuje ona wystarczającą ilość światła słonecznego, lecz występuje również w potrawach wegańskich, takich jak grzyby oraz potrawach niewegańskich, takich jak tłuste ryby, krewetki, jaja i wątroba wołowa.</p>
          <p>Na półkuli północnej ekspozycja na słońce jest ograniczona w trakcie sezonu zimowego, dlatego skóra nie wytwarza wystarczającej ilości witaminy D3. Niedobór witaminy D stanowi powszechny problem. Suplementy odgrywają kluczową rolę w zapobieganiu i leczeniu niskiego poziomu witaminy D.</p>
          <p><strong>Istnieje tylko jedno wegańskie źródło witaminy D3, a mianowicie porosty.</strong> Wegańska witamina D3 w Protect+ pochodzi z ekologicznie uprawianych porostów wolnych od GMO.</p>
        </div>

        <div class="feature-item">
          <h4>WITAMINA C</h4>
          <p>Stres oksydacyjny w naszym ciele zmienia się zarówno w różnych okresach życia, jak i z dnia na dzień. W sytuacjach, w których wzrasta stres oksydacyjny, na przykład w wyniku zanieczyszczenia powietrza, ciepła, wystawienia na słońce, podróży i intensywnych ćwiczeń, nasz organizm potrzebuje więcej przeciwutleniaczy.</p>
          <p>Przeciwutleniacze odgrywają ważną rolę jako wewnętrzne neutralizatory, które chronią nasze komórki przed uszkodzeniem oksydacyjnym (korozją). Protect+ zawiera bardzo silny przeciwutleniacz znany jako witamina C, która przyczynia się do ochrony komórek przed stresem oksydacyjnym.</p>
        </div>

        <div class="feature-item">
          <h4>1-3, 1-6 BETA-GLUKANY</h4>
          <p>Protect+ zawiera wyspecjalizowane i znormalizowane formy 1-3, 1-6 beta-glukanów pochodzących z opatentowanego szczepu drożdży piekarskich. 1-3, 1-6 beta-glukany pobudzają komórki odporności nieswoistej, umożliwiając im bardziej efektywną pracę.</p>
          <p>1-3, 1-6 beta-glukany naturalnie występują w żywności takiej jak drożdże piekarskie, grzyby shiitake i niektóre ziarna zbóż, lecz we współczesnej diecie są stosowane jedynie sporadycznie.</p>
        </div>
      </div>

      <div class="ingredients-section">
        <h3>TYLKO NATURALNE SKŁADNIKI</h3>
        <ul class="ingredients-list">
          <li><span class="check-icon">✓</span> 1-3, 1-6 beta-glukany pochodzące z drożdży piekarskich</li>
          <li><span class="check-icon">✓</span> Witamina C pochodząca z owoców aceroli</li>
          <li><span class="check-icon">✓</span> Witamina D3 pochodząca z porostów</li>
          <li><span class="check-icon">✓</span> Substancje pomocnicze z kokosa, ryżu i kukurydzy</li>
        </ul>
      </div>

      <div class="features-grid">
        <div class="feature-item">
          <h4>ZINZINO PROTECT BLEND</h4>
          <p>1-3, 1-6 beta-glukany pochodzące z Norwegii, USA i Azji, wegańska witamina D3 (cholekalcyferol) z porostów i witamina C z aceroli.</p>
        </div>

        <div class="feature-item">
          <h4>ULTRACZYSTOŚĆ</h4>
          <p>Produkt molekularnie testowany pod kątem toksyn w celu zapewnienia świeżości, bezpieczeństwa i czystości, którym można zaufać.</p>
        </div>

        <div class="feature-item">
          <h4>WEGAŃSKI</h4>
          <p>Wszystkie składniki są pochodzenia roślinnego, w tym wegańska witamina D3 z porostów.</p>
        </div>

        <div class="feature-item">
          <h4>BEZ GMO</h4>
          <p>Produkt nie zawiera składników modyfikowanych genetycznie.</p>
        </div>
      </div>

      <div class="ingredients-details">
        <h3>SKŁADNIKI:</h3>
        <p>Substancja zagęszczająca (żelowana skrobia z kukurydzy), mieszanka 1-3, 1-6 beta-glukanów z drożdży (Saccharomyces cerevisiae), otoczka kapsułki (hydroksypropylometyloceluloza), witamina C z ekstraktu z aceroli (Malpighia glabra), wegańska witamina D3 (cholekalcyferol), substancje przeciwzbrylające (trójglicerydy średniołańcuchowe (MCT) olej kokosowy, koncentrat z łupin ryżu).</p>
      </div>

      <div class="dosage-section">
        <h3>ZALECANA DZIENNA PORCJA:</h3>
        <p>Dorośli i dzieci powyżej 12 lat: 1 kapsułka dziennie.</p>
        <p class="warning">Nie przekraczać zalecanej porcji dziennej. Suplement diety nie może zastąpić zrównoważonej i zróżnicowanej diety.</p>
      </div>

      <div class="storage-section">
        <h3>PRZECHOWYWANIE:</h3>
        <p>W suchym miejscu w temperaturze pokojowej. Należy trzymać w miejscu niedostępnym dla dzieci.</p>
      </div>
    </div>`
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
    description: `<div class="product-description">
      <h2 class="product-title">XTEND</h2>
      <h3 class="product-subtitle">SUPLEMENT DIETY WSPOMAGAJĄCY ODPORNOŚĆ</h3>

      <div class="main-benefits">
        <div class="benefit-section">
          <h3>WIĘCEJ ENERGII</h3>
          <p>Witaminy z grupy B (B1-B12), a także wiele minerałów zawartych w Xtend, takich jak miedź, magnez, jod i mangan mają właściwości zdrowotne i są ważne w procesie normalizacji metabolizmu energetycznego.</p>
        </div>

        <div class="benefit-section">
          <h3>POPRAWA FUNKCJONOWANIA KOŚCI I STAWÓW</h3>
          <p>Xtend zawiera witaminy i minerały o potwierdzonych właściwościach zdrowotnych dla kości i mięśni. Są to witaminy D, C, K, magnez, mangan i cynk.</p>
        </div>

        <div class="benefit-section">
          <h3>WZMOCNIENIE UKŁADU ODPORNOŚCIOWEGO</h3>
          <p>Xtend zawiera 1-3, 1-6 beta-glukany. Te składniki odżywcze, pozyskiwane ze ścian komórek dobrze oczyszczonego, opatentowanego szczepu drożdży piekarskich, posiadają potwierdzone właściwości zdrowotne, które wzmacniają układ odpornościowy. Niektóre związki zawarte w preparacie (np.folian, żelazo, witamina B6, miedź) również mają kluczowe właściwości zdrowotne.</p>
        </div>
      </div>

      <div class="additional-info">
        <p>Oprócz witamin i minerałów, preparat Xtend zawiera karotenoidy, ksantofile i grupy polifenoli pozyskiwane z owoców, przypraw i warzyw. Aby uzyskać taką samą ilość składników odżywczych z żywności, trzeba byłoby spożywać ponad 3000 kalorii najbardziej odżywczych produktów każdego dnia. Wszystkie składniki preparatu Xtend mają ponad sto właściwości zdrowotnych potwierdzonych przez Europejski Urząd Bezpieczeństwa Żywności (EFSA). Mają one wpływ na komórki, organy i tkanki w organizmie. Xtend to idealne uzupełnienie produktów BalanceOil i ZinoBiotic, które zapewnia kompletny i rozszerzony program wsparcia odżywania.</p>
      </div>

      <div class="ingredients-section">
        <h3>SKŁADNIKI:</h3>
        <p>Substancje wypełniające (celuloza mikrokrystaliczna, beta-cyklodekstryna, fosforan triwapniowy), wyciąg z liści drzewa oliwnego (Olea europaea)*, magnez (wodorotlenek magnezu)*, wyciąg z alg brunatnych (Ascophyllum nodosum)*, mieszanina 1-3, 1-6 betaglukanów z drożdży (Saccharomyces cerevisiae)*, wyciąg z kurkumy dlugiej (Curcuma longa)*, witamina C (kwas askorbinowy)*, substancje przeciwzbrylające (dwutlenek krzemu, fosforan triwapniowy, sole magnezowe kwasów tłuszczowych, poliwinylopirolidon), cynk (chelat bisglicynianu cynku), wyciąg z brokułów (Brassica oleracea), witamina E (mieszanina tokoferoli i tokotrienoli), wyciąg z liści zielonej herbaty (Camellia sinensis), wyciąg z pomidorów (Solanum lycopersicum), luteina i zeaksantyna z wyciągu z kwiatów aksamitki wzniesionej (Tagetes erecta), witamina K2 (menachinon jako MK-7), żelazo (chelat bisglicynianu żelaza), witamina B3 (niacynamid), selen (metionina selenu), koenzym Q10 (ubidekarenon), molibden (molibdenian sodu), mangan (chelat bisglicynian manganu), wyciąg z mikroalg (Dunaliella salina), witamina D3 (cholekalcyferol), miedź (bisglicynian miedzi), witamina B5 (kwas pantotenowy), witamina B12 (cyjanokobalamina), chrom (chlorek chromu), witamina B6 (chlorowodorek pirydoksyny), witamina B1 (chlorowodorek tiaminy), witamina B2 (ryboflawina), witamina K1 (filochinon), folian ((6S)- 5-metylotetrahydrofoliowy jako Quatrefolic), biotyna. Pochodzenie: UE i spoza UE.</p>
      </div>

      <div class="dosage-section">
        <h3>ZALECANA DZIENNA DAWKA:</h3>
        <p>Dorośli i dzieci w wieku powyżej 12 lat: Spożywać z jedzeniem. 2–4 tabletki dziennie. Nie przekraczać zalecanej dawki dziennej. Suplement diety nie może zastąpić zrównoważonej i zbilansowanej diety.</p>
      </div>

      <div class="warning-section">
        <h3>UWAGA:</h3>
        <p>W przypadku przyjmowania leków przeciwzakrzepowych i chęci przyjmowania suplementów zawierających witaminę K należy najpierw skonsultować się z lekarzem.</p>
      </div>

      <div class="storage-section">
        <h3>PRZECHOWYWANIE:</h3>
        <p>W suchym miejscu w temperaturze pokojowej. Należy trzymać w miejscu niedostępnym dla dzieci.</p>
      </div>

      <div class="blends-section">
        <div class="blend">
          <h3>ZINZINO IMMUNE BLEND:</h3>
          <p>1-3, 1-6 beta glukany, wyciąg z brokułów, cynk, miedź, folian, selen, beta karoten, witamina B12, witamina B6, witamina C, witamina D3.</p>
        </div>

        <div class="blend">
          <h3>ZINZINO DEFENCE BLEND:</h3>
          <p>Likopen, luteina, zeaksantyna, polifenole z zielonej herbaty, polifenole z oliwek, wyciąg z brokułów, wyciąg z kurkuminy.</p>
        </div>
      </div>
    </div>`
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
    price: '65.00',
    image: '/img/products/16.png',
    category: categories.find(category => category.slug === 'suplementy-przywracajace-zdrowie').slug,
    description: `<div class="product-description">
      <div class="intro-section">
        <h2>Opis</h2>
        <p>ZinoShine+ to unikalny suplement diety z witaminą D3 i magnezem o szerokim spektrum działania. 
        Opatentowana mieszanka została opracowana, aby wspierać układ odpornościowy, zmniejszać uczucie 
        zmęczenia i znużenia oraz wspomagać mięśnie, kości i zęby.</p>
        
        <div class="product-info">
          <p><strong>Zawartość:</strong> 23 gramów, 60 tabletek</p>
        </div>
      </div>

      <div class="benefits-grid">
        <div class="benefit-card">
          <h3>WSPARCIE UKŁADU ODPORNOŚCIOWEGO</h3>
          <p>ZinoShine+ wspiera układ odpornościowy, a jego składniki odgrywają ważną rolę w procesie podziału komórek.</p>
        </div>

        <div class="benefit-card">
          <h3>MAGNEZ O SZEROKIM SPEKTRUM DZIAŁANIA</h3>
          <p>Nasze podejście do magnezu o szerokim spektrum działania wspiera funkcje psychologiczne i przyczynia 
          się do zmniejszenia zmęczenia i znużenia.</p>
        </div>

        <div class="benefit-card">
          <h3>FUNKCJONOWANIE ORGANIZMU</h3>
          <p>Witamina D i magnez wspomagają prawidłową funkcję mięśni, kości i zębów.</p>
        </div>
      </div>

      <div class="features-section">
        <div class="feature-item">
          <h3>W PEŁNI NATURALNY</h3>
          <p>Składniki ZinoShine+ są pozyskiwane z naturalnych źródeł. Są one prawdziwą siłą natury z mocą, która pozwala im 
          świecić własnym światłem w naszej unikalnej, norweskiej, całkowicie naturalnej recepturze.</p>
        </div>

        <div class="feature-item">
          <h3>WEGAŃSKI</h3>
          <p>Synergiczna mieszanka naturalnych i czysto wegańskich składników.</p>
        </div>
      </div>

      <div class="usage-section">
        <h3>ZALECANA DZIENNA DAWKA:</h3>
        <ul>
          <li>Dzieci w wieku <11 lat: 1 tabletka dziennie</li>
          <li>Młodzież w wieku 12–18 lat: 1–3 tabletki dziennie</li>
          <li>Dorośli w wieku >18 lat: 1–4 tabletki dziennie</li>
        </ul>
        <p class="warning">Nie przekraczać zalecanej dawki dziennej. Suplement diety nie może zastąpić zrównoważonej i zbilansowanej diety.</p>
      </div>

      <div class="ingredients-section">
        <h3>SKŁADNIKI:</h3>
        <p>Mieszanka magnezu (wodorotlenek magnezu z wody morskiej, cytrynian magnezu, jabłczan magnezu, diglicynian magnezu), 
        substancja wypełniająca (beta-cyklodekstryna z manioku), środek przeciwzbrylający (kwas stearynowy, olej MCT z kokosa), 
        witamina D3 (cholekalcyferol).</p>
      </div>

      <div class="storage-section">
        <h3>PRZECHOWYWANIE:</h3>
        <p>W suchym miejscu w temperaturze pokojowej. Przechowywać w miejscu niedostępnym dla dzieci.</p>
      </div>

      <div class="detailed-info">
        <h3>WITAMINA D</h3>
        <p>Witamina D wspiera ważne funkcje w organizmie, pomagając regulować wchłanianie wapnia i fosforu, ale być może najważniejsze jest to, że wspomaga prawidłowe funkcjonowanie 
        układu odpornościowego. Co więcej, przyjmowanie wystarczającej ilości witaminy D jest ważne dla prawidłowego wzrostu i rozwoju kości i zębów.</p>
        
        <p>Podobnie jak większość czynników żywieniowych i zdrowotnych, istnieją istotne indywidualne różnice, jeśli chodzi o zaspokajanie potrzeb związanych z witaminą D. Wiele czynników społecznych 
        i behawioralnych wywiera wpływ na naszą zdolność do dostarczania wystarczającej ilości witaminy D poprzez samo światło słoneczne. Czynniki takie jak przebywanie w obszarze o wysokim 
        zanieczyszczeniu, stosowanie kremów przeciwsłonecznych, czas spędzany w pomieszczeniach, mieszkanie i praca w dużych miastach, w których budynki blokują dostęp światła słonecznego 
        odgrywają rolę w tym, jak nasz organizm reaguje na słońce i wytwarza tę niezbędną "słoneczną witaminę". Należy również uwzględnić masę ciała. Witamina D to witamina rozpuszczalna 
        w tłuszczach, a zatem im większa masa ciała, tym więcej musimy produkować i spożywać, aby osiągnąć i utrzymać odpowiedni poziom tej witaminy we krwi.</p>

        <p>Na całym świecie niedobór witaminy D występuje u około 1 miliarda osób. Dlatego ważne jest, aby monitorować poziom witaminy D i w razie potrzeby korzystać z dodatkowych źródeł 
        witaminy D, innych niż światło słoneczne.</p>

        <p>Źródłem witaminy D są porosty. Jest to mały, unikalny gatunek roślinny składający się z symbiotycznego związku glonów i grzybów. Można je znaleźć w dużych ilościach na górskich 
        zboczach, skałach i drzewach, a to naturalne źródło witaminy D3 jest świadomym wyborem dla dobra naszego środowiska.</p>

        <h3>MAGNEZ</h3>
        <p>Istnieje wiele źródeł witamin i minerałów. Dążymy do znalezienia najlepszych i najbardziej wydajnych źródeł dostępnych na rynku.</p>
        
        <p>ZinoShine+ zawiera wodorotlenek magnezu z wody morskiej, cytrynian magnezu, jabłczan magnezu i diglicynian magnezu. 
        Razem te cztery źródła zapewniają szerokie spektrum działania, zwiększające wchłanianie i wykorzystanie w organizmie.</p>
      </div>
    </div>`
  },
  {
    id: 17,
    name: 'Health Protocol',
    price: '418.00',
    image: '/img/products/HP.png',
    category: categories.find(category => category.slug === 'suplementy-na-odpornosc').slug,
    description: `<div class="product-description">
      <h2 class="product-title">HEALTH PROTOCOL – KLUCZ DO ZDROWIA I RÓWNOWAGI W CODZIENNYM ŻYCIU</h2>
      
      <div class="intro-section">
        <p>W dobie współczesnych wyzwań nasze zdrowie staje się coraz bardziej podatne na działanie negatywnych czynników, takich jak przewlekły stres, niewłaściwie zbilansowana dieta, siedzący tryb życia czy wszechobecne zanieczyszczenia środowiska. Każdego dnia docierają do nas informacje o nowych cudownych dietach, suplementach i metodach na poprawę samopoczucia, co często prowadzi do dezorientacji.</p>
        
        <p><strong>Jak w gąszczu tych propozycji odnaleźć rozwiązanie, które naprawdę działa i przynosi długotrwałe korzyści?</strong> Odpowiedzią jest Health Protocol – kompleksowe podejście oparte na solidnych podstawach naukowych, które harmonizuje naturalne składniki z najnowszymi odkryciami medycyny i dietetyki, oferując wsparcie dla organizmu w kluczowych aspektach zdrowia.</p>
      </div>

      <div class="main-features">
        <h3>Health Protocol wyróżnia się holistycznym podejściem, koncentrując się na trzech filarach dobrego samopoczucia:</h3>
        
        <div class="benefits-container">
          <div class="benefit-card">
            <span class="benefit-icon">⚖️</span>
            <h4>Równowaga kwasów tłuszczowych Omega-6 do Omega-3</h4>
            <p>Współczesna dieta często charakteryzuje się nadmiarem kwasów Omega-6 przy jednoczesnym niedoborze Omega-3. <strong>Health Protocol pomaga przywrócić optymalny stosunek tych kwasów</strong>, wspierając funkcjonowanie układu nerwowego, sercowo-naczyniowego oraz poprawiając zdolności regeneracyjne organizmu.</p>
          </div>

          <div class="benefit-card">
            <span class="benefit-icon">🦠</span>
            <h4>Zdrowie jelit</h4>
            <p>Jelita są nie tylko centrum trawienia, ale także kluczowym elementem układu odpornościowego. <strong>Health Protocol wykorzystuje naturalne składniki</strong>, takie jak probiotyki, prebiotyki i błonnik, aby wspierać mikrobiom jelitowy i poprawiać trawienie.</p>
          </div>

          <div class="benefit-card">
            <span class="benefit-icon">🛡️</span>
            <h4>Wzmocnienie układu odpornościowego</h4>
            <p><strong>Health Protocol dostarcza organizmowi niezbędnych witamin, minerałów i antyoksydantów</strong> (np. witaminy C, D, cynku czy polifenoli), które działają synergicznie, wzmacniając naturalne mechanizmy obronne.</p>
          </div>
        </div>
      </div>

      <div class="features-section">
        <h3>Co wyróżnia Health Protocol?</h3>
        <ul class="features-list">
          <li><span class="feature-icon">✅</span> <strong>Skuteczność</strong> - potwierdzona badaniami naukowymi i doświadczeniem klinicznym</li>
          <li><span class="feature-icon">✅</span> <strong>Uniwersalność</strong> - odpowiedni dla różnych grup wiekowych i stylów życia</li>
          <li><span class="feature-icon">✅</span> <strong>Prostota wdrożenia</strong> - nie wymaga drastycznych zmian ani skomplikowanych planów</li>
          <li><span class="feature-icon">✅</span> <strong>Naturalne składniki</strong> - działające w zgodzie z fizjologią organizmu</li>
          <li><span class="feature-icon">✅</span> <strong>Holistyczne podejście</strong> - uwzględniające wzajemne powiązania między różnymi układami ciała</li>
        </ul>
      </div>

      <div class="target-groups-section">
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

      <div class="conclusion-section">
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
      <h2 class="product-title">ZINZINO BALANCEOIL +</h2>
      
      <div class="intro-section">
        <p>Zinzino BalanceOil+ to synergiczne połączenie wysokiej jakości oleju z ryb, bogatego w kwasy tłuszczowe omega-3 EPA i DHA i specjalnie dobranej oliwy z pierwszego tłoczenia o wysokiej zawartości polifenoli. BalanceOil+ bezpiecznie dostosowuje i utrzymuje prawidłowy poziom EPA + DHA i kwasów tłuszczowych omega-6:3 w organizmie. BalanceOil+ wspomaga optymalną pracę mózgu i prawidłową pracę serca i wzmacnia układ odpornościowy.</p>
      </div>

      <div class="main-features">
        <h3 class="benefits-heading">NAJWAŻNIEJSZE KORZYŚCI</h3>
        <div class="benefits-container">
          <div class="benefit-card">
            <span class="benefit-icon">🧠</span>
            <h4>Wspomaga prawidłowe funkcjonowanie mózgu</h4>
            <p>Dzienna dawka zawiera 700 mg kwasu dokozaheksaenowego</p>
          </div>

          <div class="benefit-card">
            <span class="benefit-icon">❤️</span>
            <h4>Prawidłowe funkcjonowanie serca</h4>
            <p>Dzienna dawka zawiera 1300 mg kwasu eikozapentaenowego oraz 700 mg kwasu dokozaheksaenowego</p>
          </div>

          <div class="benefit-card">
            <span class="benefit-icon">🛡️</span>
            <h4>Wspomaga prawidłowe funkcjonowanie układu odpornościowego</h4>
            <p>Dzienna dawka zawiera 20 µg witaminy D3</p>
          </div>
        </div>
      </div>

      <div class="additional-benefits">
        <ul class="features-list">
          <li><span class="benefit-icon">⚖️</span> <strong>Suplement diety pomaga utrzymać odpowiedni poziom kwasów omega-3 DHA i EPA</strong></li>
          <li><span class="benefit-icon">📊</span> <strong>Jest ważny</strong>, ponieważ utrzymuje optymalny poziom kwasów Omega-6:3 w Twoim organizmie</li>
          <li><span class="benefit-icon">🌿</span> <strong>Pomaga utrzymać polifenole</strong> w Twoim ciele na poziomie, który ochroni lipidy krwi przed stresem oksydacyjnym</li>
          <li><span class="benefit-icon">👁️</span> <strong>Bez wątpienia dba o zdrowie oczu</strong> i wspiera ich prawidłowe funkcjonowanie</li>
          <li><span class="benefit-icon">🦴</span> <strong>Wspomaga prawidłową budowę kości</strong>, prawidłowe funkcjonowanie mięśni, prawidłową budowę zębów oraz podział komórek</li>
          <li><span class="benefit-icon">💉</span> <strong>Pomaga utrzymać zawartość trójglicerydów we krwi</strong> oraz jej ciśnienie, a także ilość wapnia na prawidłowym poziomie</li>
        </ul>
      </div>

      <div class="evidence-section">
        <h3>SYNERGIA OLEJU Z RYB I OLIWY Z OLIWEK</h3>
        <p>Naukowcy opracowali BalanceOil+ tak, by łączył kwasy Omega-3 z odpowiednią zawartością oliwy z oliwek, która dostarcza kwasów Omega-9 oraz antyoksydantów w bardzo dużych ilościach. To synergiczne połączenie sprawia, że można w bezpieczny sposób dostosować i utrzymać kwasy Omega-3 w Twoim ciele na takim poziomie, aby uzyskać balans Omega-6:3 wynoszący mniej niż 3:1.</p>
      </div>

      <div class="evidence-section">
        <h3>DOWÓD NA OSIĄGNIĘCIE RÓWNOWAGI W 120 DNI</h3>
        <p>Certyfikowane laboratoria odpowiedzialne są za analizowanie testów suchej kropli krwi na zawartość jedenastu kwasów tłuszczowych, co czyni bazę danych Zinzino największą tego typu na świecie. Przeciętny stosunek kwasów Omega-6:3 u ludzi, którzy nie przyjmują żadnych suplementów diety zawierających kwasy Omega-3 wynosi 12:1 dla Europy Północnej, 15:1 dla Europy oraz 25:1 dla Stanów Zjednoczonych. Po przyjmowaniu BalanceOil+ przez 120 dni średni stosunek dla większości ludzi wynosi mniej niż 3:1.</p>
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
        
        <div class="ingredient-section">
          <h4>NATURALNE</h4>
          <p>Suplement diety BalanceOil produkowany jest wyłącznie ze składników naturalnego pochodzenia.</p>
        </div>

        <div class="ingredient-section">
          <h4>BEZ GMO</h4>
          <p>Produkty nie zawierają składników modyfikowanych genetycznie (bez GMO).</p>
        </div>

        <div class="ingredient-section">
          <h4>OLEJE RYBNE</h4>
          <p>Oleje rybne wykorzystane w produktach BalanceOil mają bardzo ściśle określone wymogi dla kwasów eikozapentaenowego i dokozaheksaenowego, które w ciągu 120 dni skutecznie optymalizują stosunek kwasów tłuszczowych Omega-6:3 w ludzkim ciele. Oleje rybne, których używamy, wytwarzane są głównie z krótko żyjących niewielkich ryb pelagicznych, takich jak sardynki i sardele.</p>
          <p>Kwasy omega-3 z oleju rybnego uzyskiwane są z całych, nieprzetworzonych ryb. Olej przechodzi proces rafinowania w celu usunięcia zanieczyszczeń środowiskowych (jeśli takowe występują) i uzyskuje certyfikat potwierdzający brak obecności metali ciężkich oraz innych toksyn. Przede wszystkim LYSI, producent BalanceOil, spełnia wszelkie wymogi prawne dla produkcji oraz stosuje DPP (Dobre praktyki produkcyjne) dla produktów żywnościowych i farmaceutycznych.</p>
        </div>

        <div class="ingredient-section">
          <h4>OLIWA Z OLIWEK Z PIERWSZEGO TŁOCZENIA</h4>
          <p>Suplement diety z Hiszpańskich oliwek odmiany Picual wybierane są ponieważ mają wysoką zawartość kwasów Omega-9 oraz antyoksydantów. Z niedojrzałych jeszcze oliwek w trakcie procesu produkcyjnego usuwa się pestki i na zimno tłoczy same owoce, co w rezultacie daje oliwę extra virgin, bogatą w kwasy Omega-9 (kwas oleinowy) i antyoksydanty zwane polifenolami (powyżej 750 mg/kg).</p>
        </div>

        <div class="ingredient-section">
          <h4>Witamina D3</h4>
          <p>BalanceOil zawiera kwasy omega-3 witaminę D3 (cholekalcyferol). Używamy naturalnej witaminy D3 (cholekalcyferol) uzyskiwanej z lanoliny. Lanolina jest naturalnie występującym tłuszczem otrzymywanym w rezultacie z wełny owczej. Witamina D3 jest uzyskiwana poprzez rozpuszczenie prekursora witaminy D3 z lanoliny. Jest on następnie chemicznie zmieniany i aktywowany przez wystawienie na promieniowanie ultrafioletowe (UV). Bez wątpienia ten proces chemiczny porównywalny jest do procesu, który zachodzi w ludzkiej skórze podczas produkcji witaminy D3.</p>
        </div>

        <div class="ingredient-section">
          <h4>NATURALNE TOKOFEROLE</h4>
          <p>Mieszanka tokoferoli to z pewnością powszechnie stosowany w suplementach diety antyoksydant. Dlatego wykorzystywane przy produkcji naturalne tokoferole uzyskiwane są z pewnością z wolnych od GMO, wysoko rafinowanych destylatów oleju sojowego, które przechodzą dalszy proces rafinacji i tym samym nie zawierają żadnych białek sojowych. Przede wszystkim oznacza to, że pozbawione są alergenów. Typowy skład jest następujący: alfa-, beta-, gamma- i delta-tokoferole.</p>
        </div>
      </div>

      <div class="dosage-section">
        <h3>SUGEROWANE DAWKOWANIE:</h3>
        <p>0,15 ml na kilogram masy ciała. Dlatego porcję należy dostosować w oparciu o masę ciała.</p>
        <ul>
          <li>Dorośli o masie ciała wynoszącej 50 kg: 7,5 ml dziennie</li>
          <li>Dorośli o masie ciała wynoszącej 80 kg: 12 ml dziennie</li>
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