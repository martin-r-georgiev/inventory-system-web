import React from 'react';

import Chat from '../Chat';

const ChatRoom = ({user}) => {
    return(
    <div className="container-fluid home-container page-wrapper">
        <div className="row justify-content-md-center">
            <div className="col text-center">
                <Chat user={user}/>
            </div>
        </div>
    </div>
    );
};

export default ChatRoom;