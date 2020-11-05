import React from 'react';
import Item from './Item';

const ItemList = ({items}) => (
    <section>
        {
        items.map((item) => (
            <Item id={item.id} name={item.name} quantity={item.quantity}/>
        ))
        }
    </section>
);

export default ItemList;