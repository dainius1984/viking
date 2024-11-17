const products = [
  // Suplementy dla sportowców
  {
    id: 1,
    name: 'BalanceOil+ Sport Premium',
    price: '269.00',
    image: '/img/products/1.webp',
    category: 'suplementy-dla-sportowcow',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  },
  {
    id: 2,
    name: 'Magnez + B6 Sport',
    price: '89.00',
    image: '/img/products/2.webp',
    category: 'suplementy-dla-sportowcow',
    description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  },

  // Suplementy na pamięć
  {
    id: 3,
    name: 'OmegaMind Plus',
    price: '159.00',
    image: '/img/products/3.webp',
    category: 'suplementy-na-pamiec',
    description: 'Suspendisse potenti. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.'
  },
  {
    id: 4,
    name: 'Ginkgo Biloba Extra',
    price: '75.00',
    image: '/img/products/4.webp',
    category: 'suplementy-na-pamiec',
    description: 'Suspendisse potenti. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.'
  },

  // Suplementy na energię
  {
    id: 5,
    name: 'Power Boost Complex',
    price: '129.00',
    image: '/img/products/1.webp',
    category: 'suplementy-na-energie',
    description: 'Suspendisse potenti. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.'
  },
  {
    id: 6,
    name: 'Koenzym Q10 Forte',
    price: '95.00',
    image: '/img/products/2.webp',
    category: 'suplementy-na-energie',
    description: 'Suspendisse potenti. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.'
  },

  // Suplementy na zmęczenie
  {
    id: 7,
    name: 'Żelazo + Witamina C',
    price: '85.00',
    image: '/img/products/3.webp',
    category: 'suplementy-na-zmeczenie',
    description: 'Suspendisse potenti. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.'
  },
  {
    id: 8,
    name: 'B-Complex Premium',
    price: '79.00',
    image: '/img/products/4.webp',
    category: 'suplementy-na-zmeczenie',
    description: 'Suspendisse potenti. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.'
  },

  // Suplementy na depresję
  {
    id: 9,
    name: 'D3 + K2 MAX',
    price: '119.00',
    image: '/img/products/1.webp',
    category: 'suplementy-na-depresje',
    description: 'Suspendisse potenti. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.'
  },
  {
    id: 10,
    name: 'Omega-3 DHA Premium',
    price: '149.00',
    image: '/img/products/2.webp',
    category: 'suplementy-na-depresje',
    description: 'Suspendisse potenti. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.'
  },

  // Witaminy dla kobiet
  {
    id: 11,
    name: 'MultiVitamin Woman',
    price: '89.00',
    image: '/img/products/3.webp',
    category: 'witaminy-dla-kobiet',
    description: 'Suspendisse potenti. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.'
  },
  {
    id: 12,
    name: 'Żelazo + Kwas Foliowy',
    price: '75.00',
    image: '/img/products/4.webp',
    category: 'witaminy-dla-kobiet',
    description: 'Suspendisse potenti. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.'
  },

  // Witaminy dla mężczyzn
  {
    id: 13,
    name: 'MultiVitamin Man',
    price: '89.00',
    image: '/img/products/1.webp',
    category: 'witaminy-dla-mezczyzn',
    description: 'Suspendisse potenti. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.'
  },
  {
    id: 14,
    name: 'Cynk + Selen Premium',
    price: '79.00',
    image: '/img/products/2.webp',
    category: 'witaminy-dla-mezczyzn',
    description: 'Suspendisse potenti. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.'
  },

  // Witaminy D3
  {
    id: 15,
    name: 'Witamina D3 4000 IU',
    price: '49.00',
    image: '/img/products/3.webp',
    category: 'witaminy-d3',
    description: 'Suspendisse potenti. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.'
  },
  {
    id: 16,
    name: 'D3 + K2 MK7',
    price: '89.00',
    image: '/img/products/4.webp',
    category: 'witaminy-d3',
    description: 'Suspendisse potenti. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.'
  },

  // Witaminy B12
  {
    id: 17,
    name: 'B12 Metylokobalamina',
    price: '69.00',
    image: '/img/products/1.webp',
    category: 'witaminy-b12',
    description: 'Suspendisse potenti. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.'
  },
  {
    id: 18,
    name: 'B12 Active Complex',
    price: '89.00',
    image: '/img/products/2.webp',
    category: 'witaminy-b12',
    description: 'Suspendisse potenti. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.'
  },

  // Multiwitaminy
  {
    id: 19,
    name: 'Complete Multi Plus',
    price: '129.00',
    image: '/img/products/3.webp',
    category: 'multiwitaminy',
    description: 'Suspendisse potenti. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.'
  },
  {
    id: 20,
    name: 'Daily Multi Complex',
    price: '99.00',
    image: '/img/products/4.webp',
    category: 'multiwitaminy',
    description: 'Suspendisse potenti. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.'
  },

  // Olej lniany
  {
    id: 21,
    name: 'Bio Olej Lniany Premium',
    price: '39.00',
    image: '/img/products/1.webp',
    category: 'olej-lniany',
    description: 'Suspendisse potenti. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.'
  },
  {
    id: 22,
    name: 'Olej Lniany Gold',
    price: '45.00',
    image: '/img/products/2.webp',
    category: 'olej-lniany',
    description: 'Suspendisse potenti. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.'
  },

  // Olej konopny
  {
    id: 23,
    name: 'Bio Olej Konopny',
    price: '59.00',
    image: '/img/products/3.webp',
    category: 'olej-konopny',
    description: 'Suspendisse potenti. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.'
  },
  {
    id: 24,
    name: 'Konopny Cold Pressed',
    price: '69.00',
    image: '/img/products/4.webp',
    category: 'olej-konopny',
    description: 'Suspendisse potenti. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.'
  },

  // Olej z czarnuszki
  {
    id: 25,
    name: 'Czarnuszka Premium',
    price: '49.00',
    image: '/img/products/1.webp',
    category: 'olej-z-czarnuszki',
    description: 'Suspendisse potenti. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.'
  },
  {
    id: 26,
    name: 'Bio Czarnuszka Plus',
    price: '55.00',
    image: '/img/products/2.webp',
    category: 'olej-z-czarnuszki',
    description: 'Suspendisse potenti. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.'
  },

  // Olej kokosowy
  {
    id: 27,
    name: 'Kokos Virgin Oil',
    price: '39.00',
    image: '/img/products/3.webp',
    category: 'olej-kokosowy',
    description: 'Suspendisse potenti. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.'
  },
  {
    id: 28,
    name: 'Bio Kokos Extra Virgin',
    price: '45.00',
    image: '/img/products/4.webp',
    category: 'olej-kokosowy',
    description: 'Suspendisse potenti. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.'
  },

  // MCT
  {
    id: 29,
    name: 'MCT Oil Pure',
    price: '79.00',
    image: '/img/products/1.webp',
    category: 'mct',
    description: 'Suspendisse potenti. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.'
  },
  {
    id: 30,
    name: 'MCT C8 Premium',
    price: '89.00',
    image: '/img/products/2.webp',
    category: 'mct',
    description: 'Suspendisse potenti. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.'
  },

  // Omega 3
  {
    id: 31,
    name: 'Omega 3 Algi DHA',
    price: '119.00',
    image: '/img/products/3.webp',
    category: 'omega-3',
    description: 'Suspendisse potenti. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.'
  },
  {
    id: 32,
    name: 'Omega 3 Premium Plus',
    price: '129.00',
    image: '/img/products/4.webp',
    category: 'omega-3',
    description: 'Suspendisse potenti. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.'
  },

  // Omega 6
  {
    id: 33,
    name: 'Omega 6 Complex',
    price: '89.00',
    image: '/img/products/1.webp',
    category: 'omega-6',
    description: 'Suspendisse potenti. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.'
  },
  {
    id: 34,
    name: 'Omega 6 GLA',
    price: '99.00',
    image: '/img/products/2.webp',
    category: 'omega-6',
    description: 'Suspendisse potenti. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.'
  },

  // Omega 9
  {
    id: 35,
    name: 'Omega 9 Pure',
    price: '79.00',
    image: '/img/products/3.webp',
    category: 'omega-9',
    description: 'Suspendisse potenti. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.'
  },
  {
    id: 36,
    name: 'Omega 9 Extra',
    price: '89.00',
    image: '/img/products/4.webp',
    category: 'omega-9',
    description: 'Suspendisse potenti. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.'
  },

  // DHA
  {
    id: 37,
    name: 'DHA Vegan Formula',
    price: '149.00',
    image: '/img/products/1.webp',
    category: 'dha',
    description: 'Suspendisse potenti. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.'
  },
  {
    id: 38,
    name: 'DHA Brain Plus',
    price: '159.00',
    image: '/img/products/2.webp',
    category: 'dha',
    description: 'Suspendisse potenti. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.'
  },

  // EPA
  {
    id: 39,
    name: 'EPA Pure',
    price: '139.00',
    image: '/img/products/3.webp',
    category: 'epa',
    description: 'Suspendisse potenti. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.'
  },
  {
    id: 40,
    name: 'EPA Ultra',
    price: '149.00',
    image: '/img/products/4.webp',
    category: 'epa',
    description: 'Suspendisse potenti. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.'
  }
];

export default products;
