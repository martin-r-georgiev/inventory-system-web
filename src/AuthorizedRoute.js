import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { isAuthorized, isAuthenticated } from './authentication/auth.js';

const AuthorizedRoute = ({component: Component, roles, ...rest}) => {
    let authenticated = isAuthenticated();
    let authorized = isAuthorized(roles);

    return (
        <Route 
            {...rest}
            render={props => {
                if (authenticated && authorized) {
                    return (<Component auth={authenticated} {...props} />);
                } else {
                    return (<Redirect to="/"/>);
                }  
            }}
        />
    )
};

export default AuthorizedRoute;