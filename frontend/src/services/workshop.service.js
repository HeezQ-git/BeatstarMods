import axios from 'axios';

const workshopService = {
    uploadSong: (data) => axios.post('/api/workshop/upload-song', data),
};

export { workshopService };
