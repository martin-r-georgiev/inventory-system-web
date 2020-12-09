import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { isAuthenticated } from './authentication/auth.js';

const ProtectedRoute = ({component: Component, ...rest}) => {
    let authenticated = isAuthenticated();

    return (
        <Route 
            {...rest}
            render={props => {
                if (authenticated) {
                    return (<Component auth={authenticated} {...props} />);
                } else {
                    return (<Redirect to="/"/>);
                }  
            }}
        />
    )
};

export default ProtectedRoute;