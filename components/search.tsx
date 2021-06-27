import styles from '../styles/Search.module.scss'
export default function Search() {
    return (
        <div className={styles.container}>
            <ul className={styles.tab}>
                <li className={`${styles.menu} ${styles.active}`}>search</li>
                <li className={styles.menu}>post</li>
                <div className={styles.control}>
                    <button>-</button>
                </div>
            </ul>
            <div className={styles.window}>
                <div className={styles.item}>
                    <label>Game</label>
                    <select>
                        <option value="pso2">PSO2</option>
                    </select>
                </div>
                <div className={styles.item}>
                    <label>目的</label>
                    <select>
                        <option value="pso2">一緒に遊びたい</option>
                    </select>
                </div>
                <div className={styles.item}>
                    <label>VC</label>
                    <select>
                        <option value="pso2">なし</option>
                    </select>
                </div>
                <hr/>
                <span>フリーワード検索</span>
                <div className={styles.item}>
                    <label>サーバ</label>
                    <input></input>
                </div>
                <div className={styles.item}>
                    <label>名前</label>
                    <input></input>
                </div>
            </div>
        </div>
    )
}