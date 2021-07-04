import React, { useState } from 'react';
import { Game } from '../lib/gen/models/Game';
import { PostPurposeEnum, PostTagsEnum, PostVcUseEnum } from '../lib/gen/models/Post';
import { convertPropose, convertTags, convertVcUse, proposes, tags, vcuses } from '../lib/helper/genHelper';
import styles from '../styles/SearchTab.module.scss'

type SearchProps = ({
    games: Game[],
    windowActive: boolean,
    windowVisble: boolean,
    search: (query: SearchQuery) => void,
})

export interface SearchQuery {
    gameId: string,
    vcUse: string,
    tags: string[],
    purpose?: string,
    serverName?: string,
    device?: string,
    playerName?: string,
}

const SearchTab:React.FC<SearchProps> = ({games, windowActive, windowVisble, search}) => {

    // 親のStateを使って表示状態の変更
    /**
     * windowVisible=falseのとき、引数のclassNameに.invisibleを追加して返す
     * windowActiveStatus=trueのとき、引数のclassNameに.activeを追加して返す
     * @param className
     * @returns className + .active
     */
    const setActiveStatus = (className: string) => {
        if(windowVisble === false) {
            return `${className} ${styles.invisible}`
        }
        if(windowActive === false) {
            return className;
        }
        return `${className} ${styles.active}`
    }

    // Search実行時にわたすサーチクエリ
    const [query, setQuery] = useState({
        gameId: 'genshin',
        vcUse: '',
        tags: [],
    } as SearchQuery)

    // 検索タグの設定
    const tagSelect = ((tagId:string) => {
        const include = query.tags?.includes(tagId)
        if(!include) {
            setQuery(query => ({...query, tags: [...query.tags, tagId]}))
            return
        }
    })
    const tagDelete = ((tagId:string) => {
        setQuery(query => ({...query, tags: query.tags.filter((t) => t !== tagId)}))
    })
    

    return (
        <div className={setActiveStatus(styles.window)}>
            <div className={styles.item}>
                <label>Game</label>
                <select onChange={(e)=> setQuery({...query, gameId: e.target.value})}>
                    {
                        games.sort((a,b) => {
                            if(a.idName<b.idName){
                                return -1;
                            }
                            if(a.idName>b.idName) {
                                return 1;
                            }
                            return 0;
                        }).map((game) => (
                            <option key={game.idName} value={game.idName}>{game.viewName}</option>
                        ))
                    }
                </select>
            </div>
            <div className={styles.item}>
                <label>目的</label>
                <select onChange={(e)=> setQuery({...query, purpose: e.target.value})}>
                    <option value="">未選択</option>
                    {
                        proposes().map((p) => (
                            <option key={p.key} value={p.key}>{p.value}</option>
                        ))
                    }
                </select>
            </div>
            <div className={styles.item}>
                <label>ボイスチャット</label>
                <select onChange={(e) => setQuery({...query, vcUse: e.target.value})}>
                    <option value="">未選択</option>
                    {
                        vcuses().map((v) => (
                            <option key={v.key} value={v.key}>{v.value}</option>
                        ))
                    }
                </select>
            </div>
            <hr className={styles.hr}/>
            <div className={styles.item}>
                <div className={styles.icon}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#ffffff"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/></svg>
                    <span>タグ検索</span>
                </div>

                <select onChange={(e) => tagSelect(e.target.value)}>
                    <option value="">未選択</option>
                    {
                        tags().map((v) => (
                            <option key={v.key} value={v.key}>{v.value}</option>
                        ))
                    }
                </select>
            </div>
            <div className={styles.tags}>
                {
                    query.tags.map((v) =>(
                        <button key={v} onClick={(e)=> tagDelete(v)} className={styles.minibtn}>
                            <div>{convertTags(v as PostTagsEnum)}</div>
                            <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                        </button>
                    ))
                }
            </div>
            
            <hr className={styles.hr}/>
            <span className={styles.label}>
                <div className={styles.icon}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#ffffff"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/></svg>
                    <span>フリーワード検索</span>
                </div>
            </span>
            <div className={styles.item}>
                <label>サーバ</label>
                <input onChange={(e)=>setQuery({...query, serverName: e.target.value})}></input>
            </div>
            <div className={styles.item}>
                <label>名前</label>
                <input onChange={(e)=>setQuery({...query, playerName: e.target.value})}></input>
            </div>
            <div className={styles.item}>
                <label>環境</label>
                <input onChange={(e)=>setQuery({...query, device: e.target.value})}></input>
            </div>
            <hr className={styles.hr}/>
            <div className={styles.searchbtn}>
                <button className={styles.btnbase} onClick={(e) => {
                    e.preventDefault;
                    search(query);
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
                    <span>検索</span>
                </button>
            </div>
        </div>
    )
}

export default SearchTab;