import React from 'react';

const Item = (props) => (
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">{props.name}</h5>
            <h6 class="card-subtitle mb-2 text-muted">{props.id}</h6>
            <p class="card-text">Quantity: {props.quantity}</p>
        </div>
    </div>
);

export default Item;
    