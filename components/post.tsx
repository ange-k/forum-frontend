import { useRef, useState } from 'react';
import Image from 'next/image'
import { Game } from '../lib/gen/models/Game';
import { PostPurposeEnum, PostVcUseEnum } from '../lib/gen/models/Post';
import { proposes, vcuses } from '../lib/helper/genHelper';
import styles from '../styles/PostTab.module.scss'

import Footer from './footer'

import ReactTooltip from 'react-tooltip'
import React from 'react';
import SelectTags from './selectTags';
import SelectPlayTime from './selectPlayTimes';

import { ActivityIndicator, Button, List, ImagePicker } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';

import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

const Item = List.Item;
const Brief = Item.Brief;

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
    },
    imageData: string
}
interface LocalSaveData {
    data: PostQuery,
    title: string,
    createdAt: number
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
        deleteKey: '',
        imageData: ''
    } as PostQuery)

    enum POST_STATE {
        INITIAL = 'INITIAL',    // 表示時
        EXECUTE = 'EXECUTE',    // POST実行時
        SUCCESS = 'SUCCESS',    // POST成功
        FAIL = 'FAIL',          // エラー
    }

    const [status, setStatus] = useState({
        message: 'ボタンを押すと上記の内容で書き込みます。',
        state: POST_STATE.INITIAL,
    });

    const LOCAL_KEY = 'local_object';
    const [loadPostData, setLoadPostData] = useState({
        enable: false,
        data: [] as LocalSaveData[],
    });
    const pushLocalStorage = (body: PostQuery) => {
        let data = loadPostData.data.sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        if(loadPostData.data.length > 4) {
            // 5件を超えている場合は一番古いものを削除する
            data.pop();
        }
        data.push({
            data: body,
            title: body.title,
            createdAt: new Date().getTime()
        });
        localStorage.setItem(LOCAL_KEY, JSON.stringify(data));
    }
    const getReadLocalStorage = () => {
        return (
            <List className={styles.storageForm}>
                <Item multipleLine onClick={() => {}}>
                    投稿履歴のロード(最新5件まで) 
                    <Brief>以下をクリックすると、<br/>履歴の内容を現在の内容に上書きします。<br/>画像はロードされません。</Brief>
                </Item>
                {
                    loadPostData.data.sort((a,b)=> b.createdAt - a.createdAt).map((value: LocalSaveData) => {
                        return (
                            <Item key={value.createdAt} wrap={true}>
                                {`${new Date(value.createdAt).toLocaleString()}`}
                                <Brief>{`${value.title}`}</Brief>
                                <Button type="primary" size="small" onClick={(e)=>{
                                    setQuery(value.data);
                                    setMiniFormVisible(false);
                                }}>ロード</Button>
                            </Item>
                        )
                    })
                }
            </List>
        )
    }

    const postApi = (query: PostQuery) => {
        if(status.state === POST_STATE.EXECUTE) {
            return;
        }        
        if(status.state === POST_STATE.SUCCESS) {
            setStatus({...status, message: '複数回投稿することはできません'})
            return;
        }
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/api/post');
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onloadstart = () => {
            pushLocalStorage({...query, imageData: ''}); //画像は保存しない
            setStatus({
                message: '送信中です。',
                state: POST_STATE.EXECUTE 
            })
        };
        xhr.onload = () => {

            setTimeout(()=>{
                if(xhr.status == 200) {
                    setStatus({
                        message: '送信成功しました。最長5分以内に反映されます。',
                        state: POST_STATE.SUCCESS 
                    })
                } else {
                    setStatus({
                        message: '何らかのエラーが発生しました。しばらくおいて実行してください。',
                        state: POST_STATE.FAIL
                    })
                }
            }, 2000)
            console.log(xhr.status);
        };
        xhr.onerror = () => {
            setStatus({
                message: '何らかのエラーが発生しました。しばらくおいて実行してください。',
                state: POST_STATE.FAIL 
            })
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
        // localstorage check
        if(localStorage) {
            const items = localStorage.getItem(LOCAL_KEY);
            setLoadPostData({
                enable: true,
                data: items != null ? JSON.parse(items) as LocalSaveData[] : []
            });
        }
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
                <div className={styles.subbtnarea}>
                    <div>{status.message}</div>
                    {status.state == POST_STATE.EXECUTE &&
                        <div className={styles.indicator}>
                            <ActivityIndicator />
                        </div>
                    }
                    <div>
                        <Button type="primary" inline size="small" onClick={(e) => {
                            e.preventDefault();
                            if(queryValidation(query)) {
                                postApi(query);
                            }
                        }}>投稿</Button>
                    </div>
                </div>
            )
        }
        return (
            <div className={styles.subbtnarea}>
                <div>入力項目のエラーを確認してください。</div>
                <Button type="primary" inline size="small" disabled>投稿</Button>
            </div>
        )
    }

    const [miniFormVisible, setMiniFormVisible] = useState(false);
    const setVisibleClass = ((className: string) => {
        if(miniFormVisible) {
            return `${className} ${styles.visible}`;
        }
        return className;
    })

    const [imageState, setImageState] = useState({
        files: [] as any[],
        multiple: false,
    })
    const cropperRef = useRef<HTMLImageElement>(null);
    const onCrop = () => {
      const imageElement: any = cropperRef?.current;
      const cropper: any = imageElement?.cropper;
      const base64: string = cropper.getCroppedCanvas({
          width:150,
          height:150,
          imageSmoothingQuality: "medium"
      }).toDataURL();
      setQuery((pre_query) => {
          return {...pre_query, imageData: base64}
      });
    };
  
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
                        <div>
                            <button className={styles.icon} onClick={ (e)=> setMiniFormVisible(!miniFormVisible) }>
                                <span className={styles.preicon}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm2 16H5V5h11.17L19 7.83V19zm-7-7c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zM6 6h9v4H6z"/></svg>
                                </span>
                            </button>
                            <div className={setVisibleClass(styles.miniform)}>
                                <div className={styles.flex}>
                                    {getReadLocalStorage()}
                                </div>
                            </div>
                        </div>
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
                    <select value={query.gameId} onChange={(e)=> setQuery({...query, gameId: e.target.value})}>
                        {
                            games.map((game) => (
                                <option key={game.idName} value={game.idName}>{game.viewName}</option>
                            ))
                        }
                    </select>
                </div>
                <div className={styles.selectbox}>
                    <label className={styles.label}>募集の目的</label>
                    <select value={query.purpose} onChange={(e)=> setQuery({...query, purpose: e.target.value})}>
                        {
                            proposes().map((p) => (
                                <option key={p.key} value={p.key}>{p.value}</option>
                            ))
                        }
                    </select>
                </div>
                <div className={styles.selectbox}>
                    <label className={styles.label}>ボイスチャット</label>
                    <select value={query.vcUse} onChange={(e) => setQuery({...query, vcUse: e.target.value})}>
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
                    value={query.title}
                    placeholder="この投稿のタイトルを記載"
                    maxLength={30} onChange={(e)=>setQuery({...query, title: e.target.value})}></input>
                </div>
                <div className={styles.inputbox}>
                    <span className={styles.label}>
                        {validateCheck(query.server, false, 15)}
                        <label>サーバ</label>
                    </span>
                    <input 
                    value={query.server}
                    placeholder="例:Asia/Ship2/Gaia"
                    maxLength={15} onChange={(e)=>setQuery({...query, server: e.target.value})}></input>
                </div>
                <div className={styles.inputbox}>
                    <span className={styles.label}>
                        {validateCheck(query.playerName, true, 15)}
                        <label>名前</label>
                    </span>
                    <input 
                    value={query.playerName}
                    placeholder="ニックネーム等"
                    maxLength={15} onChange={(e)=>setQuery({...query, playerName: e.target.value})}></input>
                </div>
                <div className={styles.inputbox}>
                    <span className={styles.label}>
                        {validateCheck(query.device, true, 15)}
                        <label>環境</label>
                    </span>
                    <input 
                    value={query.device}
                    placeholder="例:PC,PS4,PS5,スマホ"
                    maxLength={15} onChange={(e)=>setQuery({...query, device: e.target.value})}></input>
                </div>
                <div className={styles.inputbox}>
                    <span className={styles.label}>
                        {validateCheck(query.deleteKey, false, 15)}
                        <label>削除キー</label>
                    </span>
                    <input 
                    value={query.deleteKey}
                    placeholder="投稿を後で消す際に使用"
                    maxLength={15} onChange={(e)=>setQuery({...query, deleteKey: e.target.value})}></input>
                </div>
                <div className={styles.inputbox}>
                    <span className={styles.label} style={{height:"18px"}}>
                        <label>アイコン画像(縦横150pxまで縮小されます)</label>
                    </span>
                    <div className={styles.imageCrops}>
                        <div className={styles.cropsItem}>
                            <ImagePicker
                                files={imageState.files != null ? imageState.files: []}
                                selectable={imageState.files.length < 1}
                                length={1}
                                multiple={false}
                                onChange={(files, type, index) =>{
                                    console.log(files);
                                    setImageState({...imageState, files: Object.assign([], files)})
                                }}
                            />
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 20 20" height="48px" viewBox="0 0 20 20" width="48px" fill="#FFFFFF"><g><rect fill="none" height="20" width="20"/></g><g><polygon points="9.21,15 12.43,15 16,10 12.43,5 9.21,5 12.79,10"/><polygon points="4.21,15 7.43,15 11,10 7.43,5 4.21,5 7.79,10"/></g></svg>
                        <div className={styles.cropsItem}>
                            {query.imageData != null && query.imageData.length > 0 &&
                                <Image 
                                    className={styles.iconImage}
                                    src={query.imageData}
                                    alt=""
                                    height="150px"
                                    width="150px"
                                />
                            }
                        </div>
                    </div>
                </div>
                {imageState.files && imageState.files.length > 0 &&
                    <Cropper
                    src={imageState.files[0].url }
                    style={{ height: 400, width: "100%" }}
                    aspectRatio={1}
                    ready={onCrop}
                    cropend={onCrop}
                    ref={cropperRef}
                    viewMode={1}
                    enable={true}
                    minCropBoxHeight={150}
                    minCropBoxWidth={150}
                    cropBoxResizable={false}
                    dragMode={"move"}
                    />
                }
                <div className={styles.textarea}>
                    <span className={styles.titlebox + ' ' + styles.label}>
                        {validateCheck(query.comment, true, 600)}
                        <label>本文({query.comment.length}/600)</label>
                    </span>
                    <textarea
                        value={query.comment}
                        maxLength={600}
                        placeholder="本文を記入してください。このサービスに連絡を取る方法はございません。必ず連絡手段を記入しましょう。住所、性別など、個人情報の記載はお避けください。&#13;削除キーを入力しなかった場合は削除することができなくなりますので注意してください。&#13;※投稿データは1ヶ月程度で自動削除されます。" 
                        onChange={(e) => setQuery({...query, comment: e.target.value})}>
                    </textarea>
                </div>
                
                <div className={styles.btnarea}>
                    {
                        sendBtn()
                    }
                </div>   
                <Footer></Footer>
            </div>
        </div>
    )
}

export default PostPage;
