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
    title: string,
    server: string,
    playerName: string,
    purpose: string,
    vcUse: string,
    device: string,
    comment: string,
    tags: string[],
    deleteKey: string,
    userData?: {
        ipAddr: string,
        userAgent: string
    }
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
        title: '',
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
        if(!tagId) {
            return;
        }
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

    const postApi = (query: PostQuery) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/api/post');
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = () => {
            console.log(xhr.status);
        };
        xhr.onerror = () => {
            console.error(xhr.status);
        };
        xhr.send(JSON.stringify(query))
    }

    const queryValidation = (query: PostQuery) => {
        if(!query.gameId) {
            return false;
        }

        if(!query.playerName) {
            return false;
        }

        if(!query.purpose) {
            return false;
        }

        if(!query.vcUse) {
            return false;
        }

        if(!query.device) {
            return false
        }

        if(!query.comment) {
            return false;
        }
        return true;        
    }

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
                        <button key={v} onClick={(e)=> tagDelete(v)} className={styles.minibtn}>
                            <div>{convertTags(v as PostTagsEnum)}</div>
                            <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                        </button>
                    ))
                }
            </div>
            <hr className={styles.hr}/>
            <div className={styles.item}>
                <label>タイトル</label>
                <input 
                 placeholder="この投稿のタイトルを記載"
                 maxLength={20} onChange={(e)=>setQuery({...query, title: e.target.value})}></input>
            </div>
            <div className={styles.item}>
                <label>サーバ</label>
                <input 
                 placeholder="例:Asia/Ship2/Gaia"
                 maxLength={15} onChange={(e)=>setQuery({...query, server: e.target.value})}></input>
            </div>
            <div className={styles.item}>
                <label>名前</label>
                <input 
                  placeholder="ニックネーム等"
                  maxLength={15} onChange={(e)=>setQuery({...query, playerName: e.target.value})}></input>
            </div>
            <div className={styles.item}>
                <label>環境</label>
                <input 
                  placeholder="例:PC,PS4,PS5,スマホ"
                  maxLength={15} onChange={(e)=>setQuery({...query, device: e.target.value})}></input>
            </div>
            <div className={styles.item}>
                <label>削除キー</label>
                <input 
                  placeholder="投稿を後で消す際に使用"
                  maxLength={15} onChange={(e)=>setQuery({...query, deleteKey: e.target.value})}></input>
            </div>
            <hr className={styles.hr}/>
            <div className={styles.textarea}>
                <textarea
                    maxLength={300}
                    placeholder="このサービスに連絡を取る方法はございません。必ず連絡手段を記入しましょう。住所、性別など、個人情報の記載はお避けください。&#13;削除キーを入力しなかった場合は削除することができなくなりますので注意してください。&#13;※投稿データは1ヶ月程度で自動削除されます。" 
                    onChange={(e) => setQuery({...query, comment: e.target.value})}>
                </textarea>
            </div>
            <hr className={styles.hr}/>
            <div className={styles.postbtn}>
                <button className={styles.btnbase} onClick={(e) => {
                    e.preventDefault;
                    if(queryValidation(query)) {
                        postApi(query);
                    }
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
                    <span>投稿</span>
                </button>
            </div>   
        </div>
    )
}

export default PostTab;
