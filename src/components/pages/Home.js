import React, {useCallback} from 'react';
import { useHistory } from 'react-router-dom';

import FullLogo from '../../assets/images/squire-logo.webp';


const Home = ({user}) => {
    const history = useHistory();

    const handleDashboardClick = useCallback(() => history.push('/dashboard'), [history]);
    const handleLoginClick = useCallback(() => history.push('/login'), [history]);
    const handleRegisterClick = useCallback(() => history.push('/register'), [history]);

    let buttons;

    if (user != null) {
        buttons = (
            <button type="button" className="btn btn-outline-dark btn-outline-theme" onClick={handleDashboardClick}>Go to dashboard</button>
        )
    } else {
        buttons = (
            <>
                <button type="button" className="btn btn-outline-dark btn-outline-theme mr-2" onClick={handleRegisterClick}>Get started</button>
                <button type="button" className="btn btn-outline-dark btn-outline-theme ml-2" onClick={handleLoginClick}>Log in</button>
            </>   
        )
    }

    return(
    <div className="container-fluid home-container page-wrapper">
        <div className="row justify-content-md-center">
            <div className="col text-center">
                <img className="home-logo d-block mx-auto img-fluid w-50" src={FullLogo} alt="Logo" />
                {buttons}
            </div>
        </div>
    </div>
    );
};

export default Home;