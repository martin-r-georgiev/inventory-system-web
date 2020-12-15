import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

const ItemDetailed = ({match}) => {

    const [item, setItem] = useState({})
    const [redirect, setRedirect] = useState(false);

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
            }).catch(err => {
                setRedirect(true);
                console.error('Caught error: ', err);
            })
        }
    }

    useEffect(() => {
        fetchItem(match.params.id);
    }, [])

    return(
    redirect ? <Redirect to="/dashboard"/> :
    <div className="container-fluid home-container page-wrapper pt-5">
        <div className="container">
            <h2>{item.name}</h2>
            <div className={`col-4 col-sm-3 p-2 text-white d-flex justify-content-center rounded ${item.quantity > 0 ? "bg-success" : "bg-danger"}`}>
                Current Quantity: {item.quantity}
            </div>
        </div>
    </div>
    );
};

export default ItemDetailed;