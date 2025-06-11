import React from 'react';
import { useLocation } from 'react-router-dom';
import './Header.css';
import { ADD_ITEM, HOME, INVENTORY } from '../../constants/routes';

/**
 * Componente Header que muestra el título y la navegación de la aplicación.
 * @returns El componente Header que muestra el título y la navegación de la aplicación.
 */
export const Header: React.FC = () => {
    const location = useLocation();

    return (
        <header className="header">
            <h1 className="title">Inventario</h1>
            <nav>
                <ul className="navList">
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
                            Agregar Item
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
