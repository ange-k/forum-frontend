import { useState } from 'react';
import { Game } from '../lib/gen/models/Game';
import { PostPurposeEnum, PostTagsEnum, PostVcUseEnum } from '../lib/gen/models/Post';
import { convertTags, proposes, tags, vcuses } from '../lib/helper/genHelper';
import styles from '../styles/PostTab.module.scss'

import ReactTooltip from 'react-tooltip'
import React from 'react';

type postProps = ({
    games: Game[],
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

const PostPage:React.FC<postProps> = ({games}) => {

    // Tagの付与は5個まで
    const [disableTagSelect, setDisableTagSelect] = useState(false)

    const [query, setQuery] = useState({
        gameId: 'genshin',
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

        if(!query.title) {
            return false;
        }

        if(!query.playerName) {
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

    const [isTooltipVisible, setTooltipVisibility] = useState(false);
    React.useEffect(() => {
        setTooltipVisibility(true);
      }, []);

    const validateCheck = (value:string, require: boolean, maxlen: number) => {
        let reqError = false;
        let lenError = false;
        if(require) {
            if(!value) {
                reqError = true;
            }
        }

        if(value.length > maxlen) {
            lenError = true;
        }

        const errorMsg = [];
        if (reqError) {
            errorMsg.push("必須の入力項目です。");
        }
        if(lenError) {
            errorMsg.push(`最大でも${maxlen}文字まで<br/>しか入力できません。`);
        }
        if(errorMsg.length !== 0) {
            const msg = errorMsg.join('<br/>');
            return (
                <span data-multiline="true" data-tip={msg}>
                    {isTooltipVisible && <ReactTooltip effect="float" type="info"/>}
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#ff0000"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
                </span>
            )
        }
        return (
            <span data-tip="エラーはありません!">
                {isTooltipVisible && <ReactTooltip effect="float" type="info"/>}
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#00ff00"><path d="M0 0h24v24H0z" fill="none"/><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>
            </span>
        )
    }

    const sendBtn = () => {
        if(queryValidation(query)) {
            return (
                <button className={styles.btnbase} onClick={(e) => {
                    e.preventDefault;
                    if(queryValidation(query)) {
                        postApi(query);
                    }
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
                    <span>投稿</span>
                </button>
            )
        }
        return (
            <button className={styles.btnbase} disabled={true}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
                <span>投稿</span>
            </button>
        )
    }

    return (
        <div className={styles.container}>
            <div className={styles.window}>
                <div className={styles.item}>
                    <label className={styles.label}>Game</label>
                    <select onChange={(e)=> setQuery({...query, gameId: e.target.value})}>
                        {
                            games.map((game) => (
                                <option key={game.idName} value={game.idName}>{game.viewName}</option>
                            ))
                        }
                    </select>
                </div>
                <div className={styles.item}>
                    <label className={styles.label}>目的</label>
                    <select onChange={(e)=> setQuery({...query, purpose: e.target.value})}>
                        {
                            proposes().map((p) => (
                                <option key={p.key} value={p.key}>{p.value}</option>
                            ))
                        }
                    </select>
                </div>
                <div className={styles.item}>
                    <label className={styles.label}>ボイスチャット</label>
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
                    <div className={styles.label} data-multiline="true" data-tip="最大5つのタグを紐付ける<br/>ことができます。">
                        {isTooltipVisible && <ReactTooltip effect="float" type="info"/>}
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#ffffff"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/></svg>
                        <span className={styles.label}>タグ選択</span>
                    </div>
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
                    <span className={styles.label}>
                        {validateCheck(query.title, true, 20)}
                        <label>タイトル</label>
                    </span>
                    <input 
                    placeholder="この投稿のタイトルを記載"
                    maxLength={20} onChange={(e)=>setQuery({...query, title: e.target.value})}></input>
                </div>
                <div className={styles.item}>
                    <span className={styles.label}>
                        {validateCheck(query.server, false, 15)}
                        <label>サーバ</label>
                    </span>
                    <input 
                    placeholder="例:Asia/Ship2/Gaia"
                    maxLength={15} onChange={(e)=>setQuery({...query, server: e.target.value})}></input>
                </div>
                <div className={styles.item}>
                    <span className={styles.label}>
                        {validateCheck(query.playerName, true, 15)}
                        <label>名前</label>
                    </span>
                    <input 
                    placeholder="ニックネーム等"
                    maxLength={15} onChange={(e)=>setQuery({...query, playerName: e.target.value})}></input>
                </div>
                <div className={styles.item}>
                    <span className={styles.label}>
                        {validateCheck(query.device, true, 15)}
                        <label>環境</label>
                    </span>
                    <input 
                    placeholder="例:PC,PS4,PS5,スマホ"
                    maxLength={15} onChange={(e)=>setQuery({...query, device: e.target.value})}></input>
                </div>
                <div className={styles.item}>
                    <span className={styles.label}>
                        {validateCheck(query.deleteKey, false, 15)}
                        <label>削除キー</label>
                    </span>
                    <input 
                    placeholder="投稿を後で消す際に使用"
                    maxLength={15} onChange={(e)=>setQuery({...query, deleteKey: e.target.value})}></input>
                </div>
                <hr className={styles.hr}/>
                <div className={styles.textarea}>
                    <span className={styles.titlebox + ' ' + styles.label}>
                        {validateCheck(query.comment, true, 300)}
                        <label>本文({query.comment.length}/300)</label>
                    </span>
                    <textarea
                        maxLength={300}
                        placeholder="本文を記入してください。このサービスに連絡を取る方法はございません。必ず連絡手段を記入しましょう。住所、性別など、個人情報の記載はお避けください。&#13;削除キーを入力しなかった場合は削除することができなくなりますので注意してください。&#13;※投稿データは1ヶ月程度で自動削除されます。" 
                        onChange={(e) => setQuery({...query, comment: e.target.value})}>
                    </textarea>
                </div>
                <hr className={styles.hr}/>
                <div className={styles.postbtn}>
                    {
                        sendBtn()
                    }
                </div>   
            </div>
        </div>
    )
}

export default PostPage;