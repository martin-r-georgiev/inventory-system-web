import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

import ItemHistoryEntry from '../ItemHistoryEntry';

const ItemDetailed = ({match}) => {

    const [item, setItem] = useState({})
    const [redirect, setRedirect] = useState(false);
    const [itemHistory, setItemHistory] = useState([]);

    var user;

    if("user" in localStorage) user = JSON.parse(localStorage.getItem("user"));

    const fetchItem = async (id) => {
        if (user) {
            let warehouseId = (user.warehouseId == null) ? '' : user.warehouseId;
            fetch(`http://localhost:9090/inventory/items/${warehouseId}/${id}`, {
                method: 'GET',
                mode: 'cors',
                headers: new Headers({
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Accept': 'application/json',
                }) 
            })
            .then(res => {
                if(res.ok) return res.json();
                else {
                    setRedirect(true);
                    return {};
                }
            } )
            .then((data) => {
                console.log("Retreiving item");
                setItem(data);

                fetchItemHistory(data.id);
            }).catch(err => {
                setRedirect(true);
                console.error('Caught error: ', err);
            })
        }
    }

    const fetchItemHistory = async (itemId) => {
        if (user && user.warehouseId)
        {
            console.log(user.warehouseId);
            console.log(itemId);
            fetch(`http://localhost:9090/inventory/records/${user.warehouseId}/${itemId}`, {
                method: 'GET',
                mode: 'cors',
                headers: new Headers({
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Accept': 'application/json',
                })
            }).then(res => {
                if(res.ok) return res.json();
                else {
                    setRedirect(true);
                    return {};
                }
            } )
            .then((data) => {
                console.log("Retreiving item history");
                setItemHistory(data);
            }).catch(err => {
                setRedirect(true);
                console.error('Caught error: ', err);
            })
        }
    }

    useEffect(() => {
        fetchItem(match.params.id);
        console.log(itemHistory);
    }, [])

    return(
    redirect ? <Redirect to="/dashboard"/> :
    <div className="container-fluid home-container page-wrapper pt-5">
        <div className="container">
            <h2>{item.name}</h2>
            <div className={`col-4 col-sm-3 p-2 text-white d-flex justify-content-center rounded ${item.quantity > 0 ? "bg-success" : "bg-danger"}`}>
                Current Quantity: {item.quantity}
            </div>
            <div className="item-history">
                <h4>Item History</h4>
                {
                    itemHistory.map((entry, index) => {
                        if(index !== 0 && itemHistory[index].quantity !== itemHistory[index-1].quantity)
                        {
                            return <ItemHistoryEntry key={entry.id} timestamp={entry.date} quantity={entry.quantity} trend={(itemHistory[index].quantity > itemHistory[index-1].quantity) ? "up" : "down"}/>;
                        }
                        else {
                            return <ItemHistoryEntry key={entry.id} timestamp={entry.date} quantity={entry.quantity}/>;
                        }  
                    })
                }
            </div>
        </div>
    </div>
    );
};

export default ItemDetailed;