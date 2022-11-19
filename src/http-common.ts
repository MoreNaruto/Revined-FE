import axios, {AxiosPromise, AxiosResponse} from 'axios';

interface CSRFTokenResponse {
    token: string
    parameterName: string
    headerName: string
}

// Add CSRF for all endpoint: https://devdojo.com/ketonemaniac/doing-spring-securitys-csrf-tokens-the-right-way-with-react
export function post(path: string, data: any, cookie: string): AxiosPromise {
    return axios.get(`/csrf`, {
        headers: {
            'User-Rackd-Cookie': cookie
        }
    })
        .then((tokenResp: AxiosResponse<CSRFTokenResponse>) => {
            const headers = {
                'Content-Type': "application/json",
                'X-XSRF-TOKEN': tokenResp.data.token,
                'User-Rackd-Cookie': cookie,
            };

            if (localStorage.getItem("token")) {
                Object.assign(headers, {'Authorization': "Bearer " + localStorage.getItem("token")})
            }
            const config = {
                headers: headers
            };
            return axios.post(`${path}`, JSON.stringify(data), config);
        })
}
