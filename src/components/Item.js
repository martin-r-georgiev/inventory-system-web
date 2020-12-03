import React from 'react';

const Item = ({name, quantity}) => (
    <div className="card">
        <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <p className="card-text">Quantity: {quantity}</p>
        </div>
    </div>
);

export default Item;
    