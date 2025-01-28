import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
} from '@mui/material';
import styles from './SignUp.module.css';
import { Link } from 'react-router-dom';
import authAPI from '../services/API/authAPI';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    country: '',
    city: '',
    state: '',
    gender: '',
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name || formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    
    // if (!formData.mobile || !/^[0-9]{10}$/.test(formData.mobile)) {
    //   newErrors.mobile = 'Mobile number must be 10 digits';
    // }
    
    // if (!formData.password || formData.password.length < 8 || 
    //     !/[a-zA-Z]/.test(formData.password) || !/[0-9]/.test(formData.password)) {
    //   newErrors.password = 'Password must be at least 8 characters and contain letters and numbers';
    // }
    
    if (!formData.country) newErrors.country = 'Country is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    if (validateForm()) {
      try {
        let result = await authAPI.register(formData);
        let response = await result;
        console.log('response', response);
      } catch (error) {
        console.error('Signup failed:', error);
        if (error.response?.data?.message) {
          setApiError(error.response.data.message);
        } else {
          setApiError('Registration failed. Please try again.');
        }
      }
    }
  };

  return (
    <div className={styles.splitScreen}>
      <div className={styles.leftSide}>
        <div className={styles.imageOverlay}></div>
      </div>
      
      <div className={styles.rightSide}>
        <div className={styles.signupContainer}>
          <Typography variant="h4" align="center" className={styles.title}>
            Sign Up
          </Typography>
          
          {apiError && (
            <Typography color="error" align="center" style={{ marginBottom: '1rem' }}>
              {apiError}
            </Typography>
          )}

          <form onSubmit={handleSubmit} className={styles.form}>
            <TextField
              fullWidth
              name="name"
              label="Name"
              value={formData.name}
              onChange={handleChange}
              error={Boolean(errors.name)}
              helperText={errors.name}
              className={styles.formField}
            />

            <TextField
              fullWidth
              name="email"
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={Boolean(errors.email)}
              helperText={errors.email}
              className={styles.formField}
            />

            <TextField
              fullWidth
              name="mobile"
              label="Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
              error={Boolean(errors.mobile)}
              helperText={errors.mobile}
              className={styles.formField}
            />

            <TextField
              fullWidth
              name="password"
              label="Password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              error={Boolean(errors.password)}
              helperText={errors.password}
              className={styles.formField}
            />

            <TextField
              fullWidth
              name="country"
              label="Country"
              value={formData.country}
              onChange={handleChange}
              error={Boolean(errors.country)}
              helperText={errors.country}
              className={styles.formField}
            />

            <TextField
              fullWidth
              name="city"
              label="City"
              value={formData.city}
              onChange={handleChange}
              error={Boolean(errors.city)}
              helperText={errors.city}
              className={styles.formField}
            />

            <TextField
              fullWidth
              name="state"
              label="State"
              value={formData.state}
              onChange={handleChange}
              error={Boolean(errors.state)}
              helperText={errors.state}
              className={styles.formField}
            />

            <FormControl fullWidth className={styles.formField}>
              <InputLabel>Gender</InputLabel>
              <Select
                name="gender"
                value={formData.gender}
                label="Gender"
                onChange={handleChange}
                error={Boolean(errors.gender)}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
              {errors.gender && (
                <Typography color="error" variant="caption">
                  {errors.gender}
                </Typography>
              )}
            </FormControl>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              className={styles.submitButton}
            >
              Sign Up
            </Button>
          </form>
          
          <p>
            Already have an account? <Link to="/">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
