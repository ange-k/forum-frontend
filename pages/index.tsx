import Head from 'next/head'
import styles from '../styles/Home.module.scss'

import Window, { SearchQuery } from '../components/window'
import Card from '../components/card'
import {getGames, findPosts} from '../lib/gen/api/forum'
import { Game } from '../lib/gen/models/Game'
import { InferGetStaticPropsType } from 'next'
import { Post, PostPlayTimeEnum } from '../lib/gen/models/Post'
import GameToPosts from '../lib/helper/GameToPosts'
import Footer from '../components/footer'

import React, { useState } from 'react';
import { getGameName, playTimeIncludes } from '../lib/helper/genHelper'
import { TagsIdEnum } from '../lib/gen/models/Tags'

export const getStaticProps = async () => {
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
      gameToPosts,
      updateTime: new Date().toLocaleString('ja-JP', {timeZone: 'Asia/Tokyo'})
    },
    revalidate: 60,
  }
}

export default function Home({ games, gameToPosts, updateTime }:InferGetStaticPropsType<typeof getStaticProps>) {

  const init = (gameToPosts:GameToPosts[]) => gameToPosts.flatMap((gameToPost) => {
    return gameToPost.posts.slice(0, 20)
  }).sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()) // 各ポストデータの先頭20個ずつ

  const [viewPosts, setViewPosts] = useState(init(gameToPosts))

  // サーチコンポーネントから実行される検索処理
  const search = ((query: SearchQuery) => {
    try {
      // gameid
      let posts = gameToPosts.filter((m) => m.key === query.gameId)[0].posts
      // 目的
      if(query.purpose) {
        posts = posts.filter((m) => m.purpose === query.purpose)
      }
      // VC
      if(query.vcUse) {
        posts = posts.filter((m) => m.vcUse === query.vcUse)
      }
      // サーバ
      if(query.serverName) {
        posts = posts.filter((m) => {
          if(!m.server) {
            return false
          }
          return m.server.indexOf(query.serverName!) !== -1
        })
      }
      // player name
      if(query.playerName) {
        posts = posts.filter((m) => m.playerName.indexOf(query.serverName!) !== -1)
      }
      //device
      if(query.device) {
        posts = posts.filter((m) => m.device.indexOf(query.device!) !== -1)
      }
      // playtime
      if(query.playTime) {
        query.playTime.forEach((t) => {
          posts = posts.filter((post) => playTimeIncludes(post.playTime as PostPlayTimeEnum[], t as PostPlayTimeEnum))
        });
      }  
      // Tag
      if(query.tags) {
        query.tags.forEach((t) => {
          posts = posts.filter((post) => post.tags?.map((tag) => tag.id).includes(t as TagsIdEnum))
        })
      }
      // selfTag
      if(query.selfTags) {
        query.selfTags.forEach((t) => {
          posts = posts.filter((post) => post.selfTags?.map((tag) => tag.id).includes(t as TagsIdEnum))
        })
      }  
      setViewPosts(posts)
    } catch(error) {
      console.error(error);
    }
  });
  return (  
    <div className={styles.container}>
      <Head>
          <title>GamersHub | 投稿一覧</title>
      </Head>
      <div className={styles.contents}>
        <Window games={games} search={search}/>
        <main className={styles.main}>
          <div className={styles.buildtime}>更新日時:{updateTime}</div>
          {viewPosts.map(post => (
              <Card key={post.uuid} gameName={getGameName(games, post.gameId)} post={post}/>
          ))}
        </main>
      </div>
      <Footer></Footer>
    </div>
  )
}
