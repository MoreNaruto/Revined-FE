import axios from 'axios';

const baseApiUrl = process.env.BASE_API_URL;

//Add CSRF for all endpoint: https://devdojo.com/ketonemaniac/doing-spring-securitys-csrf-tokens-the-right-way-with-react
export default axios.create({
    baseURL: `${baseApiUrl}/`,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});