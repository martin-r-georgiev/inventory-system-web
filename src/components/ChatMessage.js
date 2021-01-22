import React from 'react';

const ChatMessage = ({name, message, timestamp}) => {
    let formattedTime = new Date(timestamp).toLocaleTimeString("en-US", { timeZone: 'UTC' });

    return (
        <div data-testid="chat-message" className="chatbox-message">
            <strong className="chatbox-username">{name}</strong>: <em>{message}</em>
            <p><i>{formattedTime}</i></p>
        </div>
    );
}

export default ChatMessage;