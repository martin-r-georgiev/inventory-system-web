import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import Item from '../Item';

const Dashboard = ({user}) => {

    const [authenticated, setAuthenticated] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        if (user) {
            let warehouseId = (user.warehouseId == null) ? '' : user.warehouseId;
            fetch(`http://localhost:9090/inventory/items/${warehouseId}`, {
                mode: 'cors',
                headers: new Headers({
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Accept': 'application/json',
                }) 
            })
            .then(res => res.json())
            .then((data) => {
                setAuthenticated(true);
                setItems(data);
            }).catch(err => {
                setAuthenticated(false);
                localStorage.clear();
                console.error('Caught error: ', err);
            })
        }
    }, [])

    if(!authenticated) {
        <Redirect to="/login"/>
    }

    return (
    <section className="page-wrapper">
        <p class="text-white bg-success">
            Warehouse ID: {(!user || !("warehouseId" in user)) ? 'Empty' : user.warehouseId}<br/>
            Role: {(!user || !("role" in user)) ? 'Empty' : user.role}
        </p>
        {
        items.map((item) => (<Item key={item.id} name={item.name} quantity={item.quantity}/>))
        }
    </section>
    );
};

export default Dashboard;