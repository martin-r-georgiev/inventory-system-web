import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { isAuthenticated } from './authentication/auth.js';

const ProtectedRoute = ({component: Component, user, ...rest}) => {
    let authenticated = isAuthenticated(user);
    
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