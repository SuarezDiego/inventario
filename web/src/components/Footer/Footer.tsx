import React from 'react';
import './Footer.css';

/**
 * Componente Footer que muestra información de derechos de autor.
 * @returns El componente Footer que muestra información de derechos de autor.
 */
const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <p>Propiedad de Diego Suárez.</p>
    </footer>
  );
};

export default Footer;