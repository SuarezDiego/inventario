import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import './ItemList.css';
import type { ItemData } from '../../models/ItemData';

interface ItemListProps {
    items: ItemData[];
    activeItem: ItemData | null;
    activateItem: Function;
}

export const ItemList: React.FC<ItemListProps> = ({ items, activeItem, activateItem }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredItems = items.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container">
            <header className="card-header">
                <div className="search-container">
                    <span className="icon-search">
                        <FaSearch />
                    </span>
                    <input
                        type="text"
                        placeholder="Buscar Producto..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="input"
                    />
                </div>
            </header>

            <ul className="list">
                {filteredItems.map((item) => (
                    <li
                        key={item.id}
                        className={item.id === activeItem?.id ? 'listItem listItemActive' : 'listItem'}
                        onClick={() => activateItem(item)}
                    >
                        {item.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};