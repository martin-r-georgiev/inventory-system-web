import React from 'react';
import { Route } from 'react-router-dom';

export const ProtectedRoute = ({component: Component, ...rest}) => {
    return (
        <Route 
            {...rest}
            render={props => {
            
                if (!auth.isAuthenticated()) return auth.login();
                
                return <Component auth={auth} {...props} />;
            }}
        />
    )
}