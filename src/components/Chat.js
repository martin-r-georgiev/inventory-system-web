import React, { useState, useEffect, useRef } from 'react';

import ChatMessage from './ChatMessage';

const URL = 'ws://localhost:9000/ws/chat'

const Chat = ({user}) => {
    const socket = useRef(null);

    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (socket.current == null && user !== undefined) {
            socket.current = new WebSocket(`${URL}/${user.username}`);
        }

        if (socket.current !== null) {
            socket.current.addEventListener('open', function (event) {
                console.log('Connected to WS Server')
            });
    
            // Listen for messages
            socket.current.addEventListener('message', function (event) {
                console.log('Message from server ', event.data);
                const messageObject = JSON.parse(event.data);
                addMessage(messageObject);
            });
            
            // Listen for messages
            socket.current.addEventListener('close', function (event) {
                console.log('Message from server ', event.data);
                const messageObject = JSON.parse(event.data);
                addMessage(messageObject);
                socket.current = null;
            });
        }
    }, []);

    const addMessage = (message) => {
        setMessages(prevState => [message, ...prevState]);
    }

    const onMessageSubmit = (e) => {
        e.preventDefault();
        if(user !== undefined) {
            let time = new Date().getTime();
            const messageObject = { author: user.username, content: message, timestamp: time};
            socket.current.send(JSON.stringify(messageObject));
            setMessage("");
        } else {
            console.log("Message not sent. Could authenticate user.")
        }   
    }

    return (
        <div>
            <form onSubmit={e => onMessageSubmit(e)}>
                <input
                type="text"
                placeholder={'Enter message...'}
                value={message}
                onChange={e => setMessage(e.target.value)}
                />
                <input type="submit" value={'Send'} />
            </form>
            <div className="chatbox">
                {messages.map((message, index) => <ChatMessage key={index} name={message.author} message={message.content} timestamp={message.timestamp}/>)}
            </div>
        </div>
    );
}

export default Chat