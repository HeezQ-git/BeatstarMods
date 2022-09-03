import axios from 'axios';

const userService = {
    saveConfig: (data) => axios.post('/api/user/save-config', data),
    getConfig: (data) => axios.post('/api/user/get-config', data),
    getConfigs: () => axios.get('/api/user/get-configs'),
    deleteConfig: (data) => axios.post('/api/user/delete-config', data),
    updateConfig: (data) => axios.post('/api/user/update-config', data),
};

export { userService };
