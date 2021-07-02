import fetch, { Response } from 'node-fetch'
import { GameFromJSON } from '../models/Game';
import { PostFromJSON } from '../models/Post';

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