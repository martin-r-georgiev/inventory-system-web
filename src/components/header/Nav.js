import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import '../../App.css';

import Logo from '../../assets/images/squire-logo-inverted.webp';

//  Importing components

const Nav = ({user, setUser}) => {

    var acceptedRoles = ["manager", "admin"];

    const [navButtons, setNavButtons] = useState(
        (
            <ul className="nav navbar-nav ml-auto">
                <li className="nav-item ml-auto">
                    <Link className="nav-link" to='/login'>Log in</Link>
                </li>
                <li className="nav-item ml-auto">
                    <Link className="nav-link" to='/register'>Register</Link>
                </li>
            </ul>
        )
    );

    const handleLogout = useCallback(() => {
        console.log("Logging out...");
        setUser(null);
        localStorage.clear();
    }, []);


    useEffect(() => {
        console.log("Refreshing nav");
        if (user == null) {
            setNavButtons((
                <ul className="nav navbar-nav ml-auto">
                    <li className="nav-item ml-auto">
                        <Link className="nav-link" to='/login'>Log in</Link>
                    </li>
                    <li className="nav-item ml-auto">
                        <Link className="nav-link" to='/register'>Register</Link>
                    </li>
                </ul>
            ));   
        } else {
            setNavButtons((
                <ul className="nav navbar-nav ml-auto">
                    <li className="nav-item ml-auto">
                        <Link className="nav-link" to='/dashboard'>Dashboard</Link>
                    </li>
                    { (user !== null && acceptedRoles.includes(String(user.role).toLowerCase())) ?
                    <>
                        <li className="nav-item ml-auto">
                            <Link className="nav-link" to='/statistics'>Statistics</Link>
                        </li>
                        <li className="nav-item ml-auto">
                            <Link className="nav-link" to='/management'>Management</Link>
                        </li>
                    </>
                    : ''
                    }
                    <li className="nav-item ml-auto">
                        <Link className="nav-link" to='/chat'>Chat</Link>
                    </li>
                    <li className="nav-item ml-auto">
                        <Link className="nav-link" onClick={handleLogout} to='/'>Log out</Link>
                    </li>
                </ul>
            ));
        }
    }, [user, handleLogout]);

    return (
    <nav className="navbar navbar-expand-md justify-content-end">
        <Link className="navbar-brand" to='/'><img src={Logo} alt="Squire" height="50"/></Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="true" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon">
                <FontAwesomeIcon icon={faBars} style={{color: "#fff", fontSize: "28px"}}/>
            </span>
        </button>
        <div className="navbar-collapse collapse show" id="navbarCollapse">
            {navButtons}
        </div>
    </nav>
    )
};

export default Nav;