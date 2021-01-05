import React from 'react';

const ChatMessage = ({name, message, timestamp}) => {
    let formattedTime = new Date(timestamp).toLocaleTimeString();

    return (
        <p className="chatbox-message">
            <strong className="chatbox-username">{name}</strong>: <em>{message}</em>
            <p><i>{formattedTime}</i></p>
        </p>
    );
}

export default ChatMessage;