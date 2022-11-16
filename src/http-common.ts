import axios, {AxiosPromise, AxiosResponse} from 'axios';

const baseApiUrl = process.env.BASE_API_URL;

interface CSRFTokenResponse {
    token: string
    parameterName: string
    headerName: string
}

// Add CSRF for all endpoint: https://devdojo.com/ketonemaniac/doing-spring-securitys-csrf-tokens-the-right-way-with-react
export function post(path: string, data: any): AxiosPromise {
    return axios.get(`${baseApiUrl}/csrf`)
        .then((tokenResp: AxiosResponse<CSRFTokenResponse>) => {
            console.log(JSON.stringify(tokenResp.data.token))
            const config = {
                headers: {
                    'X-CSRF-TOKEN': tokenResp.data.token,
                    'Content-Type': "application/json",
                },

            };
            return axios.post(`${baseApiUrl}${path}`, JSON.stringify(data), config);
        })
}
