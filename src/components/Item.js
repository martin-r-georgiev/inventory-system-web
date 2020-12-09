import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons'

const Item = ({id, name, quantity, setShowDeleteModal, setShowEditModal, setItemId}) => {

    const handleItemEdit = () => {
        setItemId(id);
        setShowEditModal(true);
    }

    const handleItemDeletion = () => {
        setItemId(id);
        setShowDeleteModal(true);
    } 

    return(
    <div className="card m-2">
        <div className="card-body">
            <div className="row d-flex align-items-center justify-content-between">
                <div className="col-4 col-sm d-flex align-items-center">
                    <h5>{name}</h5>
                </div>
                <div className={`col-4 col-sm-3 p-2 text-white d-flex justify-content-center rounded ${quantity > 0 ? "bg-success" : "bg-danger"}`}>
                    Quantity: {quantity}
                </div>
                <div className="col-4 col-sm-3 d-flex justify-content-end">
                    <button className="btn btn btn-outline-info btn-sm mr-2" onClick={handleItemEdit}>
                        <FontAwesomeIcon icon={faPencilAlt} style={{color: "bg-info", fontSize: "20px"}}/>
                    </button>
                    <button className="btn btn btn-outline-danger btn-sm" onClick={handleItemDeletion}>
                        <FontAwesomeIcon icon={faTrashAlt} style={{color: "bg-danger", fontSize: "20px"}}/>
                    </button>
                </div>
            </div>
        </div>
    </div>
    );
};

export default Item;
    