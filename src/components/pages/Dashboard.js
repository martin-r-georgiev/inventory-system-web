import React, { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Modal, Button } from 'react-bootstrap';

import Item from '../Item';
import SearchBox from '../SearchBox';

import EmptyListIcon from '../../assets/svg/empty-list.svg';

const Dashboard = ({user}) => {
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

    // Filters
    const [searchFilter, setSearchFilter] = useState('');
    const [sortOption, setSortOption] = useState('');
    const [onlyOutOfStockFilter, setOnlyOutOfStockFilter] = useState(false);

    let filteredContent = [];

    const handleSortOptionChange = (e, value) => {
        e.preventDefault();
        setSortOption(value);
    }

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
                    return [];
                }
            } )
            .then((data) => {
                // BUG: User is not logged out if warehouse is not found
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

    filteredContent = items.filter((item) => ( item.name.toLocaleLowerCase().indexOf(searchFilter.toLocaleLowerCase()) !== -1));

    if(onlyOutOfStockFilter === true) {
        filteredContent = filteredContent.filter((item) => (item.quantity == 0));
    }

    if(sortOption)
    {
        if(sortOption === "Alphabetical") { 
            filteredContent = filteredContent.sort((a, b) => a.name.localeCompare(b.name)); 
        }
        if(sortOption === "Highest quantity") {
            filteredContent = filteredContent.sort((a, b) => parseFloat(b.quantity) - parseFloat(a.quantity));
        }
        if(sortOption === "Lowest quantity") {
            filteredContent = filteredContent.sort((a, b) => parseFloat(a.quantity) - parseFloat(b.quantity));
        }
    }

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
        <div className="d-flex align-middle mr-1">
            <div className="col">
                <SearchBox placeholder="Search for item" searchFunc={(e) => setSearchFilter(e.target.value)}/>
            </div>
            <div className="col .d-inline-block align-middle">
                <button type="button" className="btn btn-sm btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Sort: <b>{(sortOption) ? sortOption : "None"}</b>
                </button>
                <div className="dropdown-menu">
                    <a className="dropdown-item" href='#' onClick={(e) => handleSortOptionChange(e, "Alphabetical")}>Alphabetical</a>
                    <a className="dropdown-item" href='#' onClick={(e) => handleSortOptionChange(e, "Highest quantity")}>Highest quantity</a>
                    <a className="dropdown-item" href='#' onClick={(e) => handleSortOptionChange(e, "Lowest quantity")}>Lowest quantity</a>
                </div>
            </div>
            <div className="col">
                <div className="form-check float-right">
                    <input className="form-check-input filter-checkbox" type="checkbox" id="outOfStockCheckbox"
                           checked={onlyOutOfStockFilter} onChange={() => setOnlyOutOfStockFilter(!onlyOutOfStockFilter)}/>
                    <label className="form-check-label" htmlFor="outOfStockCheckbox">Only out-of-stock items</label>
                </div>
            </div>
            <div className="col d-flex justify-content-end">
                <button className="btn btn-outline-success btn-sm mr-1 d-flex align-items-center" onClick={() => setShowAddModal(true)}>
                        <FontAwesomeIcon icon={faPlus} style={{color: "bg-success", fontSize: "20px", marginRight: "5px"}}/>
                        Add item
                </button>
            </div>
        </div>
        <div className="container-fluid m-3">
            <div className="row d-flex align-items-start">
                <div className="col">
                    {
                    (filteredContent.length > 0) ?
                    filteredContent.map((item, index) => (<Item key={item.id} id={item.id} whIndex={index++} name={item.name} quantity={item.quantity} setShowDeleteModal={setShowDeleteModal} setShowEditModal={setShowEditModal} setItemId={setCurrentItemId}/>))
                    :
                    <div className="container-fluid">
                        <div className="row justify-content-center mt-5">
                            <img src={EmptyListIcon} alt="Empty List Icon" height="200px"/>
                        </div>
                        <div className="row justify-content-center">
                            <h3>Empty list</h3>
                        </div>
                        <div className="row justify-content-center mt-2">
                            <button className="btn btn-outline-success btn-sm d-flex align-items-center" onClick={() => setShowAddModal(true)}>
                                <FontAwesomeIcon icon={faPlus} style={{color: "bg-success", fontSize: "20px", marginRight: "5px"}}/>
                                Add item
                            </button>
                        </div>
                    </div>
                    }
                </div>
            </div>
        </div>  
    </section>
    );
};

export default Dashboard;