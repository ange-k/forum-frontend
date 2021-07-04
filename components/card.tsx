import React from 'react';
import { Post } from '../lib/gen/models/Post';
import { convertPropose, convertTags, convertVcUse } from '../lib/helper/genHelper';
import styles from '../styles/Card.module.scss'

type CardProps = ({
    gameName: string,
    post: Post
})

const Card:React.FC<CardProps> = ({gameName, post}) => {
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
                <div className={styles.tags}>
                    {
                        post.tags?.map((tag) => (
                            <span key={tag}>{convertTags(tag)}</span>
                        ))
                    }
                </div>
                <hr/>
                <div className={styles.textarea}>
                    <pre>{post.comment}</pre>
                </div>
                <div className={styles.created}>
                    <button className={styles.squarebtn}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
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