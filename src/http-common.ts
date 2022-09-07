import axios from 'axios';

const baseApiUrl = process.env.BASE_API_URL;

export default axios.create({
    baseURL: `${baseApiUrl}/`,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});