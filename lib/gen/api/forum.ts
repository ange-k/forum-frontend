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
    const response: Response = await fetch('http://localhost:8080/games', {});
    return (await responseParser(response)).map((o:Map<string, string>) => GameFromJSON(o))
}

export async function findPosts(gameId: string) {
    const response: Response = await fetch(`http://localhost:8080/games/${gameId}/posts`)
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
        const response: Response = await fetch(`http://localhost:8080/games/${query.gameId}/posts`, {
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
        const response = await fetch(`http://localhost:8080/posts/${uuid}`, {
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