import React, { useEffect, useState } from 'react';
import { user } from './Join';
import socketIo from 'socket.io-client';
import './Chat.css';
import Message from './Message';
import ReactScollToBottom from 'react-scroll-to-bottom';

const EDNPOINT = 'https://chat-v-chat.herokuapp.com/';

let socket;

const Chat = () => {
    const [id, setId] = useState('');
    const [messages, setMessages] = useState([]);

   const send = () => {
       const message = document.getElementById('chatInput').value;
       socket.emit('message', { message, id });
       document.getElementById('chatInput').value = " ";
   }
   console.log(messages);

    useEffect(() => {
         socket = socketIo(EDNPOINT, { transports: ['websocket']});
     socket.on('connect', () => {
        //  alert('connected');
         setId(socket.id);
     })
     console.log(socket);
     socket.emit('joined', { user })

     socket.on('welcome', (data) => {
         console.log(data.user, data.message);
         setMessages([...messages, data]);
     })

     socket.on('userJoined',(data) => {
         console.log(data.user, data.message);
         setMessages([...messages, data]); 
     })

     socket.on('leave', (data) => {
         console.log(data.user, data);
         setMessages([...messages, data]);
     })

     return () => {
       socket.emit('disconnect');
        socket.off();
     }
    

    }, []);

    useEffect(() => {
        socket.on('sendMessage',(data) => {
            setMessages([...messages, data]);
            console.log(data.user, data.message, data.id);
        })
        return () => {
            socket.off();
        }
    }, [messages])
    
  return(
       <div className='chatPage'>
    <div className='chatContainer'>
        <div className='header'>
            <h2>Chat Chat</h2>
            <a href="/">Close</a>
        </div>
        <ReactScollToBottom className='chatBox'>
           {messages.map((item, i) => 
               <Message user={item.id===id ? '' : item.user} message={item.message} classs={item.id===id ? 'right' : 'left'}/>
           )}
           
        </ReactScollToBottom>
        <div className='inputBox'>
        <input onKeyPress={(event) => event.key === 'Enter' ? send() : null} type="text" id="chatInput" />
            <button onClick={send} className='chatBtn'>Send</button>
        </div>
    </div>
  </div>)
};

export default Chat;
