import React from 'react';
import { useLocation } from 'react-router-dom';
import './Header.css';

export const Header: React.FC = () => {
    const location = useLocation();

    return (
        <header className="header">
            <h1 className="title">Inventario</h1>
            <nav>
                <ul className="navList">
                    <li>
                        <a
                            href="/"
                            className={`navLink ${location.pathname === '/' ? 'active' : ''}`}
                        >
                            Inicio
                        </a>
                    </li>
                    <li>
                        <a
                            href="/inventory"
                            className={`navLink ${location.pathname === '/inventory' ? 'active' : ''}`}
                        >
                            Inventario
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    );
};
