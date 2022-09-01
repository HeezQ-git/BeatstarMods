import axios from 'axios';

const userService = {
    saveConfig: (data) => axios.post('/api/user/save-config', data),
    getConfig: ({ configId }) => axios.get('/api/user/get-config', { configId }),
    getConfigs: () => axios.get('/api/user/get-configs'),
    deleteConfig: (data) => axios.post('/api/user/delete-config', data),
};

export { userService };
