import React from 'react';
import { Link } from 'react-router-dom';
import './LinkSection.css';
import products from '../../Data/products-data';
import ProductModal from '../Pages/ProductModal';

const LinkSection = () => {
  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const [showModal, setShowModal] = React.useState(false);

  const openProductModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const categoryLinks = {
'Suplementy omega 3': [
      { name: 'BalanceOil+300ml Cytrynowy', path: '/category/omega-3-supplements' },
      { name: 'BalanceOil+300ml Grejpfrut, Cytryna i Limonka', path: '/category/omega-3-supplements' },
      { name: 'BalanceOil+300ml Pomarańcza, Cytryna i Mięta', path: '/category/omega-3-supplements' },
      { name: 'BalanceOil+300ml Tutti Frutti', path: '/category/omega-3-supplements' },
      { name: 'BalanceOil+100ml Pomarańcza, Cytryna i Mięta', path: '/category/omega-3-supplements' }
    ],
    'Suplementy na odporność': [
      { name: 'Protect +', path: '/category/supplements-immunity' },
      { name: 'Xtend', path: '/category/supplements-immunity' },
      { name: 'Xtend +', path: '/category/supplements-immunity' }
    ],
    'Suplementy przywracające zdrowie': [
      { name: 'Zinogene +', path: '/category/supplements-health-restoration' },
      { name: 'Zinoshine +', path: '/category/supplements-health-restoration' }
    ],
    'Błonnik dla jelit': [
      { name: 'Zinobiotic +', path: '/category/fiber-for-gut' }
    ],
    'Testy': [
      { name: 'BalanceTest', path: '/category/tests' }
    ],
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
                  <Link 
                    to="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      const product = products.find(p => p.name === link.name);
                      openProductModal(product);
                    }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {showModal && (
        <ProductModal 
          product={selectedProduct} 
          onClose={() => setShowModal(false)} 
        />
      )}
    </div>
  );
};

export default LinkSection;