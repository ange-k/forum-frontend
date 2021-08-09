import Head from 'next/head'
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
        <div>
            <Head>
                <title>GamersHub | 投稿</title>
            </Head>
            <PostPage games={games}/>
        </div>
    )
}