import axios, {AxiosPromise, AxiosResponse} from 'axios';

const baseApiUrl = process.env.BASE_API_URL;
const environment = process.env.NODE_ENV;

interface CSRFTokenResponse {
    token: string
    parameterName: string
    headerName: string
}

axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("token") ?? "";
axios.defaults.headers.common['Accept'] = "application/json";
axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*";
axios.defaults.headers.common['Access-Control-Max-Age'] = 600;

// Add CSRF for all endpoint: https://devdojo.com/ketonemaniac/doing-spring-securitys-csrf-tokens-the-right-way-with-react
export function post(path: string, data: any, cookie: string): AxiosPromise {
    return axios.get(`${baseApiUrl}/csrf`, {
        headers: {
            'Content-Type': "application/x-www-form-urlencoded"
        }
    })
        .then((tokenResp: AxiosResponse<CSRFTokenResponse>) => {
            const config = {
                headers: {
                    'Content-Type': "application/json",
                    'X-XSRF-TOKEN': tokenResp.data.token,
                    'User-Rackd-Cookie': cookie
                },

            };
            return axios.post(`${baseApiUrl}${path}`, JSON.stringify(data), config);
        })
}
