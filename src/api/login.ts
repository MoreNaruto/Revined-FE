import { AxiosResponse } from 'axios';
import { post } from '../http-common';

export interface Credentials {
    email: string
    password: string
}

export interface LoginResponse {
    token: string
    refreshToken: string
}

export async function loginUser(credentials: Credentials): Promise<LoginResponse> {
  return post('/authenticate', credentials)
    .then((res: AxiosResponse<LoginResponse>) => {
        return res.data
    });
}
