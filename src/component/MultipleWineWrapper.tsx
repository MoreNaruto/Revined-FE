import styled from '@emotion/styled';
import React, {useState} from 'react';
import {Credentials, LoginResponse, loginUser} from "../api/login";
import {AxiosError} from "axios";
import {FormControl, InputLabel, NativeSelect} from "@mui/material";
import {addWine, WineRequest} from "../api/wine";
import useToken from "../hook/useToken";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MissingFields = styled.p`
  display: flex;
  color: red;
`;

const SuccessMessage = styled.p`
  display: flex;
  color: green;
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
    const [isSuccessful, setSuccessful] = useState<boolean>(false);
    const {token} = useToken();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const wineRequest: WineRequest = {
            name: name ?? "",
            description: description ?? "",
            alohaCode: alohaCode ?? "",
            color: color ?? "",
            producer: producer ?? "",
            vintage: vintage ?? "",
            grapes: grapes ?? [],
            aromas: aromas ?? [],
            effervescence: effervescence ?? "",
            country: country ?? "",
            region: region ?? "",
            subRegion: subRegion ?? "",
            farmingPractices: farmingPractices ?? "",
            body: body ?? "",
            photoLink: photoLink ?? "",
            foodPairing: foodPairing ?? []
        };

        await addWine(wineRequest)
            .then(_ => {
                setError(false);
                setSuccessful(true);
            }).catch((err: AxiosError) => {
                console.log(err.message);
                setError(true);
                setSuccessful(false);
            })
    };

    const getYear = (): number[] => {
        const minOffset: number = 0;
        const maxOffset: number = 200;
        const thisYear: number = (new Date()).getFullYear();
        const years: number[] = [];

        for (let i = minOffset; i <= maxOffset; i++) {
            years.push(thisYear - i);
        }

        return years
    }

    const getArrayOfStringsByNextLine = (value: string): string[] => {
        return value.split("\n");
    }

    return (
        <Layout>
            {!token && <p>Please login in order to add a new wine</p>}
            {token &&
            <div>
                <h2>Add new wine</h2>
                {isError && <MissingFields>The fields name, producer, and year needs to be populated</MissingFields>}
                {isSuccessful && <SuccessMessage>Successfully added new wine!</SuccessMessage>}
                <form onSubmit={handleSubmit}>
                    <label>
                        <p>* Name of wine</p>
                        <input type="text" onChange={(e) => setName(e.target.value)}/>
                    </label>
                    <label>
                        <p>Describe the wine</p>
                        <textarea onChange={(e) => setDescription(e.target.value)}/>
                    </label>
                    <label>
                        <p>* Name of producer</p>
                        <input type="text" onChange={(e) => setProducer(e.target.value)}/>
                    </label>
                    <FormControl fullWidth>
                        <InputLabel variant="standard" htmlFor="wine-year-dropdown">
                            * Select a Year wine was produced
                        </InputLabel>
                        <NativeSelect
                            defaultValue={2022}
                            inputProps={{
                                name: 'year',
                                id: 'wine-year-dropdown',
                            }}
                            onChange={(e) => setVintage(e.target.value)}
                        >
                            {getYear().map((year: number, index: number) => {
                                return (<option key={`${year}-${index}`} value={year}>{year}</option>)
                            })}
                        </NativeSelect>
                    </FormControl>
                    <label>
                        <p>Color</p>
                        <input type="text" onChange={(e) => setColor(e.target.value)}/>
                    </label>
                    <label>
                        <p>Aloha Code</p>
                        <input type="text" onChange={(e) => setAlohaCode(e.target.value)}/>
                    </label>
                    <label>
                        <p>Grapes in the wine (skip line for each different grape)</p>
                        <textarea onChange={(e) => setGrapes(getArrayOfStringsByNextLine(e.target.value))}/>
                    </label>
                    <label>
                        <p>Different aromas (skip line for each aroma)</p>
                        <textarea onChange={(e) => setAromas(getArrayOfStringsByNextLine(e.target.value))}/>
                    </label>
                    <label>
                        <p>Name of Effervescence</p>
                        <input type="text" onChange={(e) => setEffervescence(e.target.value)}/>
                    </label>
                    <label>
                        <p>Name of Country of Origin</p>
                        <input type="text" onChange={(e) => setCountry(e.target.value)}/>
                    </label>
                    <label>
                        <p>Name of Region of Origin</p>
                        <input type="text" onChange={(e) => setRegion(e.target.value)}/>
                    </label>
                    <label>
                        <p>Name of Sub-Region of Origin</p>
                        <input type="text" onChange={(e) => setSubRegion(e.target.value)}/>
                    </label>
                    <label>
                        <p>What are the farming practices</p>
                        <textarea onChange={(e) => setFarmingPractices(e.target.value)}/>
                    </label>
                    <label>
                        <p>Describe the body of wine</p>
                        <textarea onChange={(e) => setBody(e.target.value)}/>
                    </label>
                    <label>
                        <p>Provide link of photo</p>
                        <input type="text" onChange={(e) => setPhotoLink(e.target.value)}/>
                    </label>
                    <label>
                        <p>What are the best foods to pair this with? (skip line for each food)</p>
                        <textarea onChange={(e) => setFoodPairing(getArrayOfStringsByNextLine(e.target.value))}/>
                    </label>
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
            }
        </Layout>
    );
};

export default MultipleWineWrapper;