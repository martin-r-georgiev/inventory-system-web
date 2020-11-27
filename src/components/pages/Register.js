import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

import RegisterImage from '../../assets/images/register-image.webp';

const Register = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setPasswordConfirmation] = useState('');

    const clearState = () => {
        setUsername('');
        setPassword('');
        setPasswordConfirmation('');
    }

    const [registered, setRegistered] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password === confirmPassword) {
            fetch('http://localhost:9090/inventory/users/', {
            mode: 'cors',
            headers: { "Content-Type": "application/json; charset=utf-8" },
            method: 'POST',
            body: JSON.stringify({
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
                }
            })
            .catch(err => {
                console.error('Caught error: ', err);
                setMessage(err.message);
            })
        }
        else setMessage("Passwords do not match");
        return false;
    }

    if (registered) {
        return <Redirect to="/login"/>;
    }

    let error = '';

    if (message.length > 0) {
        error = (
            <div className="alert alert-danger" role="alert">{message}</div>
        )
    }

    return(
    <div className="container-fluid home-container page-wrapper">
        <div className="jumbotron d-flex align-items-center min-vh-100 m-0">
            <div className="card mx-auto text-center" style={{maxWidth: "540px"}}>
                <div className="row no-gutters">
                    <div className="col-sm-5">
                        <img src={RegisterImage} className="card-img w-100 h-100" alt="Register Form"/>
                    </div>
                    <div className="col-sm-7 align-self-center">
                        <div className="card-body">
                            <h5 className="card-title">Register</h5>
                            {error}
                            <form onSubmit={handleSubmit}>
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