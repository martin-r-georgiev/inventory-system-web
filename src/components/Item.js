import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons'

const Item = ({id, name, quantity, setShowDeleteModal, setItemId}) => {

    const handleItemDeletion = () => {
        setItemId(id);
        setShowDeleteModal(true);
    }

    return(
    <div className="card m-2">
        <div className="card-body">
            <div className="row d-flex align-items-center justify-content-between">
                <div className="col-6 col-sm d-flex align-items-center">
                    <h5>{name}</h5>
                </div>
                <div className="col-4 col-sm-2 p-2 bg-success text-white d-flex justify-content-center rounded">
                    Quantity: {quantity}
                </div>
                <div className="col-2 col-sm-2 d-flex justify-content-end">
                    <button className="btn btn btn-outline-info btn-sm mr-2">
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
    