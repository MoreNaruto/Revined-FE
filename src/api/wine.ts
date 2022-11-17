import {post} from "../http-common";

export interface WineRequest {
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

export async function addWine(req: WineRequest, cookie: string): Promise<any> {
    return post("/wine/add", req, cookie)
}