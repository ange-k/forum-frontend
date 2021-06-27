import styles from '../styles/Card.module.scss'
export default function Card() {
    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <div>タイトル</div>
            </div>
            <div className={styles.window}>
                <div className={styles.item}>
                    <label>Game</label>
                    <div>PSO2</div>
                </div>
                <div className={styles.item}>
                    <label>Name</label>
                    <div>HogeHogeさん</div>
                </div>
                <div className={styles.item}>
                    <label>目的</label>
                    <div>一緒に遊びたい</div>
                </div>
                <hr/>
                任意のタグ
                <hr/>
                <div className={styles.textarea}>
                    ああああああああああああああああああああああああああああああああああああああああああああああああ
                </div>
            </div>
        </div>
    )
}