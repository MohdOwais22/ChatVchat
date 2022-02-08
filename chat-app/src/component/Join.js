import React, { useState } from 'react';
import './Join.css';
import logo from './logo.png';
import { Link } from 'react-router-dom';

let user;


const Join = () => {

   
   
    const [name,setName] = useState('');
    console.log(name);

    const sendUser = () =>{
        user = document.getElementById('JoinInput').value;
        document.getElementById('JoinInput').value = '';
    }
    
    
    
  return (
    
  <div className='JoinPage'>
    <div className='Join-container'>
    <img src={logo} alt="logo"
    />
    <h1>Chat Chat</h1>
    <input value={name} onChange={event => setName(event.target.value)} type="text" id='JoinInput' placeholder='Enter Your Name'/> 
   <Link onClick={event => !name?event.preventDefault():null} to="./chat"><button onClick={sendUser} id='JoinBtn'>Join Chat</button> </Link>   
    </div> 
  </div>
  )
};

export default Join;
export {user};
