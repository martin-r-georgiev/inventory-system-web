import React, { useEffect, useState, useCallback } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';

// Importing components
import ProtectedRoute from './ProtectedRoute';
import AuthorizedRoute from './AuthorizedRoute';

import Dashboard from './components/pages/Dashboard';
import Management from './components/pages/Management';
import Statistics from './components/pages/Statistics';
import Home from './components/pages/Home';
import Nav from './components/header/Nav';
import Footer from './components/footer/Footer';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import ScrollToTop from './js/ScrollToTop';
import ItemDetailed from './components/pages/ItemDetailed';

const App = () => {

	const [user, setUser] = useState(localStorage.getItem("user"));
	
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
				setUser(JSON.stringify(response));
				localStorage.setItem("user", JSON.stringify(response));
				localStorage.setItem("warehouseId", response.warehouseId);
			}
		})
	},[]);

	useEffect (() => {
		if(!user) {
			console.log("login");
			authenticateUser();
		}
    }, [user])

	var convertedUser = JSON.parse(user);

	return (
		<Router>
			<div>
				<Nav user={convertedUser} setUser={setUser}/>
					<ScrollToTop>
							<Switch>
								<Route exact path="/" component={() => <Home user={convertedUser}/>}/>
								<ProtectedRoute exact path="/dashboard" component={() => <Dashboard user={convertedUser}/>} />
								<ProtectedRoute exact path="/dashboard/:id" component={ItemDetailed} />
								<ProtectedRoute exact path="/statistics" component={() => <Statistics user={convertedUser}/>} />
								<AuthorizedRoute exact roles={["Manager", "Admin"]} path="/management" component={() => <Management user={convertedUser}/>} />
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
