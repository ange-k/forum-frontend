import { useState } from 'react';
import { Game } from '../lib/gen/models/Game';
import { PostPurposeEnum, PostVcUseEnum } from '../lib/gen/models/Post';
import { proposes, vcuses } from '../lib/helper/genHelper';
import styles from '../styles/PostTab.module.scss'

import ReactTooltip from 'react-tooltip'
import React from 'react';
import SelectTags from './selectTags';
import SelectPlayTime from './selectPlayTimes';

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
    selfTags: string[],
    playTime: string[],
    deleteKey: string,
    userData?: {
        ipAddr: string,
        userAgent: string
    }
}

const PostPage:React.FC<postProps> = ({games}) => {

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
        selfTags: [],
        playTime: [],
        deleteKey: ''
    } as PostQuery)

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
                <div className={styles.postbtn}>
                    <button className={styles.btnbase} onClick={(e) => {
                        e.preventDefault;
                        if(queryValidation(query)) {
                            postApi(query);
                        }
                    }}>
                        <span>投稿</span>
                    </button>
                </div>
            )
        }
        return (
            <div className={styles.subbtnarea}>
                <div>入力項目のエラーを確認してください。</div>
                <div className={styles.postbtn + " " + styles.disabled}>
                    <button className={styles.btnbase} disabled={true}>
                        <span>投稿</span>
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <div>
                <div className={styles.sidebar}>
                    <div className={styles.fixed}>
                        <button className={styles.icon} onClick={ (e) => location.href="/" }>
                            <span className={styles.preicon}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0z" fill="none"/><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
            <div className={styles.window}>
                <div className={styles.description}>
                    <p>
                        それぞれの項目を入力してください。
                    </p>
                </div>
                <div className={styles.selectbox}>
                    <label className={styles.label}>ゲーム</label>
                    <select onChange={(e)=> setQuery({...query, gameId: e.target.value})}>
                        {
                            games.map((game) => (
                                <option key={game.idName} value={game.idName}>{game.viewName}</option>
                            ))
                        }
                    </select>
                </div>
                <div className={styles.selectbox}>
                    <label className={styles.label}>募集の目的</label>
                    <select onChange={(e)=> setQuery({...query, purpose: e.target.value})}>
                        {
                            proposes().map((p) => (
                                <option key={p.key} value={p.key}>{p.value}</option>
                            ))
                        }
                    </select>
                </div>
                <div className={styles.selectbox}>
                    <label className={styles.label}>ボイスチャット</label>
                    <select onChange={(e) => setQuery({...query, vcUse: e.target.value})}>
                        {
                            vcuses().map((v) => (
                                <option key={v.key} value={v.key}>{v.value}</option>
                            ))
                        }
                    </select>
                </div>

                <SelectTags title="タグ選択(相手に求めること)" selected={query.tags} 
                    selectTag={(tagId:string)=> {
                        setQuery(query => ({...query, tags: [...query.tags, tagId]}))
                    }}
                    deleteTag={(tagId:string)=> {
                        setQuery(query => ({...query, tags: query.tags.filter((t) => t !== tagId)}))
                    }}/>
                
                <SelectTags title="タグ選択(自分に当てはまること)" selected={query.selfTags} 
                    selectTag={(tagId:string)=> {
                        setQuery(query => ({...query, selfTags: [...query.selfTags, tagId]}))
                    }}
                    deleteTag={(tagId:string)=> {
                        setQuery(query => ({...query, selfTags: query.selfTags.filter((t) => t !== tagId)}))
                    }}/>
                
                <SelectPlayTime title="主なプレイ時間帯" selected={query.playTime}
                    selectTag={(tagId:string)=> {
                        setQuery(query => ({...query, playTime: [...query.playTime, tagId]}))
                    }}
                    deleteTag={(tagId:string)=> {
                        setQuery(query => ({...query, playTime: query.playTime.filter((t) => t !== tagId)}))
                    }}/>

                <div className={styles.inputbox}>
                    <span className={styles.label}>
                        {validateCheck(query.title, true, 30)}
                        <label>タイトル</label>
                    </span>
                    <input 
                    placeholder="この投稿のタイトルを記載"
                    maxLength={30} onChange={(e)=>setQuery({...query, title: e.target.value})}></input>
                </div>
                <div className={styles.inputbox}>
                    <span className={styles.label}>
                        {validateCheck(query.server, false, 15)}
                        <label>サーバ</label>
                    </span>
                    <input 
                    placeholder="例:Asia/Ship2/Gaia"
                    maxLength={15} onChange={(e)=>setQuery({...query, server: e.target.value})}></input>
                </div>
                <div className={styles.inputbox}>
                    <span className={styles.label}>
                        {validateCheck(query.playerName, true, 15)}
                        <label>名前</label>
                    </span>
                    <input 
                    placeholder="ニックネーム等"
                    maxLength={15} onChange={(e)=>setQuery({...query, playerName: e.target.value})}></input>
                </div>
                <div className={styles.inputbox}>
                    <span className={styles.label}>
                        {validateCheck(query.device, true, 15)}
                        <label>環境</label>
                    </span>
                    <input 
                    placeholder="例:PC,PS4,PS5,スマホ"
                    maxLength={15} onChange={(e)=>setQuery({...query, device: e.target.value})}></input>
                </div>
                <div className={styles.inputbox}>
                    <span className={styles.label}>
                        {validateCheck(query.deleteKey, false, 15)}
                        <label>削除キー</label>
                    </span>
                    <input 
                    placeholder="投稿を後で消す際に使用"
                    maxLength={15} onChange={(e)=>setQuery({...query, deleteKey: e.target.value})}></input>
                </div>
                
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
                
                <div className={styles.btnarea}>
                    {
                        sendBtn()
                    }
                </div>   
            </div>
        </div>
    )
}

export default PostPage;
