import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'

import Search, { SearchQuery } from '../components/search'
import Card from '../components/card'
import {getGames, findPosts} from '../lib/gen/api/forum'
import { Game } from '../lib/gen/models/Game'
import { InferGetServerSidePropsType } from 'next'
import { Post } from '../lib/gen/models/Post'
import GameToPosts from '../lib/gen/models/GameToPosts'

import React, { useState } from 'react';

export const getServerSideProps = async () => {
  const games:Game[] = await getGames()

  const gameToPosts:GameToPosts[] = await games.reduce<Promise<Array<GameToPosts>>>(async (resultPromise, game:Game) => {
    const result = await resultPromise
    const post:Post[] = await findPosts(game.idName)
    result.push({
      key: game.idName,
      name: game.viewName,
      posts: post.sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime())
    })
    return result
  }, Promise.resolve(new Array<GameToPosts>()))
  return {
    props: {
      games,
      gameToPosts
    },
  }
}

export default function Home({ games, gameToPosts }:InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [gamesOrigin] = useState(games)
  const [gameToPostsOrigin] = useState(gameToPosts)

  const init = (gameToPosts:GameToPosts[]) => gameToPosts.flatMap((gameToPost) => {
    return {
      key: gameToPost.key,
      name: gameToPost.name,
      posts: gameToPost.posts.slice(0, 20)
    } as GameToPosts
  }) // 各ポストデータの先頭20個ずつ
  const [viewPosts, setViewPosts] = useState(init(gameToPosts))
  // サーチコンポーネントから実行される検索処理
  const search = ((query: SearchQuery) => {
    console.log(query);
    try {
      let gameToPost = gameToPosts.filter((m) => m.key === query.gameId)[0].posts
      if(query.purpose) {
        gameToPost = gameToPost.filter((m) => m.purpose === query.purpose)
      }
      setViewPosts([{
        key: query.gameId,
        name: games.filter((g) => g.idName === query.gameId)[0].viewName,
        posts: gameToPost
      }])
    } catch(error) {
      console.error(error);
    }
  });
  return (  
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title> 
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Kosugi+Maru&display=swap" rel="stylesheet"/>
      </Head>
      <Search games={games} search={search}/>
      <main className={styles.main}>
        {viewPosts.map(gameToPost => (
            gameToPost.posts.map(post => (
              <Card key={post.uuid} gameName={gameToPost.name} post={post}/>
            ))
        ))}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
