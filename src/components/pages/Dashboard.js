import React, { useState, useEffect } from 'react';
import Item from '../Item';

const Dashboard = ({user}) => {

    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch('http://localhost:9090/inventory/items', {
            mode: 'cors',
            headers: new Headers({
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Accept': 'application/json',
            }) 
        })
        .then(res => res.json())
        .then((data) => {
            setItems(data);
        }).catch(err => console.error('Caught error: ', err))
    }, [user])

    return (
    <section className="page-wrapper">
        {
        items.map((item) => (
            <Item key={item.id} id={item.id} name={item.name} quantity={item.quantity}/>
        ))
        }
    </section>
    );
};

export default Dashboard;