import axios from 'axios';

const loginService = {
    loginUser: (data) => axios.post('/api/login', data),
    registerUser: (data) => axios.post('/api/signup', data),
    checkUsername: (data) => axios.post('/api/check-username', data),
    checkEmail: (data) => axios.post('/api/check-email', data),
};

export { loginService };
