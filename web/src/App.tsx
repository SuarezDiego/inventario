import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Dashboard } from "./components/Dashboard/Dashboard";
import Footer from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { Home } from './components/Home/Home';
import { AddItem } from './components/AddItem/AddItem';
import './style.css';
import { HOME, ADD_ITEM, INVENTORY } from './constants/routes';

/**
 * Componente principal de la aplicación que define las rutas y estructura general.
 * @returns El componente principal de la aplicación que define las rutas y estructura general.
 */
export const App: React.FC = () => {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path={HOME} element={<Home />} />
                <Route path={ADD_ITEM} element={<AddItem />} />
                <Route path={INVENTORY} element={<Dashboard />} />
            </Routes>
            <Footer />
        </Router>
    );
};