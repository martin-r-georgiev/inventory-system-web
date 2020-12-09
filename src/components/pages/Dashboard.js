import React, { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Modal, Button } from 'react-bootstrap';

import Item from '../Item';

const Dashboard = ({aUser}) => {
    const [items, setItems] = useState([]);


    const [itemName, setItemName] = useState('');
    const [itemQuantity, setItemQuantity] = useState('');

    const clearState = () => {
        setItemName('');
        setItemQuantity('');
    }

    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    
    const [currentItemId, setCurrentItemId] = useState(null);

    let user = JSON.parse(aUser);

    const handleAddItem = (e) => {
        e.preventDefault();

        let warehouseId = (user.warehouseId == null) ? '' : user.warehouseId;
        fetch(`http://localhost:9090/inventory/items/${warehouseId}`, {
        mode: 'cors',
        method: 'POST',
        headers: new Headers({
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': "application/json; charset=utf-8",
        }),
        body: JSON.stringify({
            name: itemName,
            quantity: itemQuantity,
        })
        })
        .then(res => {
            console.log(res);
            if (res.ok) {
                clearState();
            }
        })
        .catch(err => {
            console.error('Caught error: ', err);
        })

        setShowAddModal(false);
        setTimeout(() => { refreshItemList(); }, 2000);
    }

    const handleEditItem = (e) => {
        e.preventDefault();

        if(currentItemId !== null) {
            fetch(`http://localhost:9090/inventory/items/${currentItemId}`, {
            method: 'PUT',
            mode: 'cors',
            headers: new Headers({
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': "application/json; charset=utf-8",
            }),
            body: JSON.stringify({
                name: itemName,
                quantity: itemQuantity,
            })
            })
            .catch(err => {
                console.error('Caught error: ', err);
            })
        }

        setCurrentItemId(null);
        setShowEditModal(false);
        setTimeout(() => { refreshItemList(); }, 2000);
    }

    const deleteItem = useCallback((id) => {
        console.log("delete item");
        if(id !== null) {
            fetch(`http://localhost:9090/inventory/items/${id}`, {
            method: 'DELETE',
            mode: 'cors',
            headers: new Headers({
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Accept': 'application/json',
            }) 
            })
            .catch(err => {
                console.error('Caught error: ', err);
            })
        }
        
        setCurrentItemId(null);
        setShowDeleteModal(false);
        setTimeout(() => { refreshItemList(); }, 2000);
    }, []);


    const refreshItemList = () => {
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
                console.log("Retreiving item");
                setItems(data);
            }).catch(err => {
                localStorage.clear();
                console.error('Caught error: ', err);
            })
        }
    };

    useEffect(() => {
        refreshItemList();
    }, [])

    return (
    <section className="page-wrapper dashboard-background">
        {/* Add item modal */}
        <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>New item</Modal.Title>
            </Modal.Header>
            <form onSubmit={handleAddItem}>
            <Modal.Body>
                <div className="input-group">
                    <input className="input--style-3" type="text" placeholder="Name" onChange={e => setItemName(e.target.value)}/>
                </div>
                <div className="input-group">
                    <input className="input--style-3" type="text" placeholder="Quantity" onChange={e => setItemQuantity(e.target.value)}/>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowAddModal(false)}>
                    Cancel
                </Button>
                <Button type="submit" variant="success" onClick={() => setShowAddModal(false)}>
                    Add
                </Button>
            </Modal.Footer>
            </form>
        </Modal>
        {/* Edit item modal */}
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Editing item</Modal.Title>
            </Modal.Header>
            <form onSubmit={handleEditItem}>
            <Modal.Body>
                <div className="input-group">
                    <input className="input--style-3" type="text" placeholder="Name" onChange={e => setItemName(e.target.value)}/>
                </div>
                <div className="input-group">
                    <input className="input--style-3" type="text" placeholder="Quantity" onChange={e => setItemQuantity(e.target.value)}/>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                    Cancel
                </Button>
                <Button type="submit" variant="success" onClick={() => setShowEditModal(false)}>
                    Save
                </Button>
            </Modal.Footer>
            </form>
        </Modal>
        {/* Delete item modal */}
        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>Do you really want to delete this item?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={() => deleteItem(currentItemId)}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
        <p className="text-white bg-success">
                Warehouse ID: {(!user || !("warehouseId" in user)) ? 'Empty' : user.warehouseId}<br/>
                Role: {(!user || !("role" in user)) ? 'Empty' : user.role}
        </p>
        <div className="d-flex justify-content-end mr-1">
            <button className="btn btn-outline-success btn-sm mr-1 d-flex align-items-center" onClick={() => setShowAddModal(true)}>
                    <FontAwesomeIcon icon={faPlus} style={{color: "bg-success", fontSize: "20px", marginRight: "5px"}}/>
                    Add item
            </button>
        </div>
        <div className="row">
            <div className="col-3 bg-dark text-white rounded">
                Search
            </div>
            <div className="col-9">
                {
                items.map((item) => (<Item key={item.id} id={item.id} name={item.name} quantity={item.quantity} setShowDeleteModal={setShowDeleteModal} setShowEditModal={setShowEditModal} setItemId={setCurrentItemId}/>))
                }
            </div>
        </div>
    </section>
    );
};

export default Dashboard;