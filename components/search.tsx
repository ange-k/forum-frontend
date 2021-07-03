import React, { useState } from 'react';
import { Game } from '../lib/gen/models/Game';
import { PostPurposeEnum, PostTagsEnum, PostVcUseEnum } from '../lib/gen/models/Post';
import { convertPropose, convertTags, convertVcUse } from '../lib/helper/genHelper';
import styles from '../styles/Search.module.scss'

type SearchProps = ({
    games: Game[],
    search: (query: SearchQuery) => void
})

const proposes = () => {
    const enums = Object.entries(PostPurposeEnum)
    return enums.map((k, v) => {
        return {
            key: k[1],
            value: convertPropose(k[1])
        }
    })
}

const vcuses = () => {
    const enums = Object.entries(PostVcUseEnum)
    return enums.map((k, v) => {
        return {
            key: k[1],
            value: convertVcUse(k[1])
        }
    })
}

const tags = () => {
    const enums = Object.entries(PostTagsEnum)
    return enums.map((k, v) => {
        return {
            key: k[1],
            value: convertTags(k[1])
        }
    })
}

export interface SearchQuery {
    gameId: string,
    vcUse: string,
    tags: string[],
    purpose?: string,
    serverName?: string,
    playerName?: string,
}

const Search:React.FC<SearchProps> = ({games, search}) => {
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
    

    // サーチウィンドウの選択状態
    const [windowActive, setWindowActive] = useState(false)
    const overMouse = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        setWindowActive(true)
    }
    const leaveMouse = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        setWindowActive(false)
    }
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

    // サーチウィンドウの表示状態
    const [windowVisble, setWindowVisible] = useState(true)
    const clickViewBtn = (event:React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setWindowVisible(!windowVisble);
    }

    // サーチ, ポストのトグルスイッチ管理
    const [selectSearchTab, setSelectSearchTab] = useState(true)
    const clickSearch = (event: React.MouseEvent<HTMLLIElement>) => {
        event.preventDefault();
        setSelectSearchTab(true)
    }
    const clickPost = (event: React.MouseEvent<HTMLLIElement>) => {
        event.preventDefault();
        setSelectSearchTab(false)
    }

    const TabName = {
        SEARCH: 'search',
        POST: 'post'
    } as const;
    type TabName = typeof TabName[keyof typeof TabName];

    /**
     * windowVisible=falseのとき、引数のclassNameに.invisibleを追加して返す
     * selectSearchTabの値を見て、selectクラスの付与をトグルする
     * windowActiveの値を見て、activeクラスの付与をトグルする
     * @param className 
     * @returns 
     */
    const setTabClassName = (tabName:TabName, className: string) => {
        if(windowVisble === false) {
            return `${className} ${styles.invisible}`
        }

        let name = ''
        if(windowActive === true) {
            name = styles.active
        }

        if(tabName === TabName.SEARCH) {
            if(selectSearchTab) {
                name = `${name} ${styles.select}`
            }
        } else {
            if(!selectSearchTab) {
                name = `${name} ${styles.select}`
            }
        }

        return `${className} ${name}`
    }

    return (
        <div className={windowVisble ? `${styles.container}` : `${styles.container} ${styles.invisible}`}
            onMouseEnter={overMouse}
            onMouseLeave={leaveMouse}
        >
            <ul className={setActiveStatus(styles.tab)}>
                <li className={setTabClassName(TabName.SEARCH, styles.menu)}
                    onClick={clickSearch}
                >search</li>
                <li className={setTabClassName(TabName.POST, styles.menu)}
                    onClick={clickPost}
                >post</li>
                <div className={styles.control}>
                    <button onClick={clickViewBtn}>
                        {windowVisble ? '+' : '-'}
                    </button>
                </div>
            </ul>
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
                <hr/>
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
                
                <hr/>
                <span className={styles.label}>フリーワード検索</span>
                <div className={styles.item}>
                    <label>サーバ</label>
                    <input onChange={(e)=>setQuery({...query, serverName: e.target.value})}></input>
                </div>
                <div className={styles.item}>
                    <label>名前</label>
                    <input onChange={(e)=>setQuery({...query, playerName: e.target.value})}></input>
                </div>
                <hr/>
                <div className={styles.searchbtn}>
                    <button onClick={(e) => {
                        e.preventDefault;
                        search(query);
                    }}>Search</button>
                </div>
            </div>
        </div>
    )
}

export default Search