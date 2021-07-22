import React, { useState } from 'react';
import { Game } from '../lib/gen/models/Game';
import styles from '../styles/Window.module.scss'
import SearchTab from './searchTab';

type WindowProps = ({
    games: Game[],
    search: (query: SearchQuery) => void
})

export interface SearchQuery {
    gameId: string,
    vcUse: string,
    tags: string[],
    selfTags: string[],
    playTime: string[],
    purpose?: string,
    serverName?: string,
    device?: string,
    playerName?: string,
}

const Window:React.FC<WindowProps> = ({games, search}) => {

    // Search実行時にわたすサーチクエリ
    const [query, setQuery] = useState({
        gameId: 'genshin',
        vcUse: '',
        tags: [],
        selfTags: [],
        playTime: [],
    } as SearchQuery)

    // サーチウィンドウの表示状態
    const [windowVisble, setWindowVisible] = useState(false)
    const clickViewBtn = (event:React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setWindowVisible(!windowVisble);
    }

    return (
        <div>
            <div className={styles.sidebar}>
                <button className={styles.icon}
                    onClick={clickViewBtn}>
                        <span className={styles.preicon}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0z" fill="none"/><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
                        </span>
                </button>
            </div>
            { /* 検索ウィンドウ */}
            <div className={windowVisble ? `${styles.container}` : `${styles.container} ${styles.invisible}`}>
                <div className={styles.modal}>
                    <ul className={styles.tab}>
                        <li className={styles.menu}>
                            <div className={styles.svgtab}>
                                <span>投稿を検索</span>
                            </div>
                            <div className={styles.searchbtn}>
                                <button className={styles.btnbase} onClick={(e) => {
                                    e.preventDefault;
                                    search(query);
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0z" fill="none"/><path d="M20 19.59V8l-6-6H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c.45 0 .85-.15 1.19-.4l-4.43-4.43c-.8.52-1.74.83-2.76.83-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5c0 1.02-.31 1.96-.83 2.75L20 19.59zM9 13c0 1.66 1.34 3 3 3s3-1.34 3-3-1.34-3-3-3-3 1.34-3 3z"/></svg>
                                    <span>検索</span>
                                </button>
                            </div>
                        </li>
                        <div className={styles.control}>
                        </div>
                    </ul>

                    <SearchTab 
                        games={games} 
                        query={query}
                        setQuery={(query: SearchQuery) => setQuery(query)}/>
                </div>
            </div>
        </div>
    )
}

export default Window;