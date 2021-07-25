import { InferGetServerSidePropsType } from "next"
import { getGames } from "../lib/gen/api/forum"
import { Game } from "../lib/gen/models/Game"

import PostPage from "../components/post"

export const getStaticProps = async () => {
    const games:Game[] = await getGames()

    return {
        props: {
            games
        },
        revalidate: 60,
    }
}

export default function Post({ games }:InferGetServerSidePropsType<typeof getStaticProps>) {

    return (
        <PostPage games={games}/>
    )
}