import React from 'react';
import { Link } from 'react-router-dom';
import './LinkSection.css';

const LinkSection = () => {
  const categoryLinks = {
    'Suplementy diety': [
      { name: 'Suplementy dla sportowców', path: '/category/suplementy-dla-sportowcow' },
      { name: 'Suplementy na pamięć i koncentrację', path: '/category/suplementy-na-pamiec' },
      { name: 'Suplementy na energię', path: '/category/suplementy-na-energie' },
      { name: 'Suplementy na zmęczenie', path: '/category/suplementy-na-zmeczenie' },
      { name: 'Suplementy na depresję', path: '/category/suplementy-na-depresje' }
    ],
    'Suplementy diety 2': [
      { name: 'Suplementy wegetariańskie', path: '/category/suplementy-wegetarianskie' },
      { name: 'Suplementy wegańskie', path: '/category/suplementy-weganskie' },
      { name: 'Suplementy na układ nerwowy', path: '/category/suplementy-uklad-nerwowy' },
      { name: 'Suplementy na serce', path: '/category/suplementy-na-serce' },
      { name: 'Suplementy na odporność', path: '/category/suplementy-na-odpornosc' }
    ],
    'Witaminy': [
      { name: 'Witaminy dla kobiet', path: '/category/witaminy-dla-kobiet' },
      { name: 'Witaminy dla mężczyzn', path: '/category/witaminy-dla-mezczyzn' },
      { name: 'Witaminy D3', path: '/category/witaminy-d3' },
      { name: 'Oleje i kwasy tłuszczowe', path: '/category/oleje-i-kwasy' },
      { name: 'Kwasy omega', path: '/category/kwasy-omega' }
    ]
  };

  return (
    <div className="link-section">
      <h2 className="link-section-title">Zobacz więcej:</h2>
      <div className="link-categories">
        {Object.entries(categoryLinks).map(([category, links]) => (
          <div key={category} className="link-category">
            <h3 className="category-title">{category}</h3>
            <ul className="link-list">
              {links.map((link, index) => (
                <li key={index}>
                  <Link to={link.path}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LinkSection;