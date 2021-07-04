import fetch, { Response } from 'node-fetch'
import { GameFromJSON } from '../models/Game';
import { PostFromJSON } from '../models/Post';

import { PostQuery } from '../../../components/postTab';
import { ModelErrorFromJSON } from '../models/ModelError';

const responseParser = async (response: Response) => JSON.parse(await response.text())

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

export const savePost = async(query: PostQuery) => {
    const response: Response = await fetch(`http://localhost:8080/games/${query.gameId}/posts`, {
        body: JSON.stringify(query),
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST'
    });
    if(response.ok) {
        return {
            code: 200,
            message: 'success'
        }
    }
    console.error()
    return (await responseParser(response)).map((o:Map<string, string>) => ModelErrorFromJSON(o))

}