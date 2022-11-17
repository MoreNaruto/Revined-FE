import axios, {AxiosPromise, AxiosResponse} from 'axios';

const baseApiUrl = process.env.BASE_API_URL;

interface CSRFTokenResponse {
    token: string
    parameterName: string
    headerName: string
}

// Add CSRF for all endpoint: https://devdojo.com/ketonemaniac/doing-spring-securitys-csrf-tokens-the-right-way-with-react
export function post(path: string, data: any, cookie: string): AxiosPromise {
    return axios.get(`${baseApiUrl}/csrf`, {
        headers: {
            'User-Rackd-Cookie': cookie,
            'Access-Control-Allow-Origin': "http://localhost:8080 https://www.rackd.io https://re10shon-backend.herokuapp.com"
        }
    })
        .then((tokenResp: AxiosResponse<CSRFTokenResponse>) => {
            const config = {
                headers: {
                    'X-XSRF-TOKEN': tokenResp.data.token,
                    'Content-Type': "application/json",
                    'Authorization': "Bearer " + localStorage.getItem("token") ?? "",
                    'User-Rackd-Cookie': cookie
                },

            };
            return axios.post(`${baseApiUrl}${path}`, JSON.stringify(data), config);
        })
}
