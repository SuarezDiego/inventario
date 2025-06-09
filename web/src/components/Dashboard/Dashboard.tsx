import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { ItemList } from '../ItemList/ItemList';
import { Item } from '../Item/Item';
import type { ItemData } from '../../models/ItemData';
import { useFetchItems } from '../../hooks/useFetchItems';
import { FaSpinner } from 'react-icons/fa';

export const Dashboard: React.FC = () => {
    const { items, isLoading } = useFetchItems();
    const [activeItem, setActiveItem] = useState<ItemData | null>(null);

    const activateItem = (item: ItemData) => {
        setActiveItem(item);
    };

    useEffect(() => {
        if (items.length > 0 && !activeItem) {
            setActiveItem(items[0]);
        }
    }, [items]);

    return (
        <div className="dashboard-grid">
            {isLoading ? (
                <div className="loading-container">
                    <FaSpinner className="loading-icon" />
                    <p>Cargando...</p>
                </div>
            ) : items.length === 0 ? (
                <div className="no-items-container">
                    <p>No hay elementos disponibles.</p>
                </div>
            ) : (
                <>
                    <div className="g-container">
                        <ItemList items={items} activeItem={activeItem} activateItem={activateItem} />
                    </div>
                    <div className="g-container">
                        {activeItem && <Item {...activeItem} />}
                    </div>
                </>
            )}
        </div>
    );
};