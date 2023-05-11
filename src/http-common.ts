import axios, { AxiosPromise, AxiosResponse } from 'axios';

interface CSRFTokenResponse {
    token: string
    parameterName: string
    headerName: string
}

export function post(path: string, data: any, cookie: string): AxiosPromise {
  return axios.get('/csrf', {
    headers: {
      'User-Rackd-Cookie': cookie,
    },
  }).then((tokenResp: AxiosResponse<CSRFTokenResponse>) => {
    const headers = {
      'Content-Type': 'application/json',
      'X-XSRF-TOKEN': tokenResp.data.token,
      'User-Rackd-Cookie': cookie,
    };

    if (localStorage.getItem('token')) {
      Object.assign(headers, { Authorization: `Bearer ${localStorage.getItem('token')}` });
    }
    const config = {
      headers,
    };
    return axios.post(`${path}`, JSON.stringify(data), config);
  });
}

export function get(path: string, cookie: string): AxiosPromise {
  return axios.get('/csrf', {
    headers: {
      'User-Rackd-Cookie': cookie,
    },
  }).then((tokenResp: AxiosResponse<CSRFTokenResponse>) => {
    const headers = {
      'Content-Type': 'application/json',
      'X-XSRF-TOKEN': tokenResp.data.token,
      'User-Rackd-Cookie': cookie,
    };

    if (localStorage.getItem('token')) {
      Object.assign(headers, { Authorization: `Bearer ${localStorage.getItem('token')}` });
    }
    const config = {
      headers,
    };
    return axios.get(`${path}`, config);
  });
}
