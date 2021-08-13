import React, { useState } from 'react';
import Image from 'next/image'
import { Post } from '../lib/gen/models/Post';
import { convertPlayTime, convertPropose, convertTags, convertVcUse } from '../lib/helper/genHelper';
import styles from '../styles/Card.module.scss'

import { ActivityIndicator, Button } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';

import reactStringReplace from "react-string-replace";


type CardProps = ({
    gameName: string,
    post: Post
})

const Card:React.FC<CardProps> = ({gameName, post}) => {
    const [miniFormVisible, setMiniFormVisible] = useState(false);

    const [deleteKey, setDeleteKey] = useState("");

    enum POST_STATE {
        INITIAL = 'INITIAL',    // 表示時
        EXECUTE = 'EXECUTE',    // POST実行時
        SUCCESS = 'SUCCESS',    // POST成功
        FAIL = 'FAIL',          // エラー
    }

    const [status, setStatus] = useState({
        message: '削除キーを入力',
        state: POST_STATE.INITIAL,
    });

    const setVisibleClass = ((className: string) => {
        if(miniFormVisible) {
            return `${className} ${styles.visible}`;
        }
        return className;
    })

    const trushSvgToggle = () => {
        if(miniFormVisible) {
            return  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#fff"><path d="M0 0h24v24H0z" fill="none"/><path d="M0 0h24v24H0V0z" fill="none"/><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"/></svg>
        }
        return <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#fff"><path d="M0 0h24v24H0z" fill="none"/><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
    }

    const regExp = /(https?:\/\/\S+)/g;

    return (
        <div className={styles.container} id={post.uuid}>
            <div className={styles.metainfo}>
                <div className={styles.title}>
                    <h2>{post.title}</h2>
                </div>
                <div className={styles.item}>
                    <label>投稿日時:</label>
                    <div>{post.createdAt}</div>
                </div>
            </div>
            <div className={styles.nameinfo}>
                <div className={styles.item}>
                    <label>Name</label>
                    <div>{post.playerName}</div>
                </div>
            </div>
            <div className={styles.information}>
                <div className={styles.gameinfo}>
                    <div className={styles.item}>
                        <label>Game</label>
                        <div>{gameName}</div>
                    </div>

                    <div className={styles.item}>
                        <label>サーバー</label>
                        <div>{post.server ? post.server : "未記入"}</div>
                    </div>

                    <div className={styles.item}>
                        <label>環境</label>
                        <div>{post.device}</div>
                    </div>

                    { post.imageData && post.imageData.length > 0 &&
                        
                        <div className={styles.item}>
                            <label>アイコン</label>
                            <Image
                                className={styles.userIcon}
                                src={`https://upload.chalkboard.me/${post.imageData}`}
                                width='150px'
                                height='150px'
                                alt='icon'
                            />
                        </div>
                    }
                </div>
                <div className={styles.otherinfo}>
                    <div className={styles.recruitInfo}>
                        <div className={styles.item}>
                            <label>募集の目的</label>
                            <div>{convertPropose(post.purpose)}</div>
                        </div>
                        <div className={styles.item}>
                            <label>求めること</label>
                        </div>
                        <div className={styles.tags}>
                            {
                                post.tags?.map((tag) => (
                                    <span key={tag.id}>{convertTags(tag.id)}</span>
                                ))
                            }
                        </div>
                    </div>

                    <div className={styles.userinfo}>
                        <div className={styles.item}>
                            <label>プレイ時間</label>
                            <div className={styles.tags}>
                                {
                                    post.playTime?.map((id) => (
                                        <span key={id}>{convertPlayTime(id)}</span>
                                    ))
                                }
                            </div>
                        </div>

                        <div className={styles.item}>
                           <label>投稿者の属性</label>
                        </div>
                        <div className={styles.tags}>
                            {
                                post.selfTags?.map((tag) => (
                                    <span key={tag.id}>{convertTags(tag.id)}</span>
                                ))
                            }
                        </div>

                        <div className={styles.item}>
                            <label>VC</label>
                            <div>{convertVcUse(post.vcUse)}</div>
                        </div>
                    </div>
                </div>

                <div className={styles.postinfo}>
                    <div className={styles.textarea}>
                        <label>投稿本文</label>
                        <div>
                            {
                                (post.comment.split('\n')).map((text,index) => {
                                    return (
                                        <p key={index}>
                                            {
                                                reactStringReplace(text, regExp, (match, i) => (
                                                    <a href={match} target={"_blank"} rel="noreferrer" className={styles.link} key={i}>{match}</a>
                                                ))
                                            }
                                        </p>
                                    )
                                }) 
                            }
                        </div>
                    </div>
                    <div>
                        <div className={setVisibleClass(styles.miniform)}>
                            <div>
                                <form className={styles.flex}
                                    onSubmit={(e)=>{
                                        e.preventDefault();
                                        if(post.writeDay == null) {
                                            return;
                                        }
                                        if(status.state === POST_STATE.EXECUTE) {
                                            return;
                                        }
                                        if(status.state === POST_STATE.SUCCESS) {
                                            setStatus({...status, message: '削除は成功しています'})
                                            return;
                                        }
                                        const uuid = post.uuid;
                                        const writeDay = new Date(Date.parse(post.writeDay))

                                        const request = {
                                            deleteKey: deleteKey,
                                            gameId: post.gameId,
                                            writeDay: writeDay.toISOString().split('T')[0]
                                        }
                                        const xhr = new XMLHttpRequest();
                                        xhr.open('POST', `/api/posts/${uuid}`);
                                        xhr.setRequestHeader("Content-Type", "application/json");
                                        xhr.onloadstart = () => {
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
                                                        message: '削除キーが設定されていないか、入力が間違っています。',
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
                                        xhr.send(JSON.stringify(request))
                                    }
                                    }>
                                    <div className={styles.item}>
                                        <div className={styles.form}>
                                            <label>削除キー</label>
                                            <input 
                                                onChange={(e)=>{setDeleteKey(e.target.value)}}
                                                maxLength={15}
                                                placeholder="削除キーを入力">
                                            </input>
                                        </div>
                                        <button aria-label="削除">
                                            <Button type="warning" size="small" style={{width:"80px"}}>削除</Button>
                                        </button>
                                    </div>
                                    <div className={styles.deleteMsg}>
                                        {status.state == POST_STATE.EXECUTE &&
                                            <ActivityIndicator />
                                        }
                                        {status.message}
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className={styles.deletebtn}>
                            <button className={styles.icon} 
                                onClick={(e)=> setMiniFormVisible(!miniFormVisible)}>
                                    <span className={styles.preicon}>
                                        {
                                            trushSvgToggle()
                                        }
                                    </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card