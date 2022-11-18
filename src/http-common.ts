import axios, {AxiosPromise, AxiosResponse} from 'axios';

const baseApiUrl = process.env.BASE_API_URL;
const environment = process.env.NODE_ENV;

interface CSRFTokenResponse {
    token: string
    parameterName: string
    headerName: string
}

axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("token") ?? "";
axios.defaults.headers.common['Content-Type'] = "application/json";
axios.defaults.headers.common['Accept'] = "application/json";
axios.defaults.headers.common['Origin'] = environment == "local" ? "http://localhost:8080" : "https://www.rackd.io";

// Add CSRF for all endpoint: https://devdojo.com/ketonemaniac/doing-spring-securitys-csrf-tokens-the-right-way-with-react
export function post(path: string, data: any, cookie: string): AxiosPromise {
    return axios.get(`${baseApiUrl}/csrf`)
        .then((tokenResp: AxiosResponse<CSRFTokenResponse>) => {
            const config = {
                headers: {
                    'X-XSRF-TOKEN': tokenResp.data.token,
                    'User-Rackd-Cookie': cookie
                },

            };
            return axios.post(`${baseApiUrl}${path}`, JSON.stringify(data), config);
        })
}
