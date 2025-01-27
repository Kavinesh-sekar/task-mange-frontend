import React, { useState } from 'react';
import {TextField, Button} from '@mui/material';
// import LoginImage from '../assets/login.jpg';
import LoginImage from '../assets/login.jpg';
import styles from './Login.module.css';
import { Link } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        console.log(email,password);
    }
  return (
    <div className={styles.loginContainer}>
        <div className={styles.images}>
            <img src={LoginImage} alt="login" />
        </div>
        <div className={styles.form}>
            <h1>Task Management</h1>
            <h2>Login</h2>
            <div className={styles.inputData}>
                <TextField id="standard-basic" label="Email" variant="standard" onChange={(e)=>setEmail(e.target.value)}/>
                <TextField id="standard-basic" label="Password" variant="standard" onChange={(e)=>setPassword(e.target.value)}/>
                <Button variant="contained" onClick={handleLogin}>Login</Button>  
            </div>
            <p>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
        </div>
       
    </div>
  )
}

export default Login
