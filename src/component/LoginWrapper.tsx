import styled from '@emotion/styled';
import React, { useState } from 'react';
import { AxiosError } from 'axios';
import { Credentials, LoginResponse, loginUser } from '../api/login';

interface Props {
    setToken: (token: string) => void
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InvalidCredentials = styled.p`
  display: flex;
  color: red;
`;

const SuccessMessage = styled.p`
  display: flex;
  color: green;
`;

const LoginWrapper = ({ setToken }: Props) => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [isError, setError] = useState<boolean>(false);
  const [isSuccessful, setSuccessful] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const credentials: Credentials = {
      email: email ?? '',
      password: password ?? '',
    };
    await loginUser(credentials)
      .then((response: LoginResponse) => {
        setError(false);
        setSuccessful(true);
        setToken(response.token);
      })
      .catch((err: AxiosError) => {
        console.log(err.message);
        setError(true);
        setSuccessful(false);
      });
  };
  return (
        <Layout>
            <h2>Please Log In</h2>
            {isError && <InvalidCredentials>Credentials are invalid. Please enter correct credentials</InvalidCredentials>}
            {isSuccessful && <SuccessMessage>Successfully logged in!</SuccessMessage>}
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Email</p>
                    <input type="text" onChange={(e) => setEmail(e.target.value)}/>
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" onChange={(e) => setPassword(e.target.value)}/>
                </label>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </Layout>
  );
};

export default LoginWrapper;
