import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Modal, Button } from 'react-bootstrap';

import Item from '../Item';

const Dashboard = ({user}) => {
    const [items, setItems] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [currentItemId, setCurrentItemId] = useState(null);

    const deleteItem = (id) => {
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
        setShowDeleteModal(false);
    }

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
                setItems(data);
            }).catch(err => {
                console.error('Caught error: ', err);
            })
        }
    }, [user, deleteItem])

    return (
    <section className="page-wrapper dashboard-background">
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
            <button className="btn btn-outline-success btn-sm mr-1 d-flex align-items-center">
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
                items.map((item) => (<Item key={item.id} id={item.id} name={item.name} quantity={item.quantity} setShowDeleteModal={setShowDeleteModal} setItemId={setCurrentItemId}/>))
                }
            </div>
        </div>
    </section>
    );
};

export default Dashboard;