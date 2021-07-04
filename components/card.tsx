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
                <div>タイトル</div>
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
                    <span>投稿日時:</span>
                    <span>{post.createdAt}</span>
                </div>
            </div>
        </div>
    )
}

export default Card