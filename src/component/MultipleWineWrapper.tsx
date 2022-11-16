import styled from '@emotion/styled';
import React, { useState } from 'react';
import {Credentials, LoginResponse, loginUser} from "../api/login";
import {AxiosError} from "axios";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MissingFields = styled.p`
  display: flex;
  color: red;
`;

const MultipleWineWrapper = () => {
    const [name, setName] = useState<string>();
    const [description, setDescription] = useState<string>();
    const [alohaCode, setAlohaCode] = useState<string>();
    const [color, setColor] = useState<string>();
    const [producer, setProducer] = useState<string>();
    const [vintage, setVintage] = useState<string>();
    const [grapes, setGrapes] = useState<string[]>();
    const [aromas, setAromas] = useState<string[]>();
    const [effervescence, setEffervescence] = useState<string>();
    const [country, setCountry] = useState<string>();
    const [region, setRegion] = useState<string>();
    const [subRegion, setSubRegion] = useState<string>();
    const [farmingPractices, setFarmingPractices] = useState<string>();
    const [body, setBody] = useState<string>();
    const [photoLink, setPhotoLink] = useState<string>();
    const [foodPairing, setFoodPairing] = useState<string[]>();
    const [isError, setError] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const credentials: Credentials = {
            email: email ?? '',
            password: password ?? '',
        };
        await loginUser(credentials)
            .then((response: LoginResponse) => {
                setError(false);
                setToken(response.token);
            })
            .catch((err: AxiosError) => {
                console.log(err.message);
                setError(true);
            });
    };
    return (
        <Layout>
            <h2>Please Log In</h2>
            {isError && <MissingFields>There are some fields missing</MissingFields>}
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Name of wine</p>
                    <input type="text" onChange={(e) => setName(e.target.value)}/>
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
}

export default MultipleWineWrapper;