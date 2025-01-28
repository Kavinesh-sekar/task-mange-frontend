import api from './axiosInstance';

const authService = {
  async login(email, password) {
    try {
      const response = await api.post('/api/auth/login', {
        email,
        password,
      });
      console.log('response', response);
      const { token, refreshToken, user } = response.data;
      
      // Store tokens
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('user', JSON.stringify(user));
      
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async logout() {
    try {

      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      
      window.location.href = '/login';
    }
  },

  async register(userData) {
    console.log('userData', userData);
    const response = await api.post('/api/auth/register', userData);
    return response.data;
  },

 
};

export default authService;
