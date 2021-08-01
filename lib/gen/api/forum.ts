import fetch, { Response } from 'node-fetch'
import { GameFromJSON } from '../models/Game';
import { PostFromJSON } from '../models/Post';

import { PostQuery } from '../../../components/post';

const responseParser = async (response: Response) => JSON.parse(await response.text())

export type ResponseData = {
    code: string,
    message: string
  }

export async function getGames() {
    const response: Response = await fetch(`${process.env.API_BATH_PATH}/games?apikey=${process.env.API_KEY}`, {});
    return (await responseParser(response)).map((o:Map<string, string>) => GameFromJSON(o))
}

export async function findPosts(gameId: string) {
    const response: Response = await fetch(`${process.env.API_BATH_PATH}/games/${gameId}/posts?apikey=${process.env.API_KEY}`)
    if(!response.ok) {
        return []
    }
    return (await responseParser(response)).map((o:Map<string, string>) => PostFromJSON(o))
}

export const savePost = async(query: PostQuery):Promise<ResponseData> => {
    // Tagsをオブジェクトに変換する
    const postData = {
        ...query,
        tags: query.tags.map((t) => {
            return { id: t }
        }),
        selfTags: query.selfTags.map((t) => { 
            return { id: t }
         }),
    }
    console.log(postData);
    try{
        const response: Response = await fetch(`${process.env.API_BATH_PATH}/games/${query.gameId}/posts?apikey=${process.env.API_KEY}`, {
            body: JSON.stringify(postData),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        });
        if(response.ok) {
            return {
                code: "OK",
                message: 'success'
            }
        }
        return await response.json();
    }catch (error) {
        console.error(error)
        return {
            code: "NG",
            message: "error"
        }
    }
}

export interface PostDeleteRequest {
    deleteKey: string,
    gameId: string,
    writeDay: string,
}

export const postDelete = async (request:PostDeleteRequest, uuid:string):Promise<ResponseData> => {
    try {
        const response = await fetch(`${process.env.API_BATH_PATH}/posts/${uuid}?apikey=${process.env.API_KEY}`, {
            body: JSON.stringify(request),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'DELETE'
        })
        console.log(response.status)
        if(response.status === 200) {
            return {
                code: "OK",
                message: 'success'
            }
        }
        return await response.json();

    } catch(error) {
        console.error(error)
        return {
            code: "NG",
            message: "error"
        }
    }
}