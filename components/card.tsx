import React, { useState } from 'react';
import { Post } from '../lib/gen/models/Post';
import { convertPropose, convertTags, convertVcUse } from '../lib/helper/genHelper';
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
            return  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M0 0h24v24H0V0z" fill="none"/><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"/></svg>
        }
        return <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
    }

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <div>{post.title}</div>
            </div>
            <div className={styles.window}>
                <div className={styles.item}>
                    <label>Game</label>
                    <div>{gameName}/{post.server}</div>
                </div>
                <div className={styles.item}>
                    <label>Name</label>
                    <div>{post.playerName}</div>
                </div>
                <div className={styles.item}>
                    <label>目的</label>
                    <div>{convertPropose(post.purpose)}</div>
                </div>
                <div className={styles.item}>
                    <label>環境</label>
                    <div>{post.device}</div>
                </div>
                <div className={styles.item}>
                    <label>VC</label>
                    <div>{convertVcUse(post.vcUse)}</div>
                </div>
                <hr/>
                <div>
                    <label>相手に求めること</label>
                </div>
                <div className={styles.tags}>
                    {
                        post.tags?.map((tag) => (
                            <span key={tag.id}>{convertTags(tag.id)}</span>
                        ))
                    }
                </div>
                <hr/>
                <div>
                    <label>自分に当てはまること</label>
                </div>
                <div className={styles.tags}>
                    {
                        post.selfTags?.map((tag) => (
                            <span key={tag.id}>{convertTags(tag.id)}</span>
                        ))
                    }
                </div>
                <hr/>
                <div className={styles.textarea}>
                    <pre>{post.comment}</pre>
                </div>
                <div className={setVisibleClass(styles.miniform)}>
                    <div className={styles.flex}>
                        <label>削除キー</label>
                        <input></input>
                        <button >
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#333"><path d="M0 0h24v24H0z" fill="none"/><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
                        </button>
                    </div>
                </div>
                <div className={styles.created}>
                    <button className={styles.squarebtn} onClick={(e)=> setMiniFormVisible(!miniFormVisible)}>
                        {
                            trushSvgToggle()
                        }
                    </button>
                    <div>
                        <span>投稿日時:</span>
                        <span>{post.createdAt}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card