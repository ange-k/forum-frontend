import { useState } from 'react';
import { Game } from '../lib/gen/models/Game';
import { PostPurposeEnum, PostTagsEnum, PostVcUseEnum } from '../lib/gen/models/Post';
import { convertTags, proposes, tags, vcuses } from '../lib/helper/genHelper';
import styles from '../styles/PostTab.module.scss'

type postProps = ({
    games: Game[],
    windowActive: boolean,
    windowVisble: boolean,
})

export interface PostQuery {
    gameId: string,
    server: string,
    playerName: string,
    purpose: string,
    vcUse: string,
    device: string,
    comment: string,
    tags: string[],
    deleteKey: string,
}

const PostTab:React.FC<postProps> = ({games, windowActive, windowVisble}) => {
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

    // Tagの付与は5個まで
    const [disableTagSelect, setDisableTagSelect] = useState(false)

    const [query, setQuery] = useState({
        gameId: 'pso2ngs',
        server: '',
        playerName: '',
        purpose: PostPurposeEnum.Play,
        vcUse: PostVcUseEnum.Either,
        device: '',
        comment: '',
        tags: [],
        deleteKey: ''
    } as PostQuery)

    // 検索タグの設定
    const tagSelect = ((tagId:string) => {
        const include = query.tags?.includes(tagId)
        if(query.tags.length > 4) {
            setDisableTagSelect(true);
            return
        }
        if(!include) {
            setQuery(query => ({...query, tags: [...query.tags, tagId]}))
            if(query.tags.length === 4) {
                setDisableTagSelect(true);
            }
            return
        }
    })
    const tagDelete = ((tagId:string) => {
        setQuery(query => ({...query, tags: query.tags.filter((t) => t !== tagId)}))
        setDisableTagSelect(false);
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
                <label>タグ選択</label>
                <select disabled={disableTagSelect} onChange={(e) => tagSelect(e.target.value)}>
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
            <div className={styles.item}>
                <label>サーバ</label>
                <input onChange={(e)=>setQuery({...query, server: e.target.value})}></input>
            </div>
            <div className={styles.item}>
                <label>名前</label>
                <input onChange={(e)=>setQuery({...query, playerName: e.target.value})}></input>
            </div>
            <hr className={styles.hr}/>
            <div className={styles.textarea}>
                <textarea onChange={(e) => setQuery({...query, comment: e.target.value})}>
                </textarea>
            </div>
            <hr className={styles.hr}/>
            <div className={styles.postbtn}>
                <button onClick={(e) => {
                    e.preventDefault;
                }}>送信</button>
            </div>   
        </div>
    )
}

export default PostTab;
