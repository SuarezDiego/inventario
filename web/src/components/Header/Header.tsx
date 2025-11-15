import React from 'react';
import { useLocation } from 'react-router-dom';
import './Header.css';
import { ADD_ITEM, HOME, INVENTORY } from '../../constants/routes';
import { useTheme } from '../../hooks/useTheme';

/**
 * Componente Header que muestra el título y la navegación de la aplicación.
 * @returns El componente Header que muestra el título y la navegación de la aplicación.
 */
export const Header: React.FC = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header">
      <h1 className="title">Inventario</h1>
      <nav>
        <ul className="navList">
          <li>
            <button
              className="themeToggle"
              aria-label="Toggle dark mode"
              onClick={toggleTheme}
              title={theme === 'light' ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'}
            >
              <span className="sun-icon">☀️</span>
              <span className="moon-icon">🌙</span>
              <span className="toggle-slider"></span>
            </button>
          </li>
          <li>
            <a
              href={HOME}
              className={`navLink ${location.pathname === HOME ? 'active' : ''}`}
            >
              Inicio
            </a>
          </li>
          <li>
            <a
              href={ADD_ITEM}
              className={`navLink ${location.pathname === ADD_ITEM ? 'active' : ''}`}
            >
              Agregar Ítem
            </a>
          </li>
          <li>
            <a
              href={INVENTORY}
              className={`navLink ${location.pathname === INVENTORY ? 'active' : ''}`}
            >
              Inventario
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};
