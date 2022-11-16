import React from 'react';
import LoginWrapper from '../component/LoginWrapper';

interface Props {
    setToken: (token: string) => void
}

const Login = ({ setToken }: Props) => <LoginWrapper setToken={setToken}/>;

export default Login;
