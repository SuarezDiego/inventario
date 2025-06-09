import React from 'react';
import type { ItemData } from '../../models/ItemData';
import './Item.css';
import { Stadistic } from '../Stadistic/Stadistic';

export const Item: React.FC<ItemData> = (item) => {
    return (
        <div className="item">
            <div className="item-details">
                <p><strong>Nombre:</strong> {item.name}</p>
                <p><strong>Código:</strong> {item.code}</p>
                <p><strong>Descripción:</strong> {item.description || 'No hay descripción disponible'}</p>
            </div>
            <div className="item-stadistic">
                <Stadistic {...item} />
            </div>
            <div className="item-image-container">
                <img src={item.img} alt={`${item.name} image`} />
            </div>
        </div>
    );
};
