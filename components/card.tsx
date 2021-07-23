import React, { useState } from 'react';
import { Post } from '../lib/gen/models/Post';
import { convertPlayTime, convertPropose, convertTags, convertVcUse } from '../lib/helper/genHelper';
import styles from '../styles/Card.module.scss'

type CardProps = ({
    gameName: string,
    post: Post
})

const Card:React.FC<CardProps> = ({gameName, post}) => {
    const [miniFormVisible, setMiniFormVisible] = useState(false);

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

    return (
        <div className={styles.container}>
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
                                        <p key={index}>{text}</p>
                                    )
                                }) 
                            }
                        </div>
                    </div>
                    <div>
                        <div className={setVisibleClass(styles.miniform)}>
                            <div className={styles.flex}>
                                <div className={styles.form}>
                                    <label>削除キー</label>
                                    <input 
                                        maxLength={15}
                                        placeholder="削除キーを入力"></input>
                                </div>
                                <div className={styles.deletesend}>
                                    <button className={styles.btnbase}>
                                        <span>削除</span>
                                    </button>
                                </div>
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