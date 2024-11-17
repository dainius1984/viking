const products = [
  // Suplementy dla sportowców
  {
    id: 1,
    name: 'BalanceOil+ Sport Premium',
    price: '269.00',
    image: '/img/products/1.webp',
    category: 'suplementy-dla-sportowcow'
  },
  {
    id: 2,
    name: 'Magnez + B6 Sport',
    price: '89.00',
    image: '/img/products/2.webp',
    category: 'suplementy-dla-sportowcow'
  },

  // Suplementy na pamięć
  {
    id: 3,
    name: 'OmegaMind Plus',
    price: '159.00',
    image: '/img/products/3.webp',
    category: 'suplementy-na-pamiec'
  },
  {
    id: 4,
    name: 'Ginkgo Biloba Extra',
    price: '75.00',
    image: '/img/products/4.webp',
    category: 'suplementy-na-pamiec'
  },

  // Suplementy na energię
  {
    id: 5,
    name: 'Power Boost Complex',
    price: '129.00',
    image: '/img/products/1.webp',
    category: 'suplementy-na-energie'
  },
  {
    id: 6,
    name: 'Koenzym Q10 Forte',
    price: '95.00',
    image: '/img/products/2.webp',
    category: 'suplementy-na-energie'
  },

  // Suplementy na zmęczenie
  {
    id: 7,
    name: 'Żelazo + Witamina C',
    price: '85.00',
    image: '/img/products/3.webp',
    category: 'suplementy-na-zmeczenie'
  },
  {
    id: 8,
    name: 'B-Complex Premium',
    price: '79.00',
    image: '/img/products/4.webp',
    category: 'suplementy-na-zmeczenie'
  },

  // Suplementy na depresję
  {
    id: 9,
    name: 'D3 + K2 MAX',
    price: '119.00',
    image: '/img/products/1.webp',
    category: 'suplementy-na-depresje'
  },
  {
    id: 10,
    name: 'Omega-3 DHA Premium',
    price: '149.00',
    image: '/img/products/2.webp',
    category: 'suplementy-na-depresje'
  },

  // Witaminy dla kobiet
  {
    id: 11,
    name: 'MultiVitamin Woman',
    price: '89.00',
    image: '/img/products/3.webp',
    category: 'witaminy-dla-kobiet'
  },
  {
    id: 12,
    name: 'Żelazo + Kwas Foliowy',
    price: '75.00',
    image: '/img/products/4.webp',
    category: 'witaminy-dla-kobiet'
  },

  // Witaminy dla mężczyzn
  {
    id: 13,
    name: 'MultiVitamin Man',
    price: '89.00',
    image: '/img/products/1.webp',
    category: 'witaminy-dla-mezczyzn'
  },
  {
    id: 14,
    name: 'Cynk + Selen Premium',
    price: '79.00',
    image: '/img/products/2.webp',
    category: 'witaminy-dla-mezczyzn'
  },

  // Witaminy D3
  {
    id: 15,
    name: 'Witamina D3 4000 IU',
    price: '49.00',
    image: '/img/products/3.webp',
    category: 'witaminy-d3'
  },
  {
    id: 16,
    name: 'D3 + K2 MK7',
    price: '89.00',
    image: '/img/products/4.webp',
    category: 'witaminy-d3'
  },

  // Witaminy B12
  {
    id: 17,
    name: 'B12 Metylokobalamina',
    price: '69.00',
    image: '/img/products/1.webp',
    category: 'witaminy-b12'
  },
  {
    id: 18,
    name: 'B12 Active Complex',
    price: '89.00',
    image: '/img/products/2.webp',
    category: 'witaminy-b12'
  },

  // Multiwitaminy
  {
    id: 19,
    name: 'Complete Multi Plus',
    price: '129.00',
    image: '/img/products/3.webp',
    category: 'multiwitaminy'
  },
  {
    id: 20,
    name: 'Daily Multi Complex',
    price: '99.00',
    image: '/img/products/4.webp',
    category: 'multiwitaminy'
  },

  // Olej lniany
  {
    id: 21,
    name: 'Bio Olej Lniany Premium',
    price: '39.00',
    image: '/img/products/1.webp',
    category: 'olej-lniany'
  },
  {
    id: 22,
    name: 'Olej Lniany Gold',
    price: '45.00',
    image: '/img/products/2.webp',
    category: 'olej-lniany'
  },

  // Olej konopny
  {
    id: 23,
    name: 'Bio Olej Konopny',
    price: '59.00',
    image: '/img/products/3.webp',
    category: 'olej-konopny'
  },
  {
    id: 24,
    name: 'Konopny Cold Pressed',
    price: '69.00',
    image: '/img/products/4.webp',
    category: 'olej-konopny'
  },

  // Olej z czarnuszki
  {
    id: 25,
    name: 'Czarnuszka Premium',
    price: '49.00',
    image: '/img/products/1.webp',
    category: 'olej-z-czarnuszki'
  },
  {
    id: 26,
    name: 'Bio Czarnuszka Plus',
    price: '55.00',
    image: '/img/products/2.webp',
    category: 'olej-z-czarnuszki'
  },

  // Olej kokosowy
  {
    id: 27,
    name: 'Kokos Virgin Oil',
    price: '39.00',
    image: '/img/products/3.webp',
    category: 'olej-kokosowy'
  },
  {
    id: 28,
    name: 'Bio Kokos Extra Virgin',
    price: '45.00',
    image: '/img/products/4.webp',
    category: 'olej-kokosowy'
  },

  // MCT
  {
    id: 29,
    name: 'MCT Oil Pure',
    price: '79.00',
    image: '/img/products/1.webp',
    category: 'mct'
  },
  {
    id: 30,
    name: 'MCT C8 Premium',
    price: '89.00',
    image: '/img/products/2.webp',
    category: 'mct'
  },

  // Omega 3
  {
    id: 31,
    name: 'Omega 3 Algi DHA',
    price: '119.00',
    image: '/img/products/3.webp',
    category: 'omega-3'
  },
  {
    id: 32,
    name: 'Omega 3 Premium Plus',
    price: '129.00',
    image: '/img/products/4.webp',
    category: 'omega-3'
  },

  // Omega 6
  {
    id: 33,
    name: 'Omega 6 Complex',
    price: '89.00',
    image: '/img/products/1.webp',
    category: 'omega-6'
  },
  {
    id: 34,
    name: 'Omega 6 GLA',
    price: '99.00',
    image: '/img/products/2.webp',
    category: 'omega-6'
  },

  // Omega 9
  {
    id: 35,
    name: 'Omega 9 Pure',
    price: '79.00',
    image: '/img/products/3.webp',
    category: 'omega-9'
  },
  {
    id: 36,
    name: 'Omega 9 Extra',
    price: '89.00',
    image: '/img/products/4.webp',
    category: 'omega-9'
  },

  // DHA
  {
    id: 37,
    name: 'DHA Vegan Formula',
    price: '149.00',
    image: '/img/products/1.webp',
    category: 'dha'
  },
  {
    id: 38,
    name: 'DHA Brain Plus',
    price: '159.00',
    image: '/img/products/2.webp',
    category: 'dha'
  },

  // EPA
  {
    id: 39,
    name: 'EPA Pure',
    price: '139.00',
    image: '/img/products/3.webp',
    category: 'epa'
  },
  {
    id: 40,
    name: 'EPA Ultra',
    price: '149.00',
    image: '/img/products/4.webp',
    category: 'epa'
  }
];

export default products;
