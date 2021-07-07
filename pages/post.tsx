import { InferGetServerSidePropsType } from "next"
import { getGames } from "../lib/gen/api/forum"
import { Game } from "../lib/gen/models/Game"

import PostPage from "../components/post"

export const getServerSideProps = async () => {
    const games:Game[] = await getGames()

    return {
        props: {
            games
        }
    }
}

export default function Post({ games }:InferGetServerSidePropsType<typeof getServerSideProps>) {

    return (
        <PostPage games={games}/>
    )
}