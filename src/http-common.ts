import axios, {AxiosPromise, AxiosResponse} from 'axios';

const baseApiUrl = process.env.BASE_API_URL;

interface CSRFTokenResponse {
    token: string
    parameterName: string
    headerName: string
}

// Add CSRF for all endpoint: https://devdojo.com/ketonemaniac/doing-spring-securitys-csrf-tokens-the-right-way-with-react
export function post(path: string, data: any, cookie: string): AxiosPromise {
    return axios.get(`/csrf`)
        .then((tokenResp: AxiosResponse<CSRFTokenResponse>) => {
            const config = {
                headers: {
                    'Content-Type': "application/json",
                    'X-XSRF-TOKEN': tokenResp.data.token,
                    'User-Rackd-Cookie': cookie,
                    'Authorization': "Bearer " + localStorage.getItem("token") ?? ""
                },

            };
            return axios.post(`${baseApiUrl}${path}`, JSON.stringify(data), config);
        })
}
