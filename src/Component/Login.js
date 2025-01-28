import React, { useState } from 'react';
import {TextField, Button, Alert} from '@mui/material';
// import LoginImage from '../assets/login.jpg';
import LoginImage from '../assets/login.jpg';
import styles from './Login.module.css';
import { Link, useNavigate } from 'react-router-dom';
import authAPI from '../services/API/authAPI';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async() => {
      try{  
        setError(''); // Clear any previous errors
        let result = await authAPI.login(email,password);
        console.log('result', result);
        navigate('/dashboard'); // Redirect to dashboard after successful login
      }catch(error){
        console.log('error', error);
        setError(error.message || 'Login failed. Please try again.');
      }
    }

    return (
      <div className={styles.loginContainer}>
          <div className={styles.images}>
              <img src={LoginImage} alt="login" />
          </div>
          <div className={styles.form}>
              <h1>Task Management</h1>
              <h2>Login</h2>
              {error && (
                <Alert severity="error" sx={{ mb: 2, width: '100%' }}>
                  {error}
                </Alert>
              )}
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
