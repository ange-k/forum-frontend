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
        gameId: 'pso2ngs',
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
                        games.map((game) => (
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
                <label>VC</label>
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
                <label>タグ検索</label>
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
                        <span key={v}>
                            {convertTags(v as PostTagsEnum)}
                            <button onClick={(e)=> tagDelete(v)}>X</button>
                        </span>
                    ))
                }
            </div>
            
            <hr className={styles.hr}/>
            <span className={styles.label}>フリーワード検索</span>
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
                <button onClick={(e) => {
                    e.preventDefault;
                    search(query);
                }}>検索</button>
            </div>
        </div>
    )
}

export default SearchTab;