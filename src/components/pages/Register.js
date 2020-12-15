import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faBoxes } from '@fortawesome/free-solid-svg-icons'

import RegisterImage from '../../assets/images/register-image.webp';

const Register = () => {

    const [warehouseName, setWarehouseName] = useState('');
    const [warehouseId, setWarehouseId] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setPasswordConfirmation] = useState('');

    const clearState = () => {
        setUsername('');
        setPassword('');
        setPasswordConfirmation('');
    }

    const [showWarehouseForm, setShowWarehouseForm] = useState(false);

    const [registered, setRegistered] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const validateRegistration = () => {
        if(username && password && confirmPassword) {
            if (username.length <= 0) {
                setErrorMessage("Username field is empty");
                return false;
            } 
            if (password.length <= 0) {
                setErrorMessage("Password field is empty");
                return false;
            }
            if (password !== confirmPassword) {
                setErrorMessage("Passwords do not match");
                return false;
            }
            if(showWarehouseForm) {
                if(!warehouseName || warehouseName.length <= 0 ) {
                    setErrorMessage("Warehouse name field is empty");
                    return false;
                }
            } else {
                if(!warehouseId || warehouseId.length <= 0 ) {
                    setErrorMessage("Warehouse ID field is empty");
                    return false;
                }
            }
            return true;
        }
        setErrorMessage("Pleace fill all fields and try again");
        return false;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateRegistration()) {
            fetch('http://localhost:9090/inventory/users/register', {
            mode: 'cors',
            headers: { "Content-Type": "application/json; charset=utf-8" },
            method: 'POST',
            body: JSON.stringify({
                ...((showWarehouseForm) && {warehouseName: warehouseName}),
                ...((!showWarehouseForm) && {warehouseId: warehouseId}),
                username: username,
                password: password,
            })
            })
            .then(res => {
                console.log(res);
                if (res.ok) {
                    setRegistered(true);
                    clearState();
                    return true;
                } else {
                    res.text().then( (data) => {
                        setErrorMessage((data.length > 0) ? data : `Encountered an unexpected issues when trying to register. Error ${res.status}`);
                    }) 
                }
            })
            .catch(err => {
                console.error('Caught error: ', err);
                setErrorMessage(err.message);
            })
        }
        return false;
    }

    if (registered) {
        return <Redirect to="/login"/>;
    }

    let error = '';

    if (errorMessage.length > 0) {
        error = (
            <div className="alert alert-danger" role="alert">{errorMessage}</div>
        )
    }

    let registrationForm = (
        <form onSubmit={handleSubmit}>
            <div className="input-group">
                {showWarehouseForm ? 
                <input className="input--style-3" type="text" placeholder="Warehouse Name" onChange={e => setWarehouseName(e.target.value)}/>
                : <input className="input--style-3" type="text" placeholder="Warehouse ID" onChange={e => setWarehouseId(e.target.value)}/>
                }
            </div>
            <div className="input-group">
                <input className="input--style-3" type="text" placeholder="Username"
                        onChange={e => setUsername(e.target.value)}/>
            </div>
            <div className="input-group">
                <input className="input--style-3" type="password" placeholder="Password"
                        onChange={e => setPassword(e.target.value)}/>
            </div>
            <div className="input-group">
                <input className="input--style-3" type="password" placeholder="Confirm Password"
                        onChange={e => setPasswordConfirmation(e.target.value)}/>
            </div>
            <button className="btn btn-outline-dark btn-outline-theme" type="submit">Register</button>
        </form>
    );

    return(
    <div className="container-fluid home-container page-wrapper">
        <div className="jumbotron d-flex align-items-center min-vh-100 m-0">
            <div className="card mx-auto text-center" style={{maxWidth: "540px"}}>
                <div className="row no-gutters">
                    <div className="col-sm-5 mh-100">
                        <img src={RegisterImage} className="card-img w-100 h-100" alt="Register Form"/>
                    </div>
                    <div className="col-sm-7 align-self-center">
                        <div className="card-body">
                            <button className="btn btn-outline-dark btn-sm mr-1" onClick={() => setShowWarehouseForm(false)}>
                                <FontAwesomeIcon icon={faUser} style={{color: "bg-dark", fontSize: "20px", marginRight: "5px"}}/>
                                User
                            </button>
                            <button className="btn btn-outline-dark btn-sm ml-1" onClick={() => setShowWarehouseForm(true)}>
                                <FontAwesomeIcon icon={faBoxes} style={{color: "bg-dark", fontSize: "20px", marginRight: "5px"}}/>
                                Management
                            </button>
                            <h5 className="card-title mt-2">Register</h5>
                            {error}
                            {registrationForm}
                            <div className="card-text mt-3">Already have an account? <Link to='/login'>Sign in</Link></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};

export default Register;