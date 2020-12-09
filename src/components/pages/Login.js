import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

import LoginImage from '../../assets/images/login-image.jpg';

const Login = ({setUser}) => {

    const [loggedIn, setLoggedIn] = useState(false);
    const [message, setMessage] = useState('');

    var username;
    var password;

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:9090/inventory/users/authentication', {
        mode: 'cors',
        headers: { 
            "Content-Type": "application/json; charset=utf-8",
        },
        method: 'POST',
        body: JSON.stringify({
            username: username,
            password: password,
        })
        })
        .then(
            response => {
                console.log(response);

                if(response.ok) {
                    let authHeader = response.headers.get('Authorization');

                    if (authHeader && authHeader.startsWith("Bearer ")){
                        let token = authHeader.substring(7, authHeader.length);
                        localStorage.setItem('token', token);
                        console.log("login");
                        setLoggedIn(true);
                        setUser(null);            
                    } else {
                        throw Error("Invalid authentication type. Required authentication type: 'Bearer'");
                    }
                }
                else throw Error("Wrong username or password");
            }
        )
        .catch(err => {
            console.error('Caught error: ', err);
            setMessage(err.message);
            console.log(message.length);
        })
    }

    let error = '';

    if (message.length > 0) {
        error = (
            <div className="alert alert-danger" role="alert">{message}</div>
        )
    }

    return (
        loggedIn ? <Redirect to="/dashboard"/> :
        <div className="container-fluid home-container page-wrapper">
        <div className="jumbotron d-flex align-items-center min-vh-100 m-0">
            <div className="card mx-auto text-center" style={{maxWidth: "540px"}}>
                <div className="row no-gutters">
                    <div className="col-sm-5">
                        <img src={LoginImage} className="card-img w-100 h-100" alt="Login Form"/>
                    </div>
                    <div className="col-sm-7 align-self-center">
                        <div className="card-body">
                            <h5 className="card-title">Log in</h5>
                            {error}
                            <form onSubmit={handleSubmit}>
                                <div className="input-group">
                                    <input className="input--style-3" type="text" placeholder="Username"
                                           onChange={e => username = e.target.value}/>
                                </div>
                                <div className="input-group">
                                    <input className="input--style-3" type="password" placeholder="Password"
                                           onChange={e => password = e.target.value}/>
                                </div>
                                <button className="btn btn-outline-dark btn-outline-theme" type="submit">Log in</button>
                            </form>
                            <div className="card-text mt-3">Not registered? <Link to='/register'>Create an account</Link></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};

export default Login;