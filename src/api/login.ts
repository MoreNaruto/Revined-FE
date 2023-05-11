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

export async function loginUser(credentials: Credentials, cookie: string): Promise<LoginResponse> {
  return post('/authenticate', credentials, cookie)
    .then((res: AxiosResponse<LoginResponse>) => res.data);
}
