import {post, get} from "../http-common";
import {AxiosResponse} from "axios";

export interface Wine {
    uuid?: string
    name: string
    description: string
    alohaCode: string
    color: string
    producer: string
    vintage: string
    grapes: string[]
    aromas: string[]
    effervescence: string
    country: string
    region: string
    subRegion: string
    farmingPractices: string
    body: string
    photoLink: string
    foodPairing: string[]
}

export async function addWine(req: Wine, cookie: string): Promise<any> {
    return post("/wine/add", req, cookie)
}

export async function getAllWines(cookie: string): Promise<Wine[]> {
    return get("/wine/all", cookie)
        .then((resp: AxiosResponse<Wine[]>) => {
           return resp.data
        });
}

export async function deleteWine(wineId: string, cookie: string): Promise<any> {
    return get(`/wine/delete/${wineId}`, cookie)
}