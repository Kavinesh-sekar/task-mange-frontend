import axios from 'axios';
// require('dotenv').config();
const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

console.log('Backend API URL:', process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000');

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });
  


axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
  
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const refreshToken = localStorage.getItem('refreshToken');
          const { data } = await axios.post(
            process.env.REACT_APP_BACKEND_URL + '/api/auth/refresh-token',
            { refreshToken }
          );
          localStorage.setItem('accessToken', data.accessToken);
          originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;
          return axiosInstance(originalRequest);
        } catch (err) {
          console.error('Refresh token failed:', err);
          
         
          if (err.response?.data?.error === 'TokenExpiredError' || 
              err.response?.status === 401) {
            console.error('Refresh token expired - logging out');
          
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('userId');
            localStorage.removeItem('user');
            
            window.location.replace('/');
          }
          return Promise.reject(err);
        }
      }
  
      return Promise.reject(error);
    }
);
  
export default axiosInstance;
