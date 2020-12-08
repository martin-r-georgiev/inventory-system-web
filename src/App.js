import React, { useEffect, useState, useCallback } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';

// Importing components
import ProtectedRoute from './ProtectedRoute';

import Dashboard from './components/pages/Dashboard';
import Home from './components/pages/Home';
import Nav from './components/header/Nav';
import Footer from './components/footer/Footer';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import ScrollToTop from './js/ScrollToTop';

const App = () => {

	const [user, setUser] = useState(null);
	
	const authenticateUser = useCallback(() => {
		fetch('http://localhost:9090/inventory/users/user', {
		mode: 'cors',
		method: 'GET',
		headers: new Headers({
			'Authorization': `Bearer ${localStorage.getItem('token')}`,
			'Accept': 'application/json',
			}) 
		})
		.then(response => {
			if (response.ok) {
				return response.json();
			}
			else {
				return null;
			}
		})
		.then(response => {
			if (response != null) {
				setUser(response);
				localStorage.setItem("warehouseId", response.warehouseId);
			}
		})
	},[]);

	console.log(localStorage.getItem("token"));
	console.log(user);

	useEffect (() => {
		if(!user) {
			authenticateUser();
		}
    }, [user, authenticateUser])

	return (
		<Router>
			<div>
				<Nav user={user} setUser={setUser}/>
					<ScrollToTop>
							<Switch>
								<Route exact path="/" component={() => <Home user={user}/>}/>
								<ProtectedRoute exact user={user} path="/dashboard" component={() => <Dashboard user={user}/>} />
								<Route exact path="/login" component={() => <Login setUser={setUser}/>} />
								<Route exact path="/register" component={Register} />
								<Redirect to="/" />
							</Switch>
					</ScrollToTop>
				<Footer/>
			</div>
		</Router>
	)
}

export default App;
